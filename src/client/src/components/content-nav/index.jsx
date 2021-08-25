import { useState, useCallback, memo } from 'react'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import NavItem from './_nav-item'

const RenderNavContent = memo(
  ({ children, activeIndex, setActiveIndex }) => {
    return <div>{children({ setActiveIndex, activeIndex })}</div>
  },
  (a, b) => {
    if (a.activeIndex !== b.activeIndex) return false
    return true
  }
)

export default ({ navItems, children }) => {
  const theme = useTheme()
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'))
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        <List
          style={{
            backgroundColor: theme.palette.common.white,
            padding: 0,
            display: 'flex',
            flexDirection: lgAndUp ? 'column' : 'row',
            maxHeight: 1000,
            overflow: 'auto',
          }}
        >
          {navItems.map((props, i) => (
            <NavItem
              i={i}
              setActiveIndex={val => setActiveIndex(() => val)}
              activeIndex={activeIndex}
              {...props}
              key={i}
            />
          ))}
        </List>
      </Grid>

      <Grid item xs={12} lg={9} style={{ position: 'relative', height: '100%' }}>
        <RenderNavContent setActiveIndex={setActiveIndex} activeIndex={activeIndex}>
          {children}
        </RenderNavContent>
      </Grid>
    </Grid>
  )
}
