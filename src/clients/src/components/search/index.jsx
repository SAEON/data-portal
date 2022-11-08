import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { SearchIcon } from '../../components/icons'
import QuickForm from '../../packages/quick-form'
import { context as globalContext } from '../../contexts/global'
import debounce from '../../lib/fns/debounce'

export default ({ autofocus = true, onFocus, onBlur }) => {
  const navigate = useNavigate()
  const { global, setGlobal } = useContext(globalContext)

  return (
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
            color="primary"
            id="saeon-data-search"
            size="small"
            onChange={e => update({ text: e.target.value })}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={24} />
                </InputAdornment>
              ),
              inputProps: {
                'aria-label': 'Enter search text and press enter',
              },
            }}
            value={text}
            margin="none"
            placeholder="Search SAEON data"
            sx={{
              '& .MuiInput-root': {
                '&:before, :after, :hover:not(.Mui-disabled):before': {
                  borderBottom: 0,
                },
              },
            }}
            onKeyDown={({ key }) => {
              if (key === 'Enter') {
                setGlobal({ text }, false)
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
  )
}
