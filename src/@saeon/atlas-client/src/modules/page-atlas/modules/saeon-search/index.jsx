import React from 'react'
import { createPortal } from 'react-dom'
import { Grid, Typography, Button, Fade } from '@material-ui/core'
import { useHttpDataQuery } from '../../../../components'
import { Alert } from '@material-ui/lab'
import { MenuContext } from '@saeon/snap-menus'
import useStyles from './style'
import { ATLAS_API_ADDRESS } from '../../../../config'
import SearchControls from '../../../search-controls'
import SearchResults from './results'

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
      {({ addMenu, removeMenu, getMenuById, menus, menuContainerEl, container }) => (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Seach controls - this will provide a search context */}
            <SearchControls data={data}>
              {({ error, loading, data, currentPage, updateCurrentPage }) => {
                return (
                  <>
                    {/* Render search results if necessary */}
                    {menus
                      ?.filter(menu => menu.id === searchListMenuId)
                      ?.map(menu =>
                        createPortal(
                          <menu.Component
                            container={container}
                            data={data}
                            currentPage={currentPage}
                            {...menu}
                          />,
                          menuContainerEl
                        )
                      ) || null}

                    {/* Render rest of page */}
                    <Grid item xs={12}>
                      {error ? (
                        <Alert severity="error">{error.message}</Alert>
                      ) : (
                        <Fade in={true}>
                          <Button
                            disabled={getMenuById(searchListMenuId) ? false : data?.hits?.total < 1}
                            variant="contained"
                            disableElevation
                            color="secondary"
                            size="small"
                            fullWidth
                            className={classes.button}
                            onClick={() => {
                              if (getMenuById(searchListMenuId)) {
                                removeMenu(searchListMenuId)
                              } else {
                                addMenu({
                                  id: searchListMenuId,
                                  norender: true,
                                  Component: props => (
                                    <SearchResults
                                      data={props.data}
                                      currentPage={props.currentPage}
                                      updateCurrentPage={updateCurrentPage}
                                      onClose={() => removeMenu(searchListMenuId)}
                                      {...props}
                                    />
                                  ),
                                })
                              }
                            }}
                          >
                            {loading
                              ? 'Show results (...)'
                              : getMenuById(searchListMenuId)
                              ? `Hide results (${data?.hits.total})`
                              : `Show results (${data?.hits.total})`}
                          </Button>
                        </Fade>
                      )}
                    </Grid>
                  </>
                )
              }}
            </SearchControls>
          </Grid>
        </Grid>
      )}
    </MenuContext.Consumer>
  )
}
