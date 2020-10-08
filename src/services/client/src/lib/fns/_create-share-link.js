import { CLIENT_HOST_ADDRESS } from '../../config'

export default ({ searchId, shareType }) => {
  const currentPath = window.location.pathname

  if (['/', '/atlas'].includes(currentPath)) {
    return `${CLIENT_HOST_ADDRESS}/render${currentPath}?search=${searchId}`
  }

  /**
   * /records (fullpage)
   */
  if (currentPath === '/records' && shareType === 'fullpage') {
    return `${CLIENT_HOST_ADDRESS}/render/records?${
      shareType === 'component' ? 'disableSidebar=true&' : ''
    }search=${searchId}&showSearchBar=true`
  }

  /**
   * /records (component)
   */
  if (currentPath === '/records' || currentPath === '/render/records') {
    return `${CLIENT_HOST_ADDRESS}/render/records?${
      shareType === 'component' ? 'disableSidebar=true&' : ''
    }search=${searchId}`
  }

  /**
   * /records/:id
   */
  if (currentPath.match(/\/records\/.*/)) {
    return `${CLIENT_HOST_ADDRESS}/render/record?id=${window.location.href.substring(
      window.location.href.lastIndexOf('/') + 1
    )}`
  }
}
