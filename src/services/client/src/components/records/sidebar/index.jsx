import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Grid, Typography, LinearProgress, Fade } from '@material-ui/core'
import { UriStateContext } from '../../../modules/provider-uri-state'
import TagFilter from './items/tag-filter'
import AreaFilter from './items/area-filter'
import ResultContextSummary from './items/result-context-summary'

export default () => {
  const { getUriState } = useContext(UriStateContext)
  const { terms } = getUriState(true)

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

  return error ? (
    <Typography style={{ display: 'block', margin: '10px 20px' }} variant="overline" noWrap>
      Error
    </Typography>
  ) : loading ? (
    <Grid container item xs={12} style={{ position: 'relative' }}>
      <LinearProgress style={{ position: 'absolute', left: 0, right: 0 }} />
    </Grid>
  ) : (
    <Fade in={!loading}>
      <Grid container item xs={12}>
        {/* Result summary */}
        <ResultContextSummary title="Preview Basket" />

        {/* Area filter */}
        <AreaFilter title="Filter by Extent" />

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
      </Grid>
    </Fade>
  )
}
