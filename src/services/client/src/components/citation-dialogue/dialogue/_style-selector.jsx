import { gql } from '@apollo/client'
import WithGqlQuery from '../../../hooks/with-gql-query'
import Autocomplete from '../../../components/autocomplete'

export default ({ setCitationParams, citationParams, defaultStyle }) => {
  return (
    <WithGqlQuery
      fetchPolicy="cache-first"
      QUERY={gql`
        query {
          citationStyles: __type(name: "CitationStyle") {
            enumValues {
              name
            }
          }
        }
      `}
    >
      {({ error, loading, data }) => {
        if (error) {
          throw error
        }

        return (
          <Autocomplete
            label="Style"
            variant="outlined"
            setOption={value =>
              setCitationParams(
                Object.assign(
                  { ...citationParams },
                  {
                    copied: false,
                    style: value?.replace(/-/g, '_') || defaultStyle,
                  }
                )
              )
            }
            selectedOptions={citationParams.style.replace(/_/g, '-')}
            options={
              loading
                ? [defaultStyle.replace(/_/g, '-'), 'Loading ...']
                : data.citationStyles?.enumValues?.map(v => v.name.replace(/_/g, '-'))
            }
          />
        )
      }}
    </WithGqlQuery>
  )
}
