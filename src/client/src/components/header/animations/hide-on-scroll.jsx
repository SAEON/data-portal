import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Collapse from '@material-ui/core/Collapse'
import { IMAGE_HEIGHT } from '../banner-bar'

export default ({ children, contentRef }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  const availableHeight = Math.min(window.innerHeight - contentRef?.offsetHeight || 0, IMAGE_HEIGHT)
  const collapsedSize = availableHeight < 0 ? 0 : availableHeight

  return (
    <Collapse collapsedSize={collapsedSize} in={!trigger}>
      <div>{children}</div>
    </Collapse>
  )
}
