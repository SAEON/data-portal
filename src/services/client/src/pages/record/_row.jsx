import { isMobile } from 'react-device-detect'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ title, children, ...props }) => {
  const theme = useTheme()
  const { style, ...otherProps } = props

  return (
    <Grid style={Object.assign({}, { margin: theme.spacing(1) }, style)} item {...otherProps}>
      <Card
        style={{
          margin: isMobile ? '0 16px' : '',
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
