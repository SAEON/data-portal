import { useContext, forwardRef } from 'react'
import { context as layoutContext } from '../../contexts/layout'
import AppBar from '@material-ui/core/AppBar'
import ApplicationBanner, {
  IMAGE_HEIGHT,
  Toolbar as ApplicationBanner_,
} from './application-banner'
import ApplicationHeader, { Toolbar as ApplicationHeader_ } from './application-header'
import Divider from '@material-ui/core/Divider'
import HideOnScroll from './animations/hide-on-scroll'
import ElevationOnScroll from './animations/elevation-on-scroll'

const FullHeader = forwardRef(({ contentRef, routes }, ref) => {
  return (
    <div ref={ref}>
      <ElevationOnScroll>
        <AppBar color="inherit">
          <HideOnScroll contentRef={contentRef}>
            <ApplicationBanner />
          </HideOnScroll>
          <Divider />
          <ApplicationHeader routes={routes} />
          <Divider />
        </AppBar>
      </ElevationOnScroll>

      {/* PUSH CONTENT DOWN */}
      <HideOnScroll contentRef={contentRef}>
        <ApplicationBanner_>
          <div style={{ minHeight: IMAGE_HEIGHT }} />
        </ApplicationBanner_>
      </HideOnScroll>
      <ApplicationHeader_ />
    </div>
  )
})

const BannerOnly = forwardRef(({ contentRef }, ref) => {
  return (
    <div ref={ref}>
      <ElevationOnScroll>
        <AppBar color="inherit">
          <HideOnScroll contentRef={contentRef}>
            <ApplicationBanner />
          </HideOnScroll>
          <Divider />
        </AppBar>
      </ElevationOnScroll>

      {/* PUSH CONTENT DOWN */}
      <HideOnScroll contentRef={contentRef}>
        <ApplicationBanner_>
          <div style={{ minHeight: IMAGE_HEIGHT }} />
        </ApplicationBanner_>
      </HideOnScroll>
    </div>
  )
})

export default ({ routes }) => {
  const { setHeaderRef, contentRef } = useContext(layoutContext)
  return <FullHeader contentRef={contentRef} ref={setHeaderRef} routes={routes} />
}

export const Banner = () => {
  const { setHeaderRef, contentRef } = useContext(layoutContext)
  return <BannerOnly contentRef={contentRef} ref={setHeaderRef} />
}
