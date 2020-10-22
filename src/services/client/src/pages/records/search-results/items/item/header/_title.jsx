import { Typography, Link as MuiLink } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

const style = {
  marginRight: 'auto',
  marginLeft: 16,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export default ({ doi }) => {
  return isMobile ? undefined : doi ? (
    <Typography
      component={MuiLink}
      variant="overline"
      href={`https://doi.org/${doi}`}
      style={{
        ...style,
        cursor: 'pointer',
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {`https://doi.org/${doi}`}
    </Typography>
  ) : (
    <Typography style={{ ...style }} variant="overline">
      No DOI
    </Typography>
  )
}
