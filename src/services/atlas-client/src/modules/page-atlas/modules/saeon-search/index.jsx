import React from 'react'
import { Grid, Typography, Button, Fade } from '@material-ui/core'
import { useHttpDataQuery, Form } from '../../../../components'
import { Alert } from '@material-ui/lab'
import useMenu from '@saeon/snap-menus'
import useStyles from './style'
import { ATLAS_API_ADDRESS } from '../../../../config'
import SearchControls from '../../../search-controls'
import ResultsList from './results/_results-list'
import { isMobile } from 'react-device-detect'
import packageJson from '../../../../../package.json'

const DSL_INDEX = `saeon-odp-4-2`
const DSL_PROXY = `${ATLAS_API_ADDRESS}/proxy/saeon-elk`

export default () => {
  const SearchResultsMenu = useMenu('search-results-menu')
  const classes = useStyles()

  // Get terms for dropdown
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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* Seach controls - this will provide a search context */}
        <Form open={false}>
          {({ updateForm, open }) => {
            const toggleSearchResultsMenu = () => updateForm({ open: !open })
            return (
              <SearchControls data={data}>
                {({ error, loading, data, currentPage, updateCurrentPage }) => {
                  return (
                    <>
                      <SearchResultsMenu
                        title={`About ${packageJson.name}`}
                        defaultSnap={isMobile ? 'Top' : 'Right'}
                        open={open}
                        onClose={toggleSearchResultsMenu}
                      >
                        {({ height, width }) =>
                          data?.hits.total ? (
                            <ResultsList
                              height={height}
                              width={width}
                              data={data}
                              currentPage={currentPage}
                              updateCurrentPage={updateCurrentPage}
                            />
                          ) : (
                            <Typography>No results...</Typography>
                          )
                        }
                      </SearchResultsMenu>

                      {/* Render rest of page */}
                      <Grid item xs={12}>
                        {error ? (
                          <Alert severity="error">{error.message}</Alert>
                        ) : (
                          <Fade in={true}>
                            <Button
                              disabled={data?.hits?.total < 1}
                              variant="contained"
                              disableElevation
                              color="secondary"
                              size="small"
                              fullWidth
                              className={classes.button}
                              onClick={toggleSearchResultsMenu}
                            >
                              Show results
                            </Button>
                          </Fade>
                        )}
                      </Grid>
                    </>
                  )
                }}
              </SearchControls>
            )
          }}
        </Form>
      </Grid>
    </Grid>
  )
}
