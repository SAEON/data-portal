import { useState, useEffect } from 'react'
import List from '@mui/material/List'
import NavItem from './_nav-item'
import { Div } from '../html-tags'
import RenderNavContent from './_render-content'

export default ({ navItems, children, activeIndex: _a = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(_a)
  const [ref, setRef] = useState(null)

  useEffect(() => {
    setActiveIndex(_a)
  }, [_a])

  return (
    <Div
      sx={theme => ({
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        [theme.breakpoints.up('lg')]: {
          flexDirection: 'row',
        },
      })}
    >
      <Div
        ref={el => setRef(el)}
        sx={theme => ({
          backgroundColor: theme.palette.common.white,
          [theme.breakpoints.up('lg')]: {
            maxWidth: 400,
          },
        })}
      >
        <List
          sx={theme => ({
            backgroundColor: theme => theme.palette.common.white,
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            maxHeight: ref?.offsetHeight ? ref.offsetHeight + 64 : 1000,
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
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          mt: 0,
          [theme.breakpoints.up('lg')]: {
            mx: theme.spacing(2),
            width: 0,
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
