import Row from '../_row'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import DownloadButton from '../../../components/data-download'
import Link from '@mui/material/Link'
import Hidden from '@mui/material/Hidden'

export default _source => {
  const theme = useTheme()
  const { immutableResource, rightsList } = _source
  const { resourceDescription } = immutableResource

  return (
    <Row title={'Download'} style={{ position: 'relative' }}>
      <Typography variant="body2" component="h2">
        {resourceDescription || '(Missing resource description and/or download URI)'}
      </Typography>
      <Hidden smDown>
        <span style={{ position: 'absolute', top: `calc(50% - 30px)`, right: theme.spacing(2) }}>
          <DownloadButton size={36} {..._source} />
        </span>
      </Hidden>

      <div style={{ marginTop: theme.spacing(2) }} />

      <div>
        <Typography gutterBottom variant="overline">
          <b>License</b>
        </Typography>
        {rightsList.map(rl => {
          return (
            <div key={rl.rightsURI}>
              <Typography variant="body2">{rl.rights}</Typography>
              <Typography
                target="_blank"
                rel="noopener noreferrer"
                href={rl.rightsURI}
                component={Link}
                variant="body2"
              >
                {rl.rightsURI}
              </Typography>
            </div>
          )
        })}
      </div>
    </Row>
  )
}
