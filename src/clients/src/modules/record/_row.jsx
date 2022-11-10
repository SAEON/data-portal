import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { alpha } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export default ({ title, children, ...props }) => {
  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'))
  const { style, ...otherProps } = props

  return (
    <Grid
      sx={Object.assign(
        {},
        {
          ml: theme => theme.spacing(1),
          mr: theme => theme.spacing(1),
          mt: theme => theme.spacing(1),
          mb: theme => theme.spacing(mdUp ? 1 : 0),
        },
        style
      )}
      item
      {...otherProps}
    >
      <Card
        sx={{
          backgroundColor: theme => alpha(theme.palette.common.white, 0.9),
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
