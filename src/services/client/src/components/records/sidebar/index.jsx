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
      query catalogue($filterByTerms: [String!], $fields: [String!]) {
        catalogue {
          id
          summary(fields: $fields, filterByTerms: $filterByTerms)
        }
      }
    `,
    {
      variables: {
        fields: [
          'publicationYear.raw',
          'publisher.raw',
          'subjects.subject.raw',
          'creators.name.raw',
        ],
        filterByTerms: terms,
      },
    }
  )

  return error ? (
    <Typography style={{ display: 'block', margin: '10px 20px' }} variant="overline" noWrap>
      {JSON.stringify(error)}
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
              Object.entries(obj).find(([key]) => key === 'subjects.subject.raw')
            )['subjects.subject.raw']
          }
        />

        {/* Publisher */}
        <TagFilter
          title="Publisher"
          results={
            data?.catalogue?.summary.find(obj =>
              Object.entries(obj).find(([key]) => key === 'publisher.raw')
            )['publisher.raw']
          }
        />

        {/* Publication year */}
        <TagFilter
          title="Publication Year"
          results={
            data?.catalogue?.summary.find(obj =>
              Object.entries(obj).find(([key]) => key === 'publicationYear.raw')
            )['publicationYear.raw']
          }
        />

        {/* Creators */}
        <TagFilter
          title="Creators"
          results={
            data?.catalogue?.summary.find(obj =>
              Object.entries(obj).find(([key]) => key === 'creators.name.raw')
            )['creators.name.raw']
          }
        />
      </Grid>
    </Fade>
  )
}
