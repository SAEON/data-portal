import Row from '../_row'
import Typography from '@mui/material/Typography'

export default ({ contributors }) => (
  <Row title="Contributors">
    {contributors.map((contributor, i) => (
      <div key={`${contributor.name}-${i}`}>
        <Typography gutterBottom variant="body2">
          <b>
            {contributor.contributorType
              ?.replace(/([A-Z])/g, ' $1')
              .trim()
              .titleize()}
          </b>
          {': '}
          {contributor.name}, {contributor.affiliation?.map(aff => aff.affiliation)}
        </Typography>
      </div>
    ))}
  </Row>
)
