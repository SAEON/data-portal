import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from 'mdi-react/SearchIcon'
import QuickForm from '@saeon/quick-form'
import { context as globalContext } from '../../contexts/global'
import debounce from '../../lib/fns/debounce'
import useStyles from './style'
import clsx from 'clsx'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ children, style, autofocus = true, onFocus, onBlur }) => {
  const history = useHistory()
  const { global, setGlobal } = useContext(globalContext)
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={clsx(classes.recordsSearchBox)} style={style}>
      <QuickForm
        effects={[debounce(({ text = '' }) => setGlobal({ text }), 500)]}
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
              color={'secondary'}
              onChange={e => update({ text: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      style={{ color: theme.palette.common.white, margin: theme.spacing(4) }}
                      size={36}
                    />
                  </InputAdornment>
                ),
                inputProps: {
                  'aria-label': 'Enter search text and press enter',
                },
                className: clsx(classes.input),
              }}
              value={text}
              placeholder="Search SAEON data"
              variant="standard"
              onKeyDown={({ key }) => {
                if (key === 'Enter') {
                  setGlobal({ text }, false)
                  if (history.location.pathname !== '/records') {
                    history.push('/records')
                  }
                }
              }}
              autoFocus={autofocus}
            />
          )
        }}
      </QuickForm>
      {children}
    </div>
  )
}
