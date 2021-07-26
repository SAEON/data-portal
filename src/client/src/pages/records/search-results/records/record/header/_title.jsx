import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { isMobile } from 'react-device-detect'
import clsx from 'clsx'
import useStyles from './style'

export default ({ doi }) => {
  const classes = useStyles()

  return isMobile ? null : doi ? (
    <Typography
      aria-label="Link to Datacite DOI address"
      component={Link}
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
