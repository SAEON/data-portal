import { forwardRef } from 'react'
import { styled, alpha } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

export default styled(
  forwardRef(({ gridProps, children, ...props }, ref) => (
    <Grid item xs={12} lg={4} {...gridProps} {...props}>
      <Paper
        ref={ref}
        variant="elevation"
        sx={{
          height: 420,
          background: theme => alpha(theme.palette.common.white, 0.95),
          position: 'relative',
        }}
      >
        {children}
      </Paper>
    </Grid>
  ))
)({})
