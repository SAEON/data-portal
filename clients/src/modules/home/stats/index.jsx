import { forwardRef } from 'react'
import { Div } from '../../../components/html-tags'
import { alpha } from '@mui/material/styles'
import Container from '@mui/material/Container'

export default forwardRef((props, ref) => {
  return (
    <Div
      ref={ref}
      sx={{
        backgroundColor: theme => alpha(theme.palette.common.white, 0.8),
      }}
    >
      <Container>hi</Container>
    </Div>
  )
})
