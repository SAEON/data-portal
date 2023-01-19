import { memo } from 'react'

export default memo(
  ({ children, activeIndex, setActiveIndex }) => children({ setActiveIndex, activeIndex }),
  (a, b) => {
    if (a.activeIndex !== b.activeIndex) return false
    if (JSON.stringify(a.size) !== JSON.stringify(b.size)) return false
    return true
  }
)
