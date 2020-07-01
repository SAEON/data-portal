import React, { useState } from 'react'
import { Grid, Divider, Button, Collapse } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import { ReactCatalogue } from '@saeon/catalogue-search'
import QuickForm from '@saeon/quick-form'
import { sub, format } from 'date-fns'
import DateSelector from './date-selector'
import TermSelector from './term-selector'
import TextSelector from './text-selector'
import AreaSelector from './area-selector'
import { ATLAS_API_ADDRESS } from '../../../../../config'
import clsx from 'clsx'
import useStyles from './style'

const DSL_INDEX = `saeon-odp-4-2`
const DSL_PROXY = `${ATLAS_API_ADDRESS}/proxy/saeon-elk`

const maxSlider = 7300
const dateToString = dt => format(dt, 'dd/MM/yyyy')
const getSubtractedDate = days => sub(new Date(), { days: Math.abs(days - maxSlider) })
const getDateStringFromInt = val => dateToString(getSubtractedDate(val))

const Div = () => (
  <Grid item xs={12}>
    <Divider variant="fullWidth" style={{ marginTop: 20, marginBottom: 20 }} />
  </Grid>
)

export default ({ type, data, children }) => {
  const classes = useStyles()
  const [showCurl, setShowCurl] = useState(false)
  const [currentPage, updateCurrentPage] = useState(0)

  return (
    <QuickForm
      fixedDateRange="all"
      textSearch=""
      polygons={[]}
      selectedTerms={[]}
      _dateRange={[maxSlider - 365, maxSlider]}
      dateRange={[getDateStringFromInt(maxSlider - 365), getDateStringFromInt(maxSlider)]}
    >
      {({ updateForm, ...fields }) => {
        const { fixedDateRange, dateRange, textSearch, selectedTerms, polygons } = fields
        const polygon = polygons.length ? polygons[polygons.length - 1] : null
        const coordinates =
          polygon?.flatCoordinates.length > 10
            ? polygon?.simplify(1).getCoordinates()
            : polygon?.getCoordinates()

        return (
          <div style={{ padding: 20 }}>
            <Grid container>
              {/* Text selector */}
              <Grid item xs={12}>
                <TextSelector fields={fields} updateForm={updateForm} />
              </Grid>
              {/* Term selector */}
              <Grid item xs={12}>
                <TermSelector updateForm={updateForm} data={data} />
              </Grid>
              <Div />
              {/* Area Selector */}
              <Grid item xs={12}>
                <AreaSelector updateForm={updateForm} {...fields} />
              </Grid>
              <Div />
              {/* Date range */}
              <DateSelector updateForm={updateForm} {...fields} />
              <Div />

              {/* Toggle cURL */}
              <Button
                onClick={() => setShowCurl(!showCurl)}
                aria-expanded={showCurl}
                aria-label="Show cURL command"
                variant="text"
                size="small"
                fullWidth
                endIcon={
                  <ExpandMoreIcon
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: showCurl,
                    })}
                  />
                }
              >
                Show cURL command
              </Button>

              {/* cURL command */}

              <Collapse in={showCurl} timeout="auto" unmountOnExit>
                TODO
              </Collapse>
              <Div />

              <ReactCatalogue
                dslAddress={DSL_PROXY}
                index={DSL_INDEX}
                source={{
                  includes: ['metadata_json.*'],
                }}
                currentPage={currentPage}
                pageSize={5}
                matchClauses={
                  textSearch || selectedTerms.length
                    ? {
                        query: `${textSearch}, ${selectedTerms.join(',')}`,
                        fields: ['metadata_json.subjects.subject'],
                        fuzziness: 'AUTO',
                      }
                    : undefined
                }
                clauses={
                  fixedDateRange !== 'all'
                    ? [
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
                      ]
                    : undefined
                }
                filter={
                  polygon
                    ? {
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
                    : undefined
                }
              >
                {(useCatalog, catalog) => {
                  if (type === 'GQL') {
                    return children({ query: catalog.getQuery() })
                  } else {
                    const { error, loading, data } = useCatalog()
                    return children({
                      error,
                      loading,
                      data,
                      currentPage,
                      updateCurrentPage,
                    })
                  }
                }}
              </ReactCatalogue>
            </Grid>
          </div>
        )
      }}
    </QuickForm>
  )
}
