import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField, InputAdornment } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import QuickForm from '@saeon/quick-form'
import { GlobalContext } from '../../contexts/global'
import { debounce } from '../../lib/fns'

export default ({
  children,
  autofocus,
  onFocus,
  onBlur,
  resetGlobalStateOnSearch = false,
  iconProps,
  inputProps,
  color,
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
              id="saeon-data-search"
              size="medium"
              color={color}
              onChange={e => update({ text: e.target.value })}
              InputProps={{
                ...inputProps,

                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon {...iconProps} />
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
