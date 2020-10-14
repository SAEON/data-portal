import React from 'react'
import { isMobile } from 'react-device-detect'
import { Grid, Typography, Card, CardContent } from '@material-ui/core'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.85)'

export default ({ title, children, ...props }) => (
  <Grid item {...props}>
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
