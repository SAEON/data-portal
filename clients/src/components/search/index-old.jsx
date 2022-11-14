import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from 'mdi-react/SearchIcon'
import QuickForm from '../../packages/quick-form'
import { context as globalContext } from '../../contexts/global'
import debounce from '../../lib/fns/debounce'
import { useTheme } from '@mui/material/styles'
import { alpha, styled } from '@mui/material/styles'

const Root = styled('div')(({ theme }) => ({
  transition: theme.transitions.create('background-color'),
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '& .MuiInput-underline:before': {
    borderBottom: 'none',
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  '& .MuiInput-underline:hover:before': {
    border: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: alpha(theme.palette.common.white, 0.5),
  },
}))

export default ({ children, autofocus = true, onFocus, onBlur }) => {
  const navigate = useNavigate()
  const { global, setGlobal } = useContext(globalContext)
  const theme = useTheme()

  return (
    <Root>
      <QuickForm
        effects={[debounce(({ text = '' }) => setGlobal({ text }, true), 500)]}
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
                sx: {
                  color: theme.palette.common.white,
                  padding: `${theme.spacing(4)} 0`,
                  caretColor: theme.palette.common.white,
                },
              }}
              value={text}
              placeholder="Search SAEON data"
              variant="standard"
              onKeyDown={({ key }) => {
                if (key === 'Enter') {
                  setGlobal({ text }, true)
                  if (history.location.pathname !== '/records') {
                    navigate('/records')
                  }
                }
              }}
              autoFocus={autofocus}
            />
          )
        }}
      </QuickForm>
      {children}
    </Root>
  )
}
