import { useContext } from 'react'
import { UriStateContext } from '../../modules/provider-uri-state'
import useCatalogue from '../../lib/useCatalogue'

export default () => {
  const { getUriState } = useContext(UriStateContext)
  const { terms = undefined } = Object.assign(getUriState({ splitString: true }))
  const { extent = undefined, text = undefined, layersearch = undefined } = getUriState({
    splitString: false,
  })

  var graphQlResult
  if (layersearch) {
    console.log('search for records with terms, extent and text')
    graphQlResult = useCatalogue()
  } else {
    console.log('search for records by DOI value, keep a map of which resource to use per record')
  }

  const { error, loading, data } = graphQlResult
  console.log(error, loading, data)

  return 'hi'
}
