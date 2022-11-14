import Results from './search-results'
import SkipLink from '../../components/skip-link'

/**
 * disableSidebar will hide the 'show filters' button on a mobile
 *
 * hideSidebar will remove the sidebar in desktop mode, but allow
 * it to be toggled in mobile. This feature only applies when rendering
 * in mobile
 */
export default ({ showSearchBar = 'true', disableSidebar = 'false' } = {}) => {
  return (
    <>
      <SkipLink href="#search-results" text="Skip to search results" />
      <Results showSearch={showSearchBar.toBoolean()} showSidebar={disableSidebar.toBoolean()} />
    </>
  )
}
