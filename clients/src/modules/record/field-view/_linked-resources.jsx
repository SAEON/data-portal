import Row from '../_row'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Div, B } from '../../../components/html-tags'

export default ({ linkedResources }) => (
  <Row title="Resources">
    {linkedResources.map((lr, i) => (
      <Div key={`linked-resource${i}`}>
        <Typography variant="body2">
          <B>
            {`${
              lr.linkedResourceType === 'Query' ? 'GeoMap' : `${lr.linkedResourceType}`
            }`.toUpperCase()}
          </B>{' '}
          <Link target="_blank" rel="noopener noreferrer" href={lr.resourceURL}>{`${
            lr.resourceDescription || lr.resourceURL || 'Missing/incorrect metadata'
          }`}</Link>
        </Typography>
      </Div>
    ))}
  </Row>
)
