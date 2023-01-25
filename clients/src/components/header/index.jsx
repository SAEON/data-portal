import { useContext, forwardRef } from 'react'
import { context as layoutContext } from '../../contexts/layout'
import AppBar from '@mui/material/AppBar'
import ApplicationBanner, {
  IMAGE_HEIGHT,
  Toolbar as ApplicationBanner_,
} from './application-banner'
import AppHeader, { Toolbar as ApplicationHeader_, TitleHeader } from './application-header'
import Divider from '@mui/material/Divider'
import HideOnScroll from './animations/hide-on-scroll'
import ElevationOnScroll from './animations/elevation-on-scroll'
import { Div } from '../html-tags'

const FullHeader = forwardRef(({ title, contentRef, AppHeader }, ref) => {
  return (
    <Div ref={ref}>
      <ElevationOnScroll>
        <AppBar color="inherit">
          <HideOnScroll contentRef={contentRef}>
            <ApplicationBanner title={title} />
          </HideOnScroll>
          <Divider />
          <AppHeader />
          <Divider />
        </AppBar>
      </ElevationOnScroll>

      {/* PUSH CONTENT DOWN */}
      <HideOnScroll contentRef={contentRef}>
        <ApplicationBanner_>
          <Div
            sx={theme => ({
              m: theme.spacing(1),
              [theme.breakpoints.up('md')]: {
                minHeight: IMAGE_HEIGHT,
              },
            })}
          />
        </ApplicationBanner_>
      </HideOnScroll>
      <ApplicationHeader_ />
    </Div>
  )
})

const AppHeaderOnly = forwardRef(
  ({ contentBase, routes, color = 'inherit', disableBreadcrumbs, ...props }, ref) => {
    return (
      <Div ref={ref}>
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
      </Div>
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
    <Div ref={ref}>
      <ElevationOnScroll>
        <AppBar color="inherit">
          <ApplicationBanner title={title} />

          <Divider />
        </AppBar>
      </ElevationOnScroll>

      {/* PUSH CONTENT DOWN */}

      <ApplicationBanner_>
        <Div sx={{ minHeight: IMAGE_HEIGHT }} />
      </ApplicationBanner_>
    </Div>
  )
})

export default ({ contentBase, title, routes }) => {
  const { setHeaderRef, contentRef } = useContext(layoutContext)
  return (
    <FullHeader
      title={title}
      contentRef={contentRef}
      ref={setHeaderRef}
      AppHeader={() => <AppHeader contentBase={contentBase} routes={routes} />}
    />
  )
}

export const Banner = ({ title }) => {
  const { setHeaderRef } = useContext(layoutContext)
  return <BannerOnly title={title} ref={setHeaderRef} />
}

export const ListHeader = ({ title, description }) => {
  const { setHeaderRef, contentRef } = useContext(layoutContext)
  return (
    <FullHeader
      title={title}
      contentRef={contentRef}
      ref={setHeaderRef}
      AppHeader={() => <TitleHeader description={description} />}
    />
  )
}

export const ApplicationHeader = ({ contentBase, routes, ...props }) => {
  const { setHeaderRef } = useContext(layoutContext)
  return <AppHeaderOnly contentBase={contentBase} routes={routes} ref={setHeaderRef} {...props} />
}
