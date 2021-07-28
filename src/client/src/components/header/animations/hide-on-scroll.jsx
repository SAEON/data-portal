import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Collapse from '@material-ui/core/Collapse'

export default ({ children, contentRef }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  const availableHeight = window.innerHeight - contentRef.current?.offsetHeight || 0
  const collapsedSize = availableHeight < 0 ? 0 : availableHeight

  return (
    <Collapse collapsedSize={collapsedSize} in={!trigger}>
      <div>{children}</div>
    </Collapse>
  )
}
