import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default ({ title, children, ...props }) => {
  const theme = useTheme()
  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'))
  const { style, ...otherProps } = props

  return (
    <Grid
      style={Object.assign(
        {},
        {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(mdUp ? 1 : 0),
        },
        style
      )}
      item
      {...otherProps}
    >
      <Card
        style={{
          backgroundColor: theme.backgroundColor,
        }}
        variant="outlined"
      >
        <CardContent>
          {
            <Typography gutterBottom variant="overline">
              <b>{title}</b>
            </Typography>
          }
          {children}
        </CardContent>
      </Card>
    </Grid>
  )
}
