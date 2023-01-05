import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { alpha } from '@mui/material/styles'
import { B } from '../../components/html-tags'

export default ({ title, children, ...props }) => {
  const { sx, cardContentSx = {}, titleSx = {}, ...otherProps } = props

  return (
    <Grid
      sx={theme => ({
        mt: 0,
        mr: 0,
        mb: 0,
        ml: 0,
        [theme.breakpoints.up('md')]: {
          mb: theme.spacing(0.75),
          ':last-child': {
            mb: 0,
          },
        },
        ...sx,
      })}
      item
      {...otherProps}
    >
      <Card
        sx={{
          backgroundColor: theme => alpha(theme.palette.common.white, 0.9),
          '&:hover': {
            backgroundColor: theme => theme.palette.common.white,
            transition: theme => theme.transitions.create(['background-color']),
          },
        }}
        variant="outlined"
      >
        <CardContent sx={cardContentSx}>
          {title && (
            <Typography sx={titleSx} gutterBottom variant="overline">
              <B>{title}</B>
            </Typography>
          )}
          {children}
        </CardContent>
      </Card>
    </Grid>
  )
}
