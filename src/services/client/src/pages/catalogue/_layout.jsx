import React, { useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { Grid, AppBar, Toolbar, InputBase, Typography, Button } from '@material-ui/core'
import {
  Search as SearchIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from '@material-ui/icons'
import { CatalogueSearchField, GqlDataQuery } from '../../components'
import AggregationList from './_aggregation-list'
import ResultsList from './_results-list'
import useStyles from './style'
import clsx from 'clsx'

const PAGE_SIZE = 50

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
  const [subjects, updateSubjects] = useState(getSearchState())

  useEffect(() => {
    updateSubjects(getSearchState())
  }, [])

  return <Layout themes={themes} subjects={subjects} updateSubjects={updateSubjects} />
}

const Layout = ({ themes, subjects, updateSubjects }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const classes = useStyles()

  useEffect(() => {
    const newSubjects = getSearchState()
    if (newSubjects.length !== subjects.length) {
      updateSubjects(getSearchState())
    }
  })

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
                  onChange={selectedOptions => updateSubjects(selectedOptions)}
                  options={themes}
                  classes={classes}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/* Catalogue */}

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

            {/* Results */}

            <Grid
              className={clsx({
                [classes.grid]: true,
              })}
              item
              xs={12}
              md={8}
            >
              <GqlDataQuery
                query={gql`
                  query catalogue($subjects: [String!]) {
                    catalogue {
                      id
                      records(subjects: $subjects) {
                        totalCount
                        ... on CatalogueRecordConnection {
                          nodes {
                            ... on CatalogueRecord {
                              target
                            }
                          }
                        }
                      }
                    }
                  }
                `}
                variables={{
                  subjects: subjects || [],
                }}
              >
                {({ catalogue }) => {
                  return (
                    <Grid
                      container
                      spacing={2}
                      className={clsx({
                        [classes.grid]: true,
                      })}
                    >
                      <Grid item xs={12}>
                        <AppBar
                          color="primary"
                          style={{ border: 'none' }}
                          position="relative"
                          variant="outlined"
                        >
                          <Toolbar variant="dense">
                            <Typography variant="overline" noWrap>
                              {catalogue.records.totalCount} results found ({' '}
                              {currentPage * PAGE_SIZE + 1} to{' '}
                              {Math.min(
                                currentPage * PAGE_SIZE + PAGE_SIZE,
                                catalogue.records.totalCount
                              )}
                              )
                            </Typography>
                            <div className={classes.search}>
                              <div className={classes.searchIcon}>
                                <SearchIcon />
                              </div>
                              <InputBase
                                placeholder="Filter results..."
                                classes={{
                                  root: classes.inputRoot,
                                  input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                              />
                            </div>

                            <div className={classes.grow} />
                            <Button
                              variant="text"
                              disabled={currentPage === 0}
                              style={{ marginRight: 5 }}
                              size="small"
                              startIcon={<NavigateBeforeIcon />}
                              onClick={() => setCurrentPage(currentPage - 1)}
                              color="inherit"
                            >
                              Previous
                            </Button>
                            <Button
                              variant="text"
                              size="small"
                              disabled={
                                catalogue.records.totalCount - currentPage * PAGE_SIZE <= PAGE_SIZE
                              }
                              endIcon={<NavigateNextIcon />}
                              onClick={() => setCurrentPage(currentPage + 1)}
                              color="inherit"
                            >
                              Next
                            </Button>
                          </Toolbar>
                        </AppBar>
                      </Grid>

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
                          <ResultsList
                            results={catalogue.records.nodes.slice(
                              currentPage * PAGE_SIZE,
                              currentPage * PAGE_SIZE + PAGE_SIZE
                            )}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  )
                }}
              </GqlDataQuery>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}
