import Row from '../_row'
import Typography from '@material-ui/core/Typography'

export default ({ identifiers }) => (
  <Row title="Identifiers">
    {identifiers.map(identifier => (
      <div key={identifier.identifier}>
        <Typography variant="body2">
          <b>
            {identifier.identifierType.toUpperCase() === 'PLONE'
              ? 'SAEON'
              : identifier.identifierType.toUpperCase()}
          </b>{' '}
          {identifier.identifier}
        </Typography>
      </div>
    ))}
  </Row>
)
