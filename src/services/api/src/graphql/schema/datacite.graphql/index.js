import fetchContent from './_fetch-content.js'
import { CATALOGUE_API_TEMP_DIRECTORY } from '../../../config.js'

const CITATION_STYLES_URI = 'https://citation.crosscite.org/styles/'
const CITATION_STYLES_PATH = `${CATALOGUE_API_TEMP_DIRECTORY}/datacite-citation-styles.json`
const CITATION_LOCALES_URI = 'https://citation.crosscite.org/locales/'
const CITATION_LOCALES_PATH = `${CATALOGUE_API_TEMP_DIRECTORY}/datacite-citation-locales.json`

const dataciteCitationStyles = `
enum CitationStyle {
  ${await fetchContent({ cachePath: CITATION_STYLES_PATH, contentUri: CITATION_STYLES_URI })}
}
`

const dataciteCitationLocales = `
enum CitationLocale {
  ${await fetchContent({ cachePath: CITATION_LOCALES_PATH, contentUri: CITATION_LOCALES_URI })}
}
`

export default `${dataciteCitationStyles} ${dataciteCitationLocales}`
