import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Hidden from '@mui/material/Hidden'

const sx = {
  marginRight: 'auto',
  marginLeft: theme => theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.6rem',
}

export default ({ doi }) => {
  return (
    <Hidden smDown>
      {doi ? (
        <Typography
          aria-label="Link to Datacite DOI address"
          component={Link}
          variant="overline"
          href={`https://doi.org/${doi}`}
          sx={sx}
          style={{
            cursor: 'pointer',
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`https://doi.org/${doi}`}
        </Typography>
      ) : (
        <Typography sx={sx} variant="overline">
          No DOI
        </Typography>
      )}
    </Hidden>
  )
}
