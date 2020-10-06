import { gql, useMutation } from '@apollo/client'

/**
 * Usage
 *
 * // As a hook
 * import usePersistSearch from ...
 * const [persistSearchState, {loading, error, data}] = usePersistSearch()
 *
 * // As an HOC
 * import WithPersistSearch from ...
 * <WithPersistSearch>{
 *   ([persistSearchState, {loading, error, data}]) => {
 *     return (...)
 *   }
 * }</WithPersistSearch>
 */
export default ({ children } = {}) => {
  const mutation = useMutation(gql`
    mutation($state: JSON!) {
      browserClient {
        persistSearchState(state: $state)
      }
    }
  `)

  return children ? children(mutation) : mutation
}
