import Row from '../_row'
import Typography from '@mui/material/Typography'
import { Div, B } from '../../../components/html-tags'

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
        <Div key={identifier.identifier}>
          <Typography variant="body2">
            <B>{identifier.identifierType.toUpperCase()}</B> {identifier.identifier}
          </Typography>
        </Div>
      ))}
    </Row>
  )
}
