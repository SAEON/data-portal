import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTheme, alpha } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

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
          marginBottom: theme.spacing(mdUp ? 1 : 0)
        },
        style
      )}
      item
      {...otherProps}
    >
      <Card
        style={{
          backgroundColor: alpha(theme.palette.common.white, 0.9)
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
