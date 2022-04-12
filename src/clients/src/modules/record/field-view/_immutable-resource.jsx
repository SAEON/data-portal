import { useState, useContext } from 'react'
import Row from '../_row'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import DownloadButton from '../../../components/data-download'
import RegisterEventLog from '../../../components/application-logger/register-event-log'
import Link from '@mui/material/Link'
import Hidden from '@mui/material/Hidden'
import packageJson from '../../../../package.json'
import { context as globalContext } from '../../../contexts/global'

export default _source => {
  const { global } = useContext(globalContext)
  const { referrer } = global
  const [ref, setRef] = useState(null)
  const theme = useTheme()
  const { immutableResource, rightsList } = _source
  const { resourceDescription, resourceDownload } = immutableResource

  return (
    <Row title={'Download'} style={{ position: 'relative' }}>
      {resourceDescription ? (
        <Typography variant="body2" component="h2">
          {resourceDescription}
        </Typography>
      ) : resourceDownload?.downloadURL ? (
        <Typography ref={el => setRef(el)} variant="body2" component="h2">
          {ref && (
            <RegisterEventLog
              event="copy"
              target={ref}
              handle={() => {
                console.gql({
                  clientVersion: packageJson.version,
                  type: 'download',
                  referrer,
                  createdAt: new Date(),
                  info: {
                    pathname: window.location.pathname,
                    uri: resourceDownload?.downloadURL,
                    odpId: _source.id,
                    doi: _source.doi
                  }
                })
              }}
            >
              {resourceDownload?.downloadURL}
            </RegisterEventLog>
          )}
        </Typography>
      ) : (
        <Typography variant="body2" component="h2">
          (Missing resource description and/or download URI)
        </Typography>
      )}
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
