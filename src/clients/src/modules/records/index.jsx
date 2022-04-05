import { useMemo } from 'react'
import Results from './search-results'
import Search from '../../components/search'
import SkipLink from '../../components/skip-link'
import Container from '@mui/material/Container'
import { alpha, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * disableSidebar will hide the 'show filters' button on a mobile
 *
 * hideSidebar will remove the sidebar in desktop mode, but allow
 * it to be toggled in mobile. This feature only applies when rendering
 * in mobile
 */
export default ({ showSearchBar = 'true', disableSidebar = 'false' } = {}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme => theme.breakpoints.down('md'))

  const style = useMemo(
    () => ({
      padding: theme.spacing(smDown ? 0 : 2),
      backgroundColor: alpha(theme.palette.common.black, 0.4),
    }),
    [smDown, theme]
  )

  return (
    <>
      <SkipLink href="#search-results" text="Skip to search results" />
      {showSearchBar.toBoolean() && (
        <Toolbar style={style}>
          <Container disableGutters={smDown}>
            <Search />
          </Container>
        </Toolbar>
      )}
      <Results disableSidebar={disableSidebar.toBoolean()} />
    </>
  )
}
