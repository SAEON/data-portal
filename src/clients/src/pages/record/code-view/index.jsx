import Row from '../_row'
import Grid from '@mui/material/Grid'
import { Pre } from '../../../components/html-tags'

export default ({ json }) => {
  return (
    <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch">
      <Row title={'Metadata Source JSON'}>
        <Pre>{JSON.stringify(json, null, 2)}</Pre>
      </Row>
    </Grid>
  )
}
