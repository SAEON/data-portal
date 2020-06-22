export default string =>
  string === '' ? {} : Object.fromEntries(string.split('&').map(s => s.split('=')))
