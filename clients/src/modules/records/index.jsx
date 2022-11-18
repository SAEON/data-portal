import { useEffect, useContext } from 'react'
import { context as globalContext } from '../../contexts/global'
import Results from './search-results'
import SkipLink from '../../components/skip-link'

/**
 * disableSidebar will hide the 'show filters' button on a mobile
 *
 * hideSidebar will remove the sidebar in desktop mode, but allow
 * it to be toggled in mobile. This feature only applies when rendering
 * in mobile
 */
const Render = ({ showSearchBar, disableSidebar }) => (
  <>
    <SkipLink href="#search-results" text="Skip to search results" />
    <Results showSearch={showSearchBar.toBoolean()} showSidebar={disableSidebar.toBoolean()} />
  </>
)

export default ({ showSearchBar = 'true', disableSidebar = 'false' } = {}) => {
  const { setGlobal } = useContext(globalContext)
  useEffect(() => () => setGlobal({ selectAll: false, selectedIds: [] }), [])
  return <Render showSearchBar={showSearchBar} disableSidebar={disableSidebar} />
}
