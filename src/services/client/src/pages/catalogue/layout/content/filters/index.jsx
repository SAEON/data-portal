import React from 'react'
import AggregationList from './filter-tags'
import { gql } from '@apollo/client'
import { Grid } from '@material-ui/core'
import { GqlDataQuery } from '../../../../../components'
import useStyles from '../../../style'
import clsx from 'clsx'

const AGGREGATION_FIELDS = [
  'metadata_json.publicationYear',
  'metadata_json.publisher.raw',
  'metadata_json.subjects.subject.raw',
]

export default ({ subjects }) => {
  const classes = useStyles()
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
        <GqlDataQuery
          query={gql`
            query catalogue($filterBySubjects: [String!], $fields: [String!]) {
              catalogue {
                id
                summary(fields: $fields, filterBySubjects: $filterBySubjects)
              }
            }
          `}
          variables={{
            fields: AGGREGATION_FIELDS,
            filterBySubjects: subjects || [],
          }}
        >
          {({ catalogue }) => <AggregationList results={catalogue.summary} />}
        </GqlDataQuery>
      </div>
    </Grid>
  )
}
