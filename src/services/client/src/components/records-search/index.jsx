import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField, Grid, InputAdornment } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import QuickForm from '@saeon/quick-form'
import { GlobalContext } from '../../modules/provider-global'
import { debounce } from '../../lib/fns'

export default ({
  children,
  autofocus,
  onFocus,
  onBlur,
  resetGlobalStateOnSearch = false,
  ...props
}) => {
  const history = useHistory()
  const { global, setGlobal } = useContext(GlobalContext)

  return (
    <div {...props}>
      <QuickForm
        effects={[
          debounce(({ text = '' }) => {
            if (text !== (global.text || '')) {
              setGlobal({ text })
            }
          }, 500),
        ]}
        text={global.text || ''}
      >
        {(update, { text }) => {
          return (
            <TextField
              onFocus={onFocus || undefined}
              onBlur={onBlur || undefined}
              autoComplete="off"
              fullWidth
              color="primary"
              id="saeon-data-search"
              size="medium"
              onChange={e => update({ text: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={text}
              placeholder="Search our data"
              variant="standard"
              onKeyDown={({ key }) => {
                if (key === 'Enter') {
                  setGlobal({ text }, resetGlobalStateOnSearch)
                  history.push('/records')
                }
              }}
              autoFocus={autofocus || false}
            />
          )
        }}
      </QuickForm>
      {children}
    </div>
  )
}
