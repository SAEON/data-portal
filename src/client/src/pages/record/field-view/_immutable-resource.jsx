import Row from '../_row'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'
import DownloadButton from '../../../components/data-download'
import SimpleLink from '../../../components/link'
import { isMobile } from 'react-device-detect'

export default _source => {
  const theme = useTheme()
  const { immutableResource, rightsList } = _source
  const { resourceDescription } = immutableResource

  return (
    <Row title={'Download'} style={{ position: 'relative' }}>
      <Typography variant="body2" component="h2">
        {resourceDescription || '(Missing resource description and/or download URI)'}
      </Typography>
      {!isMobile && (
        <span style={{ position: 'absolute', top: `calc(50% - 30px)`, right: theme.spacing(2) }}>
          <DownloadButton size={36} {..._source} />
        </span>
      )}

      <div style={{ marginTop: theme.spacing(2) }} />

      <div>
        <Typography gutterBottom variant="overline">
          <b>License</b>
        </Typography>
        {rightsList.map(rl => {
          return (
            <div key={rl.rightsURI}>
              <Typography variant="body2">{rl.rights}</Typography>
              <SimpleLink key={rl.rightsURI} uri={rl.rightsURI}>
                <Typography variant="body2">{rl.rightsURI}</Typography>
              </SimpleLink>
            </div>
          )
        })}
      </div>
    </Row>
  )
}
