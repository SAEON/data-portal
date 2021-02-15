import { gql } from '@apollo/client'
import WithGqlQuery from '../../../hooks/with-gql-query'
import Autocomplete from '../../autocomplete'

export default ({ setCitationParams, citationParams, defaultLanguage }) => {
  return (
    <WithGqlQuery
      QUERY={gql`
        query {
          citationLocales: __type(name: "CitationLocale") {
            enumValues {
              name
            }
          }
        }
      `}
      fetchPolicy="cache-first"
    >
      {({ error, loading, data }) => {
        if (error) {
          throw error
        }

        return (
          <Autocomplete
            label="Language"
            variant="outlined"
            setOption={value =>
              setCitationParams(
                Object.assign(
                  { ...citationParams },
                  {
                    copied: false,
                    language: value?.replace(/-/g, '_') || defaultLanguage,
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
      }}
    </WithGqlQuery>
  )
}
