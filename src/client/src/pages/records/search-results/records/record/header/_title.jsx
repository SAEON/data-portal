import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import clsx from 'clsx'
import useStyles from './style'
import Hidden from '@material-ui/core/Hidden'

export default ({ doi }) => {
  const classes = useStyles()

  return (
    <Hidden xsDown>
      {doi ? (
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
      )}
    </Hidden>
  )
}
