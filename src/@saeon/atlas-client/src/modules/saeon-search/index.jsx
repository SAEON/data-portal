import React from 'react'
import { createPortal } from 'react-dom'
import { Grid, Typography, Button } from '@material-ui/core'
import { Form } from '../../components'
import { Visibility as ViewIcon } from '@material-ui/icons'
import { useHttpDataQuery } from '../../components'
import { Alert } from '@material-ui/lab'
import { MenuContext } from '../menu-provider'
import SearchResultsMenu from './_search-results-menu'
import { ReactCatalogue } from '@saeon/catalogue-search'
import SearchUI from './_search-ui'
import useStyles from './style'
const DSL_PROXY = `${
  process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'
}/proxy/saeon-elk/_search`

const DSL_INDEX = `saeon-odp-4-2`
const searchListMenuId = 'saeon-search-results-menu'

export default () => {
  const classes = useStyles()
  const { error, loading, data } = useHttpDataQuery({
    uri: DSL_PROXY,
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
        <Form textSearch="" selectedTerms={[]}>
          {({ updateForm, ...fields }) => (
            <Grid container spacing={3}>
              {/* Search controls */}
              <Grid item xs={12}>
                <SearchUI data={data} updateForm={updateForm} {...fields} />
              </Grid>

              {/* Search results */}
              <ReactCatalogue dslAddress={DSL_PROXY} index={DSL_INDEX}>
                {(useCatalog) => {
                  const { error, loading, data } = useCatalog({
                    _source: {
                      includes: ['metadata_json.*'],
                    },
                    query: {
                      match: {
                        'metadata_json.subjects.subject': {
                          query: `${fields.textSearch}, ${fields.selectedTerms.join(',')}`,
                          fuzziness: 'AUTO',
                        },
                      },
                    },
                  })

                  return (
                    <>
                      {menus
                        ?.filter((menu) => menu.id === searchListMenuId)
                        ?.map((menu) =>
                          createPortal(<menu.Component data={data} />, menuContainerEl)
                        ) || null}
                      <Grid item xs={12}>
                        {error ? (
                          <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                              <Alert severity="error">{error.message}</Alert>
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid container spacing={1}>
                            <Grid item style={{ position: 'absolute', bottom: 0, right: 0 }}>
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
                                          <SearchResultsMenu
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
            </Grid>
          )}
        </Form>
      )}
    </MenuContext.Consumer>
  )
}
