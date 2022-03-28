import { useState, useEffect, memo } from 'react'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
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

export default ({ navItems, children, activeIndex: _a = 0 }) => {
  const theme = useTheme()
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'))
  const [activeIndex, setActiveIndex] = useState(_a)

  useEffect(() => {
    setActiveIndex(_a)
  }, [_a])

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
            overflow: 'auto'
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
