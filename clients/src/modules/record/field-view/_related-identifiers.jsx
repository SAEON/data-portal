import Row from '../_row'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Div, B } from '../../../components/html-tags'

export default ({ relatedIdentifiers }) => (
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
