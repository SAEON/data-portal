import { useContext, forwardRef } from 'react'
import { context as layoutContext } from '../../contexts/layout'
import AppBar from '@material-ui/core/AppBar'
import BannerBar from './banner-bar'
import BannerBar_ from './banner-bar/toolbar'
import MenuBar from './menu-bar'
import MenuBar_ from './menu-bar/toolbar'
import Divider from '@material-ui/core/Divider'
import HideOnScroll from './animations/hide-on-scroll'
import ElevationOnScroll from './animations/elevation-on-scroll'
import { IMAGE_HEIGHT } from './banner-bar'

const Header = forwardRef((props, ref) => {
  const { pathname } = window.location
  const currentRoute = pathname.match(/[^\/]*\/[^\/]*/)[0] // eslint-disable-line
  const headerLess = currentRoute === '/render'
  if (headerLess) {
    return null
  }

  return (
    <div ref={ref}>
      <ElevationOnScroll>
        <AppBar color="inherit">
          <HideOnScroll contentRef={props.contentRef}>
            <BannerBar />
          </HideOnScroll>
          <Divider />
          <MenuBar />
          <Divider />
        </AppBar>
      </ElevationOnScroll>

      {/* PUSH CONTENT DOWN */}
      <HideOnScroll contentRef={props.contentRef}>
        <BannerBar_>
          <div style={{ minHeight: IMAGE_HEIGHT }}></div>
        </BannerBar_>
      </HideOnScroll>
      <MenuBar_ />
    </div>
  )
})

export default () => {
  const { headerRef, setHeaderRef, contentRef } = useContext(layoutContext)
  return (
    <Header
      contentRef={contentRef}
      ref={el => {
        headerRef.current = el
        setHeaderRef(headerRef)
      }}
    />
  )
}
