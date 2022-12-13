import Row from '../_row'
import Typography from '@mui/material/Typography'
import { Div, B } from '../../../components/html-tags'

export default ({ contributors }) => (
  <Row title="Contributors">
    {contributors.map((contributor, i) => (
      <Div key={`${contributor.name}-${i}`}>
        <Typography gutterBottom variant="body2">
          <B>
            {contributor.contributorType
              ?.replace(/([A-Z])/g, ' $1')
              .trim()
              .titleize()}
          </B>
          {': '}
          {contributor.name}, {contributor.affiliation?.map(aff => aff.affiliation)}
        </Typography>
      </Div>
    ))}
  </Row>
)
