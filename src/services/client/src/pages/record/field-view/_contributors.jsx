import Row from '../_row'
import Typography from '@material-ui/core/Typography'

export default ({ contributors }) => (
  <Row title="Contributors">
    {contributors.map(contributor => (
      <div key={contributor.name}>
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
