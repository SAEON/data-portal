import { Card, Fade } from '@material-ui/core'
import Header from './header'
import Authors from './_authors'
import Descriptions from './_descriptions'
import Titles from './_titles'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.85)'

export default _source => {
  return (
    <Fade in={true} key={_source.doi}>
      <Card style={{ backgroundColor: CARD_BG_COLOUR, height: 220 }} variant="outlined">
        <Header {..._source} />
        <div style={{ maxHeight: 156, overflowY: 'auto', margin: '8px 8px 8px 0' }}>
          <Titles {..._source} />
          <Authors {..._source} />
          <Descriptions {..._source} />
        </div>
      </Card>
    </Fade>
  )
}
