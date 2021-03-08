import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'
import Autocomplete from '../../../components/autocomplete'

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
}
