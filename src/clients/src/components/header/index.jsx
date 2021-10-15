import { useContext, forwardRef } from 'react'
import { context as layoutContext } from '../../contexts/layout'
import AppBar from '@mui/material/AppBar'
import ApplicationBanner, {
  IMAGE_HEIGHT,
  Toolbar as ApplicationBanner_,
} from './application-banner'
import AppHeader, { Toolbar as ApplicationHeader_ } from './application-header'
import Divider from '@mui/material/Divider'
import HideOnScroll from './animations/hide-on-scroll'
import ElevationOnScroll from './animations/elevation-on-scroll'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const FullHeader = forwardRef(({ contentBase, title, contentRef, routes }, ref) => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <div ref={ref}>
      <ElevationOnScroll>
        <AppBar color="inherit">
          <HideOnScroll contentRef={contentRef}>
            <ApplicationBanner title={title} />
          </HideOnScroll>
          <Divider />
          <AppHeader contentBase={contentBase} routes={routes} />
          <Divider />
        </AppBar>
      </ElevationOnScroll>

      {/* PUSH CONTENT DOWN */}
      <HideOnScroll contentRef={contentRef}>
        <ApplicationBanner_>
          <div style={Object.assign({ margin: 9 }, mdDown ? {} : { minHeight: IMAGE_HEIGHT })} />
        </ApplicationBanner_>
      </HideOnScroll>
      <ApplicationHeader_ />
    </div>
  )
})

const AppHeaderOnly = forwardRef(
  ({ contentBase, routes, color = 'inherit', disableBreadcrumbs, ...props }, ref) => {
    return (
      <div ref={ref}>
        <ElevationOnScroll>
          <AppBar color={color}>
            <AppHeader
              contentBase={contentBase}
              disableBreadcrumbs={disableBreadcrumbs}
              {...props}
              routes={routes}
            />
            <Divider />
          </AppBar>
        </ElevationOnScroll>

        {/* PUSH CONTENT DOWN */}
        <ApplicationHeader_ {...props} />
      </div>
    )
  }
)

/**
 * TODO
 * elevation and hiding on scroll
 * should be configurable for this
 * component
 */
const BannerOnly = forwardRef(({ title }, ref) => {
  return (
    <div ref={ref}>
      <ElevationOnScroll>
        <AppBar color="inherit">
          <ApplicationBanner title={title} />

          <Divider />
        </AppBar>
      </ElevationOnScroll>

      {/* PUSH CONTENT DOWN */}

      <ApplicationBanner_>
        <div style={{ minHeight: IMAGE_HEIGHT }} />
      </ApplicationBanner_>
    </div>
  )
})

export default ({ contentBase, title, routes }) => {
  const { setHeaderRef, contentRef } = useContext(layoutContext)
  return (
    <FullHeader
      contentBase={contentBase}
      title={title}
      contentRef={contentRef}
      ref={setHeaderRef}
      routes={routes}
    />
  )
}

export const Banner = ({ title }) => {
  const { setHeaderRef } = useContext(layoutContext)
  return <BannerOnly title={title} ref={setHeaderRef} />
}

export const ApplicationHeader = ({ contentBase, routes, ...props }) => {
  const { setHeaderRef } = useContext(layoutContext)
  return <AppHeaderOnly contentBase={contentBase} routes={routes} ref={setHeaderRef} {...props} />
}
