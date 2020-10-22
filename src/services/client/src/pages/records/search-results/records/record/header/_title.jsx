import { Typography, Link as MuiLink } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import clsx from 'clsx'
import useStyles from './style'

export default ({ doi }) => {
  const classes = useStyles()

  return isMobile ? undefined : doi ? (
    <Typography
      component={MuiLink}
      variant="overline"
      href={`https://doi.org/${doi}`}
      className={clsx(classes.title)}
      style={{
        cursor: 'pointer',
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {`https://doi.org/${doi}`}
    </Typography>
  ) : (
    <Typography className={clsx(classes.title)} variant="overline">
      No DOI
    </Typography>
  )
}
