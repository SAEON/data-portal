import React, { memo } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Grid, Typography } from '@material-ui/core'
import { getStateFromUri } from '../../../modules/uri-state'
import Filter from './filter'

export default memo(({ setCursors }) => {
  const { terms = [] } = getStateFromUri()

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
      {/* Data tags */}
      <Filter
        setCursors={setCursors}
        title="Tags"
        results={
          data?.catalogue?.summary.find(obj =>
            Object.entries(obj).find(([key]) => key === 'metadata_json.subjects.subject.raw')
          )['metadata_json.subjects.subject.raw']
        }
      />

      {/* Publisher */}
      <Filter
        setCursors={setCursors}
        title="Publisher"
        results={
          data?.catalogue?.summary.find(obj =>
            Object.entries(obj).find(([key]) => key === 'metadata_json.publisher.raw')
          )['metadata_json.publisher.raw']
        }
      />

      {/* Publication year */}
      <Filter
        setCursors={setCursors}
        title="Publication Year"
        results={
          data?.catalogue?.summary.find(obj =>
            Object.entries(obj).find(([key]) => key === 'metadata_json.publicationYear')
          )['metadata_json.publicationYear']
        }
      />
    </Grid>
  )
})
