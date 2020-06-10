/**
 * Parse query string into an object
 */
export default string => {
  if (string == '') return {}

  const segments = string.split('&').map(s => s.split('='))
  const queryString = {}
  segments.forEach(s => (queryString[s[0]] = s[1]))
  return queryString
}
