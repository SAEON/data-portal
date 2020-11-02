import Results from './search-results'
import SearchBar from './search-bar'
import { isMobile } from 'react-device-detect'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink } from '../../hooks'

export default ({ showSearchBar = true, ...props } = {}) => {
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/records?disableSidebar=true`,
    params: true,
  })
  return showSearchBar ? (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'block', width: '100%' }}>
          <SearchBar />
        </div>
      </div>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div style={{ display: 'block', width: '100%' }}>
          <Results
            disableSidebar={props.disableSidebar || false}
            hideSidebar={isMobile ? true : false}
          />
        </div>
      </div>
    </div>
  ) : (
    <Results disableSidebar={props.disableSidebar || false} hideSidebar={isMobile ? true : false} />
  )
}
