import useStyles from './style'
import ButtonBase from '@material-ui/core/ButtonBase'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

export default ({ count }) => {
  const classes = useStyles()

  return (
    <div style={{ minWidth: 302 }}>
      <div className={classes.root}>
        <ButtonBase
          component={Link}
          to="/records"
          focusRipple
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: 300,
          }}
        >
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              Explore {count} records
            </Typography>
          </span>
        </ButtonBase>
      </div>
    </div>
  )
}
