import { useState, useContext } from 'react'
import Row from '../_row'
import Typography from '@mui/material/Typography'
import DownloadButton from '../../../components/data-download'
import RegisterEventLog from '../../../components/application-logger/register-event-log'
import Link from '@mui/material/Link'
import Hidden from '@mui/material/Hidden'
import packageJson from '../../../../package.json'
import { context as globalContext } from '../../../contexts/global'
import { Div, Span, B } from '../../../components/html-tags'

export default _source => {
  const { global } = useContext(globalContext)
  const { referrer } = global
  const [ref, setRef] = useState(null)
  const { immutableResource, rightsList } = _source
  const { resourceDescription, resourceDownload } = immutableResource

  return (
    <Row title={'Download'} sx={{ position: 'relative' }}>
      {resourceDescription ? (
        <DownloadButton
          TextButton={({ onClick }) => (
            <Typography
              sx={{ display: 'block', cursor: 'pointer' }}
              variant="body2"
              component={Link}
              variantMapping={{ body2: 'h2' }}
              onClick={onClick}
            >
              {resourceDescription}
            </Typography>
          )}
          {..._source}
        />
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
                    doi: _source.doi,
                  },
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
        <Span
          sx={{ position: 'absolute', top: `calc(50% - 30px)`, right: theme => theme.spacing(2) }}
        >
          <DownloadButton IconButtonSize="large" fontSize="large" {..._source} />
        </Span>
      </Hidden>

      <Div sx={{ mt: theme => theme.spacing(2) }} />

      <Div>
        <Typography gutterBottom variant="overline">
          <B>License</B>
        </Typography>
        {rightsList.map(rl => {
          return (
            <Div key={rl.rightsURI}>
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
            </Div>
          )
        })}
      </Div>
    </Row>
  )
}
