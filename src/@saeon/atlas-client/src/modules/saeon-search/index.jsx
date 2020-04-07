import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { TextField, Grid, Typography, InputAdornment, Chip, Button } from '@material-ui/core'
import { Form } from '../../components'
import { Search as SearchIcon, Visibility as ViewIcon } from '@material-ui/icons'
import { useHttpDataQuery } from '../../components'
import { Alert, Autocomplete } from '@material-ui/lab'
import { MenuContext } from '../menu-provider'
import SearchResultsMenu from './_search-results-menu'
import { ReactCatalogue } from '@saeon/catalogue-search'
import useStyles from './style'
const DSL_PROXY = `${
  process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'
}/proxy/saeon-elk/_search`

const DSL_INDEX = `saeon-odp-4-2`
const searchListMenuId = 'saeon-search-results-menu'

export default ({ height, width }) => {
  const classes = useStyles()
  const [selectedTerms, setSelectedTerms] = useState([])
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
        <Form textSearch="">
          {({ updateForm, textSearch }) => (
            <Grid container spacing={3}>
              {/* Search controls */}
              <Grid item xs={12}>
                {/* Free search */}
                <TextField
                  size="small"
                  id="catalog-search-free-text"
                  placeholder="e.g. atmospheric, water, etc."
                  label="Text search"
                  autoComplete="off"
                  value={textSearch}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={({ target }) => updateForm({ textSearch: target.value })}
                />

                {/* Tagged, constrained terms */}
                <Autocomplete
                  getOptionSelected={(a, b) => a.key === b.key}
                  onChange={(e, value) => setSelectedTerms(value.map((v) => v.key))}
                  multiple
                  autoHighlight
                  size="small"
                  style={{ width: '100%', marginTop: 10 }}
                  id="catalog-search-tagged-search"
                  options={data.aggregations.subjects.buckets.map(({ key, doc_count }) => ({
                    key: key.trim(),
                    doc_count,
                  }))}
                  getOptionLabel={(option) => option.key}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        size="small"
                        color="secondary"
                        label={option.key}
                        {...getTagProps({ index })}
                        disabled={false}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Term search"
                      variant="outlined"
                      placeholder="start typing..."
                    />
                  )}
                />
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
                          query: `${textSearch}, ${selectedTerms.join(',')}`,
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
                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item>
                            {error ? (
                              <Alert severity="error">{error.message}</Alert>
                            ) : loading ? (
                              <Typography>Loading...</Typography>
                            ) : (
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
                                  Show {data.hits.total} results
                                </Button>
                              </div>
                            )}
                          </Grid>
                        </Grid>
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
