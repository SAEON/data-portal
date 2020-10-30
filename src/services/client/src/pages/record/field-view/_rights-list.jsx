import Row from '../_row'
import { Typography } from '@material-ui/core'
import SimpleLink from '../../../components/link'

export default ({ rightsList }) => (
  <Row title="License">
    <div>
      {rightsList.map(rl => {
        return (
          <div key={rl.rightsURI}>
            <Typography variant="body2">{rl.rights}</Typography>
            <SimpleLink key={rl.rightsURI} uri={rl.rightsURI}>
              <Typography variant="body2">{rl.rightsURI}</Typography>
            </SimpleLink>
          </div>
        )
      })}
    </div>
  </Row>
)
