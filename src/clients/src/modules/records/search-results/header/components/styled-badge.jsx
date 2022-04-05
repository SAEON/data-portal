import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'

export default styled(Badge)({
  '& .MuiBadge-badge': {
    top: 3,
    right: -3,
    opacity: 0.8,
    fontSize: '0.6rem',
  },
})
