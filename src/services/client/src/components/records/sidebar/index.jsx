import React, { memo, useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Grid, Typography } from '@material-ui/core'
import { UriStateContext } from '../../../modules/provider-uri-state'
import TagFilter from './tag-filter'
import AreaFilter from './area-filter'

export default memo(() => {
  const { uriState } = useContext(UriStateContext)

  let { terms = '' } = uriState
  terms = terms
    .split(',')
    .map(item => decodeURIComponent(item))
    .filter(_ => _)

  const { error, loading, data } = useQuery(
    gql`
      query catalogue($filterBySubjects: [String!], $fields: [String!]) {
        catalogue {
          id
          summary(fields: $fields, filterBySubjects: $filterBySubjects)
        }
      }
    `,
    {
      variables: {
        fields: [
          'metadata_json.publicationYear',
          'metadata_json.publisher.raw',
          'metadata_json.subjects.subject.raw',
        ],
        filterBySubjects: terms,
      },
    }
  )

  const waitMsg = error ? 'An error has occurred' : loading ? 'Loading' : null

  return waitMsg ? (
    <Typography style={{ display: 'block', margin: '10px 20px' }} variant="overline" noWrap>
      {waitMsg}
    </Typography>
  ) : (
    <Grid container item xs={12}>
      {/* Area filter */}
      <AreaFilter title="Extent" />

      {/* Data tags */}
      <TagFilter
        title="Tags"
        results={
          data?.catalogue?.summary.find(obj =>
            Object.entries(obj).find(([key]) => key === 'metadata_json.subjects.subject.raw')
          )['metadata_json.subjects.subject.raw']
        }
      />

      {/* Publisher */}
      <TagFilter
        title="Publisher"
        results={
          data?.catalogue?.summary.find(obj =>
            Object.entries(obj).find(([key]) => key === 'metadata_json.publisher.raw')
          )['metadata_json.publisher.raw']
        }
      />

      {/* Publication year */}
      <TagFilter
        title="Publication Year"
        results={
          data?.catalogue?.summary.find(obj =>
            Object.entries(obj).find(([key]) => key === 'metadata_json.publicationYear')
          )['metadata_json.publicationYear']
        }
      />

      {/* Creators */}
      <TagFilter title="Creators" results={[{ key: 'TODO', doc_count: 0 }]} />

      {/* Contributors */}
      <TagFilter title="Contributors" results={[{ key: 'TODO', doc_count: 0 }]} />

      {/* Owner */}
      <TagFilter title="Owners" results={[{ key: 'TODO', doc_count: 0 }]} />
    </Grid>
  )
})
