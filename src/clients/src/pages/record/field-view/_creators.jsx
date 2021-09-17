import Row from '../_row'
import Typography from '@material-ui/core/Typography'

export default ({ creators }) => (
  <Row title="Author">
    {creators.map((creator, i) => (
      <div key={creator.name}>
        <Typography variant="body2">
          {creator.name}&nbsp;
          <sup>[{i + 1}]</sup>
        </Typography>
      </div>
    ))}
    <br />
    {creators.map((creator, i) => (
      <div key={creator.name}>
        <Typography gutterBottom variant="body2">
          <sup>[{i + 1}]</sup>&nbsp;
          {creator.affiliation?.map(aff => aff.affiliation)}
        </Typography>
      </div>
    ))}
  </Row>
)
