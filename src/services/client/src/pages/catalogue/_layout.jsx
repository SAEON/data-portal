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

        <GqlDataQuery
          query={gql`
            query catalogue($subjects: [String!], $fields: [String!]) {
              catalogue(subjects: $subjects)
              catalogueFieldAggregation(fields: $fields, subjects: $subjects)
            }
          `}
          variables={{ subjects, fields: AGGREGATION_FIELDS }}
          fetchPolicy="cache-first"
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
                        <AppBar
                          color="primary"
                          style={{ border: 'none' }}
                          position="relative"
                          variant="outlined"
                        >
                          <Toolbar variant="dense">
                            <Typography variant="overline" noWrap>
                              {catalogue.length} results found
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
                              style={{ marginRight: 5 }}
                              size="small"
                              startIcon={<NavigateBeforeIcon />}
                              onClick={() => alert('todo')}
                              color="inherit"
                            >
                              Previous
                            </Button>
                            <Button
                              variant="text"
                              size="small"
                              endIcon={<NavigateNextIcon />}
                              onClick={() => alert('todo')}
                              color="inherit"
                            >
                              Next
                            </Button>
                          </Toolbar>
                        </AppBar>
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
