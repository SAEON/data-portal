import React, { useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { Grid, AppBar, Toolbar, Paper } from '@material-ui/core'
import { CatalogueSearchField, GqlDataQuery } from '../../components'
import AggregationList from './_aggregation-list'
import ResultsList from './_results-list'
import useStyles from './style'
import clsx from 'clsx'

const AGGREGATION_FIELDS = [
  'metadata_json.publicationYear',
  'metadata_json.publisher.raw',
  'metadata_json.subjects.subject.raw',
]

const getSearchState = () =>
  decodeURIComponent(window.location.search.replace('?search=', ''))
    .split(',')
    .filter(_ => _)

export default ({ themes }) => {
  const classes = useStyles()
  const [subjects, updateSubjects] = useState([])

  useEffect(() => {
    updateSubjects(getSearchState())
  }, [])

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div
        className={clsx({
          [classes.root]: true,
        })}
      >
        {/* Search header */}
        <AppBar position="relative" variant="outlined" style={{ border: 'none' }}>
          <Toolbar className={classes.toolbar}>
            <Grid style={{ alignSelf: 'center' }} container item justify="center" xs={12}>
              <Grid style={{ width: '100%' }} item md={6}>
                <CatalogueSearchField
                  onClick={selectedOptions => {
                    updateSubjects(selectedOptions)
                  }}
                  options={themes}
                  classes={classes}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/* Catalogue */}

        <GqlDataQuery
          query={gql`
            query catalogue($subjects: [String!], $fields: [String!]) {
              catalogue(subjects: $subjects)
              catalogueFieldAggregation(fields: $fields, subjects: $subjects)
            }
          `}
          variables={{ subjects, fields: AGGREGATION_FIELDS }}
        >
          {({ catalogue, catalogueFieldAggregation }) => {
            return (
              <div
                className={clsx({
                  [classes.catalogueContainer]: true,
                })}
              >
                <Grid
                  className={clsx({
                    [classes.grid]: true,
                    [classes.padding]: true,
                  })}
                  container
                  spacing={2}
                >
                  {/* Filters */}
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
                      <AggregationList results={catalogueFieldAggregation} />
                    </div>
                  </Grid>

                  {/* Results */}
                  <Grid
                    className={clsx({
                      [classes.grid]: true,
                    })}
                    item
                    xs={12}
                    md={8}
                  >
                    <Grid
                      container
                      spacing={2}
                      className={clsx({
                        [classes.grid]: true,
                      })}
                    >
                      {/* Results header */}
                      <Grid item xs={12}>
                        <Paper variant="outlined" className={classes.paper}>
                          Sorting, pagination, etc.
                        </Paper>
                      </Grid>

                      {/* Results items */}
                      <Grid
                        className={clsx({
                          [classes.resultsGrid]: true,
                        })}
                        item
                        xs={12}
                      >
                        <div
                          className={clsx({
                            [classes.scrollContainer]: true,
                          })}
                        >
                          <ResultsList results={catalogue} />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            )
          }}
        </GqlDataQuery>
      </div>
    </div>
  )
}
