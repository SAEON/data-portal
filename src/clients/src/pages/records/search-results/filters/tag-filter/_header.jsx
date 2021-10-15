import Fade from '@mui/material/Fade'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

export default ({ title, style, collapsed, setCollapsed }) => {
  return (
    <AppBar style={style} position="relative" color="inherit" variant="outlined">
      <Toolbar variant="regular">
        <Typography
          onClick={() => setCollapsed(!collapsed)}
          style={{ cursor: 'pointer' }}
          variant="overline"
          noWrap
        >
          {title}
        </Typography>

        <div style={{ marginLeft: 'auto' }}>
          {/* Icon */}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Collapse filter"
            color="inherit"
            size="small"
          >
            {collapsed ? (
              <Fade key={1} timeout={750} in={collapsed}>
                <ExpandMoreIcon />
              </Fade>
            ) : (
              <Fade key={2} timeout={750} in={!collapsed}>
                <ExpandLessIcon />
              </Fade>
            )}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}
