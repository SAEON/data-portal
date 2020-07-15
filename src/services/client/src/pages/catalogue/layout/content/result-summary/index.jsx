import React from 'react'
import AggregationList from './tag-list'
import { gql, useQuery } from '@apollo/client'
import { Grid, AppBar, Toolbar, Typography } from '@material-ui/core'

export default ({ subjects }) => {
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
        filterBySubjects: subjects || [],
      },
    }
  )

  return (
    <Grid item xs={12} md={4}>
      {/* Data tags */}
      <AppBar color="transparent" style={{ border: 'none' }} position="relative" variant="outlined">
        <Toolbar variant="regular">
          <Typography style={{ margin: 'auto' }} variant="overline" noWrap>
            Related Tags
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: 30 }}>
        <AggregationList
          loading={loading}
          error={error}
          results={
            data?.catalogue?.summary.find(obj =>
              Object.entries(obj).find(([key]) => key === 'metadata_json.subjects.subject.raw')
            )['metadata_json.subjects.subject.raw']
          }
        />
      </div>

      {/* Publication year */}
      <AppBar color="transparent" style={{ border: 'none' }} position="relative" variant="outlined">
        <Toolbar variant="regular">
          <Typography style={{ margin: 'auto' }} variant="overline" noWrap>
            Publication Year
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: 30 }}>
        <AggregationList
          loading={loading}
          error={error}
          results={
            data?.catalogue?.summary.find(obj =>
              Object.entries(obj).find(([key]) => key === 'metadata_json.publicationYear')
            )['metadata_json.publicationYear']
          }
        />
      </div>

      {/* Publisher */}
      <AppBar color="transparent" style={{ border: 'none' }} position="relative" variant="outlined">
        <Toolbar variant="regular">
          <Typography style={{ margin: 'auto' }} variant="overline" noWrap>
            Publisher
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: 30 }}>
        <AggregationList
          loading={loading}
          error={error}
          results={
            data?.catalogue?.summary.find(obj =>
              Object.entries(obj).find(([key]) => key === 'metadata_json.publisher.raw')
            )['metadata_json.publisher.raw']
          }
        />
      </div>
    </Grid>
  )
}
