import useStyles from './style'
import ButtonBase from '@mui/material/ButtonBase'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import { styled, alpha } from '@mui/material/styles'

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  border: `1px solid ${alpha(theme.palette.common.white, 0.5)}`,
  '&:hover': {
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  },
  transition: theme.transitions.create('border'),
}))

const Span = styled('span')({})

export default ({ title, disabled = false, href = undefined, to = '/records', style = {} }) => {
  const classes = useStyles()

  return (
    <div style={Object.assign({ width: '100%', height: '100%' }, style)}>
      <Root className={classes.root}>
        <ButtonBase
          disabled={disabled}
          component={href ? undefined : Link}
          href={href}
          to={href ? undefined : to}
          focusRipple
          sx={{
            width: '100%',
            height: '100%',
            ...(disabled
              ? {}
              : {
                  position: 'relative',
                }),
          }}
          className={clsx({
            [classes.button]: !disabled,
          })}
        >
          <Span
            sx={
              disabled
                ? {}
                : {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: theme => theme.palette.common.black,
                    transition: theme => theme.transitions.create('opacity'),
                  }
            }
            className={clsx({
              [classes.bg]: !disabled,
            })}
          />
          <Span
            sx={
              disabled
                ? {}
                : {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme => theme.palette.common.white,
                  }
            }
          >
            <Typography
              component="span"
              variant="overline"
              color="inherit"
              sx={theme => ({
                transition: theme.transitions.create(['border', 'color']),
                padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
                textAlign: 'center',
                margin: theme.spacing(2),
              })}
              className={classes.title}
            >
              {title}
            </Typography>
          </Span>
        </ButtonBase>
      </Root>
    </div>
  )
}
