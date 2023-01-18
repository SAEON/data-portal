import Toolbar from '@mui/material/Toolbar'

export default props => (
  <Toolbar
    disableGutters
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
    {...props}
  />
)
