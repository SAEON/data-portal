export const getStateFromUri = () => {
  const url = window.location.href
  const regex = /[?&]([^=#]+)=([^&#]*)/g
  const params = {}

  var match
  while ((match = regex.exec(url))) {
    params[match[1]] = decodeURIComponent(match[2])
      .split(',')
      .filter(_ => _)
  }
  return params
}

/**
 *
 * @param {Object} history A history object from the useHistory hook
 */
export const setUriState = history => ({ pathname = window.location.pathname, terms }) => {
  history.push({
    pathname,
    search: `?terms=${encodeURIComponent(terms.join(','))}`,
  })
}

export const useUriState = history => ({
  getState: getStateFromUri,
  pushState: setUriState(history),
})
