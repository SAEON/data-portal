import Row from '../_row'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ codeView, json }) => {
  const theme = useTheme()

  return (
    <Fade key="1" in={codeView}>
      <Grid
        style={{ padding: theme.spacing(4) }}
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        <Row title={'Metadata Source JSON'}>
          <pre style={{ whiteSpace: 'break-spaces', wordBreak: 'break-word' }}>
            {JSON.stringify(json, null, 2)}
          </pre>
        </Row>
      </Grid>
    </Fade>
  )
}
