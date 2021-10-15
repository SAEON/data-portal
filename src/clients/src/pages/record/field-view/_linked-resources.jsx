import Row from '../_row'
import Typography from '@mui/material/Typography'
import SimpleLink from '../../../components/link'

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
          <SimpleLink uri={lr.resourceURL}>{`${lr.resourceDescription}`}</SimpleLink>
        </Typography>
      </div>
    ))}
  </Row>
)
