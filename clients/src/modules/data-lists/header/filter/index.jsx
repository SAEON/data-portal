import { useContext } from 'react'
import { context as filterContext } from '../../context'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { Magnify as SearchIcon } from '../../../../components/icons'
import QuickForm from '../../../../components/quick-form'
import debounce from '../../../../lib/fns/debounce'
import useMediaQuery from '@mui/material/useMediaQuery'

export default () => {
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const { filter, setFilter } = useContext(filterContext)

  return (
    <QuickForm text={filter} effects={[debounce(({ text }) => setFilter(text), 500)]}>
      {(update, { text }) => {
        return (
          <TextField
            autoFocus
            autoComplete="off"
            fullWidth
            id="saeon-data-search"
            size="small"
            onChange={e => update({ text: e.target.value })}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              inputProps: {
                'aria-label': 'Enter search text and press enter',
                sx: {
                  p: 0,
                  lineHeight: '100%',
                },
              },
            }}
            value={text}
            margin="none"
            placeholder={smUp ? 'Filter lists ...' : ''}
            sx={{
              backgroundColor: theme => theme.palette.grey[200],
              p: theme => theme.spacing(0.5),
              '& .MuiInput-root': {
                '&:before, :after, :hover:not(.Mui-disabled):before': {
                  borderBottom: 0,
                },
              },
            }}
          />
        )
      }}
    </QuickForm>
  )
}
