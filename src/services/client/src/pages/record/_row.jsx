import { isMobile } from 'react-device-detect'
import { Grid, Typography, Card, CardContent } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.85)'

export default ({ title, children, ...props }) => {
  const theme = useTheme()
  const { style, ...otherProps } = props

  return (
    <Grid style={Object.assign({}, { margin: theme.spacing(1) }, style)} item {...otherProps}>
      <Card
        style={{ backgroundColor: CARD_BG_COLOUR, margin: isMobile ? '0 16px' : '' }}
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
