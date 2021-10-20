import { memo, useMemo } from 'react'
import ConfirmAndMutate from './_confirm-and-mutate'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export default memo(({ changes, selectedChanges, ...props }) => {
  const metadataIds = useMemo(() => selectedChanges.map(({ id }) => id), [selectedChanges])

  const { error, loading, data } = useQuery(
    gql`
      query ($ids: [ID!]) {
        indexedMetadata(ids: $ids) {
          id
          metadata
        }
      }
    `,
    {
      fetchPolicy: 'cache-first',
      variables: {
        ids: metadataIds,
      },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  /**
   * If a field in the table is changes without using the JSON
   * editor, then the record won't have the full metadata. So
   * always fetch the metadata record first, and then merge the
   * changes onto the records before posting back to the ODP
   */
  const mergedChanges = data.indexedMetadata.map(record => {
    const { id, metadata, ...restOfRecord } = record
    const { metadata: metadataChanges = {}, ...otherChanges } = changes[id] || {}
    return { id, ...restOfRecord, ...otherChanges, metadata: { ...metadata, ...metadataChanges } }
  })

  return <ConfirmAndMutate changes={changes} mergedChanges={mergedChanges} {...props} />
})
