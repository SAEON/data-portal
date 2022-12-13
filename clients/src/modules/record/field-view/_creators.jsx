import Row from '../_row'
import Typography from '@mui/material/Typography'
import { Div, Sup, Br } from '../../../components/html-tags'

export default ({ creators }) => (
  <Row title="Author">
    {creators.map((creator, i) => (
      <Div key={creator.name}>
        <Typography variant="body2">
          {creator.name}&nbsp;
          <Sup>[{i + 1}]</Sup>
        </Typography>
      </Div>
    ))}
    <Br />
    {creators.map((creator, i) => (
      <Div key={creator.name}>
        <Typography gutterBottom variant="body2">
          <Sup>[{i + 1}]</Sup>&nbsp;
          {creator.affiliation?.map(aff => aff.affiliation)}
        </Typography>
      </Div>
    ))}
  </Row>
)
