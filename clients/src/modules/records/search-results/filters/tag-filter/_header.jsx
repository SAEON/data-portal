import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Div } from '../../../../../components/html-tags'

export default ({ title, sx, collapsed, setCollapsed }) => {
  return (
    <AppBar sx={sx} position="relative" color="inherit" variant="outlined" elevation={0}>
      <Toolbar variant="dense">
        <Typography
          onClick={() => setCollapsed(!collapsed)}
          sx={{ cursor: 'pointer' }}
          variant="overline"
          noWrap
        >
          {title}
        </Typography>

        <Div sx={{ marginLeft: 'auto' }}>
          {/* Icon */}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Collapse filter"
            color="inherit"
            size="small"
          >
            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Div>
      </Toolbar>
    </AppBar>
  )
}