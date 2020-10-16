import Row from '../_row'
import { Grid, Fade } from '@material-ui/core'

export default ({ codeView, json }) => (
  <Fade key="1" in={codeView}>
    <Grid container direction="column" justify="space-evenly" alignItems="stretch">
      <Row style={{ width: '100%' }} title={'Metadata Source JSON'}>
        <pre style={{ whiteSpace: 'break-spaces', wordBreak: 'break-word' }}>
          {JSON.stringify(json, null, 2)}
        </pre>
      </Row>
    </Grid>
  </Fade>
)
