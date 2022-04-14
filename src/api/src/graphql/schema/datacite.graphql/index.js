import fetchContent, { formatJson } from './_fetch-content.js'
import { TEMP_DIRECTORY } from '../../../config/index.js'

/**
 * NOTE
 *
 * Initially the citation popup just passed requests
 * directly to crosscite. This is a later addition to
 * limit the number of possible formats to just useful
 * journals.
 *
 * There are actually TWO APIs consumed here - crosscite
 * for everything except 'ris', which uses datacite.
 *
 * See _citation.js for how the APIs are consumed
 */

const USEFUL_STYLES = formatJson([
  'apa',
  'harvard-cite-them-right',
  'modern-language-association',
  'vancouver',
  'chicago-fullnote-bibliography',
  'ieee',
  'bibtex',
]).split('\n')

const dataciteCitationStyles = `
  enum CitationStyle {
    ${(
      await fetchContent({
        cachePath: `${TEMP_DIRECTORY}/datacite-citation-styles.json`,
        contentUri: 'https://citation.crosscite.org/styles/',
      })
    )
      .split('\n')
      .filter(style => USEFUL_STYLES.includes(style))
      .join('\n')}
      ris
  }`

const dataciteCitationLocales = `
  enum CitationLocale {
    ${await fetchContent({
      cachePath: `${TEMP_DIRECTORY}/datacite-citation-locales.json`,
      contentUri: 'https://citation.crosscite.org/locales/',
    })}
  }`

export default `${dataciteCitationStyles} ${dataciteCitationLocales}`
