import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import {
  ChevronDown as ExpandMoreIcon,
  ChevronUp as ExpandLessIcon,
} from '../../../../../components/icons'
import { Div } from '../../../../../components/html-tags'

export default ({ title, collapsed, setCollapsed }) => {
  return (
    <AppBar
      sx={{ borderBottom: 'none' }}
      position="relative"
      color="inherit"
      variant="outlined"
      elevation={0}
    >
      <Toolbar
        disableGutters
        sx={{
          pl: theme => theme.spacing(2),
          pr: theme => theme.spacing(1),
        }}
        variant="dense"
      >
        <Typography
          onClick={() => setCollapsed(!collapsed)}
          sx={{ cursor: 'pointer', fontWeight: 500 }}
          variant="overline"
          noWrap
        >
          {title}
        </Typography>

        <Div sx={{ ml: 'auto' }}>
          {/* Icon */}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Collapse filter"
            color="inherit"
            size="small"
          >
            {collapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
          </IconButton>
        </Div>
      </Toolbar>
    </AppBar>
  )
}
