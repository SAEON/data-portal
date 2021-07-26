import Row from '../_row'
import Typography from '@material-ui/core/Typography'

export default ({ identifiers }) => {
  const _identifiers = identifiers.filter(
    ({ identifierType }) => identifierType.toUpperCase() !== 'PLONE'
  )

  if (!_identifiers.length) {
    return null
  }

  return (
    <Row title="Identifiers">
      {_identifiers.map(identifier => (
        <div key={identifier.identifier}>
          <Typography variant="body2">
            <b>{identifier.identifierType.toUpperCase()}</b> {identifier.identifier}
          </Typography>
        </div>
      ))}
    </Row>
  )
}
