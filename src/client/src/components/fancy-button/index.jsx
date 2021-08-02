import useStyles from './style'
import ButtonBase from '@material-ui/core/ButtonBase'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

export default ({ title, disabled = false, href = undefined, to = '/records' }) => {
  const classes = useStyles()

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className={classes.root}>
        <ButtonBase
          disabled={disabled}
          component={href ? undefined : Link}
          href={href}
          to={href ? undefined : to}
          focusRipple
          className={clsx({
            [classes.button]: !disabled,
          })}
          style={{
            width: '100%',
            height: '100%',
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
              variant="overline"
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
