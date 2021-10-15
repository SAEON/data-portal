import Row from '../_row'
import Grid from '@mui/material/Grid'

export default ({ json }) => {
  return (
    <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch">
      <Row title={'Metadata Source JSON'}>
        <pre style={{ whiteSpace: 'break-spaces', wordBreak: 'break-word' }}>
          {JSON.stringify(json, null, 2)}
        </pre>
      </Row>
    </Grid>
  )
}
