import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'
import Autocomplete from '../../autocomplete'

export default ({ setCitationParams, citationParams, defaultLanguage }) => {
  const { error, loading, data } = useQuery(
    gql`
      query {
        citationLocales: __type(name: "CitationLocale") {
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
      aria-label="Select citation locale"
      label="Language"
      variant="outlined"
      setOption={value =>
        setCitationParams(
          Object.assign(
            { ...citationParams },
            {
              copied: false,
              language: value?.replace(/-/g, '_') || defaultLanguage
            }
          )
        )
      }
      selectedOptions={citationParams.language.replace(/_/g, '-')}
      options={
        loading
          ? [defaultLanguage.replace(/_/g, '-'), 'Loading ...']
          : data.citationLocales?.enumValues?.map(v => v.name.replace(/_/g, '-'))
      }
    />
  )
}
