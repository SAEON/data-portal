import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import QuickForm from '@saeon/quick-form'
import { context as globalContext } from '../../contexts/global'
import debounce from '../../lib/fns/debounce'

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
  const { global, setGlobal } = useContext(globalContext)

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
