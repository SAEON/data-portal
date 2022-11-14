import { gql, useQuery } from '@apollo/client'
import Autocomplete from '../../autocomplete'

const STYLE_TO_HUMAN = {
  apa: 'APA',
  bibtex: 'BibTeX',
  chicago_fullnote_bibliography: 'Chicago',
  harvard_cite_them_right: 'Harvard',
  ieee: 'IEEE',
  modern_language_association: 'MLA',
  vancouver: 'Vancouver',
  ris: 'RIS',
}

const HUMAN_TO_STYLE = Object.fromEntries(
  Object.entries(STYLE_TO_HUMAN).map(([style, human]) => [human, style])
)

export default ({ setCitationParams, citationParams, defaultStyle }) => {
  const { error, loading, data } = useQuery(
    gql`
      query {
        citationStyles: __type(name: "CitationStyle") {
          enumValues {
            name
          }
        }
      }
    `,
    { fetchPolicy: 'cache-first' }
  )

  if (error) {
    throw error
  }

  return (
    <Autocomplete
      aria-label="Select citation format"
      label="Style"
      variant="outlined"
      setOption={value =>
        setCitationParams(
          Object.assign(
            { ...citationParams },
            {
              copied: false,
              style: HUMAN_TO_STYLE[value] || defaultStyle,
            }
          )
        )
      }
      selectedOptions={STYLE_TO_HUMAN[citationParams.style]}
      options={
        loading
          ? [STYLE_TO_HUMAN[defaultStyle], 'Loading ...']
          : data.citationStyles.enumValues.map(({ name }) => STYLE_TO_HUMAN[name])
      }
    />
  )
}
