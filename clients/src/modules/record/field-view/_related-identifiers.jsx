import Row from '../_row'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Div, B } from '../../../components/html-tags'

const EXCLUDE_RELATIONSHIPS = ['HasMetadata']

export default ({ relatedIdentifiers }) => {
  relatedIdentifiers = relatedIdentifiers.filter(
    ({ relationType: t }) => !EXCLUDE_RELATIONSHIPS.includes(t)
  )

  if (relatedIdentifiers.length < 1) {
    return undefined
  }

  return (
    <Row title="Related Resources">
      {relatedIdentifiers.map((lr, i) => (
        <Div key={`related-resource${i}`}>
          <Typography variant="body2">
            <B>{`${lr?.relationType?.split(/(?=[A-Z])/).join(' ') || '(Unknown relationship)'}`}</B>{' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`${lr.relatedIdentifierType === 'DOI' ? ' https://doi.org/' : ''}${
                lr.relatedIdentifier
              }`}
            >{`${lr.relatedIdentifier || 'Missing/incorrect metadata'}`}</Link>
          </Typography>
        </Div>
      ))}
    </Row>
  )
}
