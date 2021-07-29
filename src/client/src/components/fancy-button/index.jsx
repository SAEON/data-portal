import useStyles from './style'
import ButtonBase from '@material-ui/core/ButtonBase'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

export default ({ title, disabled = false }) => {
  const classes = useStyles()

  return (
    <div style={{ minWidth: 302 }}>
      <div className={classes.root}>
        <ButtonBase
          disabled={disabled}
          component={Link}
          to="/records"
          focusRipple
          className={clsx({
            [classes.button]: !disabled,
          })}
          style={{
            width: 300,
          }}
        >
          <span
            className={clsx({
              [classes.bg]: !disabled,
            })}
          />
          <span
            className={clsx({
              [classes.buttonTitle]: !disabled,
            })}
          >
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.title}
            >
              {title}
            </Typography>
          </span>
        </ButtonBase>
      </div>
    </div>
  )
}
