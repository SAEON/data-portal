import clsx from 'clsx'
import Fade from '@material-ui/core/Fade'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import useStyles from '../style'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

export default ({ title, style, collapsed, setCollapsed }) => {
  const classes = useStyles()

  return (
    <AppBar style={style} className={clsx(classes.appbar)} position="relative" variant="outlined">
      <Toolbar className={clsx(classes.toolbar)} variant="regular">
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
