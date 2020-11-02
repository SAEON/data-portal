import Row from '../_row'
import { Typography } from '@material-ui/core'

export default ({ contributors }) => (
  <Row title="Contributors">
    {contributors.map((contributor, i) => (
      <div key={contributor.name}>
        <Typography gutterBottom variant="body2">
          {contributor.name}&nbsp;
          <sup>[{i + 1}]</sup>
        </Typography>
      </div>
    ))}
    <br />
    {contributors.map((contributor, i) => (
      <div key={contributor.name}>
        <Typography gutterBottom variant="body2">
          <sup>[{i + 1}]</sup>&nbsp;
          {contributor.contributorType
            ?.replace(/([A-Z])/g, ' $1')
            .trim()
            .toUpperCase()}{' '}
          {contributor.affiliation?.map(aff => aff.affiliation)}
        </Typography>
      </div>
    ))}
  </Row>
)
