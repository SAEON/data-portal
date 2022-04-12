import { useRef } from 'react'
import SkipLink from '../../components/skip-link'
import { ScrollButton } from '../../components/fancy-buttons'
import Search from './search'
import { alpha } from '@mui/material/styles'
import { Div } from '../../components/html-tags'
import Content from './content'

export default () => {
  const ref = useRef(null)
  return (
    <>
      <SkipLink href="#home-search" text="Skip to main content" />
      <Search />
      <Div
        ref={el => (ref.current = el)}
        sx={{
          minHeight: '10vh',
          backgroundColor: theme => alpha(theme.palette.common.black, 0.4)
        }}
      >
        {/* SCROLL BUTTON */}
        {/* <ScrollButton
          onClick={() =>
            window.scrollTo({ top: ref.current.offsetTop, left: 0, behavior: 'smooth' })
          }
          sx={{
            position: 'relative',
            top: `-100px`,
          }}
          title={'Scroll to content'}
        /> */}

        {/* CONTENT BUTTON */}
        {/* <Content /> */}
      </Div>
    </>
  )
}
