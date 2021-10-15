import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import clsx from 'clsx'
import useStyles from './style'
import Hidden from '@mui/material/Hidden'

export default ({ doi }) => {
  const classes = useStyles()

  return (
    <Hidden smDown>
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
