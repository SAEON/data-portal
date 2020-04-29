import React from 'react'
import { createPortal } from 'react-dom'
import { Grid, Typography, Button } from '@material-ui/core'
import { Visibility as ViewIcon } from '@material-ui/icons'
import { useHttpDataQuery } from '../../../../components'
import { Alert } from '@material-ui/lab'
import { MenuContext } from '@saeon/snap-menus'
import { ReactCatalogue } from '@saeon/catalogue-search'
import useStyles from './style'
import { ATLAS_API_ADDRESS } from '../../../../config'
import SearchControls from './search-controls'
import SearchResults from './search-results'

const DSL_INDEX = `saeon-odp-4-2`
const DSL_PROXY = `${ATLAS_API_ADDRESS}/proxy/saeon-elk`

const searchListMenuId = 'saeon-search-results-menu'

export default () => {
  const classes = useStyles()
  const { error, loading, data } = useHttpDataQuery({
    uri: `${DSL_PROXY}/${DSL_INDEX}`,
    method: 'POST',
    body: {
      aggs: {
        subjects: {
          terms: { field: 'metadata_json.subjects.subject.raw', size: 1000 },
        },
      },
    },
  })

  return loading ? (
    <Typography>Loading ...</Typography>
  ) : error ? (
    <Alert severity="error">Unable to connect to the SAEON catalogue: {error.message}</Alert>
  ) : (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, getMenuById, getActiveMenuZIndex, menus, menuContainerEl }) => (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Seach controls - this will provide a search context */}
            <SearchControls data={data}>
              {({ ...fields }) => {
                // Use the search-context to create a query
                const { fixedDateRange, dateRange, textSearch, selectedTerms, polygons } = fields

                const query = {
                  _source: {
                    includes: ['metadata_json.*'],
                  },
                  query: {
                    bool: {
                      must: [],
                    },
                  },
                }

                const polygon = polygons.length ? polygons[polygons.length - 1] : null

                const coordinates =
                  polygon?.flatCoordinates.length > 10
                    ? polygon?.simplify(1).getCoordinates()
                    : polygon?.getCoordinates()

                // Add extent to query
                if (polygon) {
                  query.query.bool.filter = {
                    geo_shape: {
                      'metadata_json.geoLocations.geoLocationBox': {
                        shape: {
                          type: 'polygon',
                          coordinates,
                        },
                        relation: 'within',
                      },
                    },
                  }
                }

                // Add text search to query
                if (textSearch || selectedTerms.length) {
                  query.query.bool.must = query.query.bool.must.concat([
                    {
                      match: {
                        'metadata_json.subjects.subject': {
                          query: `${textSearch}, ${selectedTerms.join(',')}`,
                          fuzziness: 'AUTO',
                        },
                      },
                    },
                  ])
                }

                // Add date range to query
                if (fixedDateRange !== 'all') {
                  query.query.bool.must = query.query.bool.must.concat([
                    {
                      terms: {
                        'metadata_json.dates.dateType': ['valid', 'Collected'],
                      },
                    },
                    {
                      range: {
                        'metadata_json.dates.date.gte': {
                          gte: dateRange[0].split('/')[2],
                        },
                      },
                    },
                    {
                      range: {
                        'metadata_json.dates.date.lte': {
                          lte: dateRange[1].split('/')[2],
                        },
                      },
                    },
                  ])
                }

                // Pass the query to the catalogue search
                return (
                  <ReactCatalogue dslAddress={DSL_PROXY} index={DSL_INDEX}>
                    {(useCatalog) => {
                      const { error, loading, data } = useCatalog(query)

                      return (
                        <>
                          {/* Render search results if necessary */}
                          {menus
                            ?.filter((menu) => menu.id === searchListMenuId)
                            ?.map((menu) =>
                              createPortal(<menu.Component data={data} />, menuContainerEl)
                            ) || null}

                          {/* Render rest of page */}
                          <Grid item xs={12}>
                            {error ? (
                              <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                  <Alert severity="error">{error.message}</Alert>
                                </Grid>
                              </Grid>
                            ) : (
                              <Grid container spacing={1}>
                                <Grid item style={{ position: 'absolute', bottom: 20, right: 20 }}>
                                  <div style={{ width: '100%' }}>
                                    <Button
                                      variant="text"
                                      disableElevation
                                      color="secondary"
                                      size="small"
                                      className={classes.button}
                                      startIcon={<ViewIcon />}
                                      onClick={() => {
                                        if (getMenuById(searchListMenuId)) {
                                          removeMenu(searchListMenuId)
                                        } else {
                                          addMenu({
                                            id: searchListMenuId,
                                            zIndex: getActiveMenuZIndex(),
                                            norender: true,
                                            Component: ({ data }) => (
                                              <SearchResults
                                                data={data}
                                                id={searchListMenuId}
                                                onClose={() => removeMenu(searchListMenuId)}
                                              />
                                            ),
                                          })
                                        }
                                      }}
                                    >
                                      {loading
                                        ? 'Loading...'
                                        : getMenuById(searchListMenuId)
                                        ? `Hide results (${data?.hits?.total})`
                                        : `Show results (${data?.hits?.total})`}
                                    </Button>
                                  </div>
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                        </>
                      )
                    }}
                  </ReactCatalogue>
                )
              }}
            </SearchControls>
          </Grid>
        </Grid>
      )}
    </MenuContext.Consumer>
  )
}
