import Results from './search-results'
import SearchBar from './search-bar'
import { isMobile } from 'react-device-detect'
import SkipLink from '../../components/skip-link'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink } from '../../hooks/use-share-link'

/**
 * disableSidebar will hide the 'show filters' button on a mobile
 *
 * hideSidebar will remove the sidebar in desktop mode, but allow
 * it to be toggled in mobile. This feature only applies when rendering
 * in mobile
 */
export default ({ showSearchBar = true, disableSidebar = false } = {}) => {
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/records?disableSidebar=true`,
    params: true,
  })

  const hideSidebar = isMobile ? true : false

  return (
    <>
      <SkipLink href="#search-results" text="Skip to search results" />
      {showSearchBar ? (
        <SearchBar>
          <Results disableSidebar={disableSidebar} hideSidebar={hideSidebar} />
        </SearchBar>
      ) : (
        <Results disableSidebar={disableSidebar} hideSidebar={hideSidebar} />
      )}
    </>
  )
}
