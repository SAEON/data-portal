import useScrollTrigger from '@mui/material/useScrollTrigger'
import Collapse from '@mui/material/Collapse'
import { Div } from '../../html-tags'

export default ({ children, contentRef }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  const collapsedSize = 0

  return (
    <Collapse collapsedSize={collapsedSize} in={!trigger}>
      <Div>{children}</Div>
    </Collapse>
  )
}
