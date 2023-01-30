import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

export default styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.common.white,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'unset',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 50,
    '& fieldset': {
      borderColor: theme.palette.common.white,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.common.white,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.common.white,
    },
  },
}))
