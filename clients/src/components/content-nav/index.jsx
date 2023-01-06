import { useState, useEffect, memo } from 'react'
import List from '@mui/material/List'
import NavItem from './_nav-item'
import { Div } from '../html-tags'

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
  const [activeIndex, setActiveIndex] = useState(_a)

  useEffect(() => {
    setActiveIndex(_a)
  }, [_a])

  return (
    <Div
      sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('lg')]: {
          flexDirection: 'row',
        },
      })}
    >
      <Div
        sx={theme => ({
          backgroundColor: theme.palette.common.white,
          [theme.breakpoints.up('lg')]: {
            minWidth: 250,
            maxWidth: 300,
          },
        })}
      >
        <List
          sx={theme => ({
            backgroundColor: theme => theme.palette.common.white,
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            maxHeight: 1000,
            overflow: 'auto',
            flexDirection: 'row',
            [theme.breakpoints.up('lg')]: {
              flexDirection: 'column',
            },
          })}
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
      </Div>

      <Div
        sx={theme => ({
          position: 'relative',
          height: '100%',
          flex: 1,
          mt: theme.spacing(2),
          [theme.breakpoints.up('lg')]: {
            mx: theme.spacing(2),
            mt: 'unset',
          },
        })}
      >
        <RenderNavContent setActiveIndex={setActiveIndex} activeIndex={activeIndex}>
          {children}
        </RenderNavContent>
      </Div>
    </Div>
  )
}
