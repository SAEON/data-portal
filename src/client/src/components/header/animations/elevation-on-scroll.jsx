import { cloneElement } from 'react'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

export default ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}
