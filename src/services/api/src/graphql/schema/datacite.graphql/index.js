import fetch from 'node-fetch'

const _fetch = p => fetch(p).then(res => res.json())

const dataciteCitationStyles = `
enum CitationStyle {
  ${(await _fetch('https://citation.crosscite.org/styles/'))
    .map(str => str.replace(/-/g, '_'))
    .join('\n')}
}
`

const dataciteCitationLocales = `
enum CitationLocale {
  ${(await _fetch('https://citation.crosscite.org/locales/'))
    .map(str => str.replace(/-/g, '_'))
    .join('\n')}
}
`

export default `${dataciteCitationStyles} ${dataciteCitationLocales}`
