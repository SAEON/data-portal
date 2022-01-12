import Row from '../_row'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default ({ linkedResources }) => (
  <Row title="Resources">
    {linkedResources.map((lr, i) => (
      <div key={`linked-resource${i}`}>
        <Typography variant="body2">
          <b>
            {`${
              lr.linkedResourceType === 'Query' ? 'GeoMap' : `${lr.linkedResourceType}`
            }`.toUpperCase()}
          </b>{' '}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={lr.resourceURL}
          >{`${lr.resourceDescription}`}</Link>
        </Typography>
      </div>
    ))}
  </Row>
)
