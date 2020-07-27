export const getStateFromUri = (splitResult = true) => {
  const url = window.location.href
  const regex = /[?&]([^=#]+)=([^&#]*)/g
  const params = {}

  var match
  while ((match = regex.exec(url))) {
    params[match[1]] = splitResult
      ? decodeURIComponent(match[2])
          .split(',')
          .map(item => decodeURIComponent(item))
          .filter(_ => _)
      : decodeURIComponent(match[2])
  }
  return params
}

/**
 *
 * @param {Object} history A history object from the useHistory hook
 */
export const setUriState = history => ({ pathname = window.location.pathname, terms }) => {
  console.log(terms)
  history.push({
    pathname,
    search: `?terms=${encodeURIComponent(terms.map(term => encodeURIComponent(term)).join(','))}`,
  })
}

export const useUriState = history => ({
  getState: getStateFromUri,
  pushState: setUriState(history),
})
