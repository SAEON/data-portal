import React from 'react'
import AggregationList from './filter-tags'
import { gql, useQuery } from '@apollo/client'
import { Grid } from '@material-ui/core'
import useStyles from '../../../style'
import clsx from 'clsx'

const AGGREGATION_FIELDS = [
  'metadata_json.publicationYear',
  'metadata_json.publisher.raw',
  'metadata_json.subjects.subject.raw',
]

export default ({ subjects }) => {
  const classes = useStyles()
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
        fields: AGGREGATION_FIELDS,
        filterBySubjects: subjects || [],
      },
    }
  )
  return (
    <Grid
      className={clsx({
        [classes.grid]: true,
      })}
      item
      xs={12}
      md={4}
    >
      <div
        className={clsx({
          [classes.scrollContainer]: true,
        })}
      >
        <AggregationList loading={loading} error={error} results={data?.catalogue?.summary} />
      </div>
    </Grid>
  )
}
