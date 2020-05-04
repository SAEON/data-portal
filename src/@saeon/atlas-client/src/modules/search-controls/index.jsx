import React from 'react'
import { Grid, Divider } from '@material-ui/core'
import { ReactCatalogue } from '@saeon/catalogue-search'
import { Form } from '../../components'
import { sub, format } from 'date-fns'
import DateSelector from './date-selector'
import TermSelector from './term-selector'
import TextSelector from './text-selector'
import AreaSelector from './area-selector'
import { ATLAS_API_ADDRESS } from '../../config'

const DSL_INDEX = `saeon-odp-4-2`
const DSL_PROXY = `${ATLAS_API_ADDRESS}/proxy/saeon-elk`

const maxSlider = 7300
const dateToString = (dt) => format(dt, 'dd/MM/yyyy')
const getSubtractedDate = (days) => sub(new Date(), { days: Math.abs(days - maxSlider) })
const getDateStringFromInt = (val) => dateToString(getSubtractedDate(val))

const Div = () => (
  <Grid item xs={12}>
    <Divider variant="fullWidth" style={{ marginTop: 20, marginBottom: 20 }} />
  </Grid>
)

const getQuery = (fields) => {
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

  return query
}

export default ({ data, children }) => {
  return (
    <Form
      fixedDateRange="all"
      textSearch=""
      polygons={[]}
      selectedTerms={[]}
      _dateRange={[maxSlider - 365, maxSlider]}
      dateRange={[getDateStringFromInt(maxSlider - 365), getDateStringFromInt(maxSlider)]}
    >
      {({ updateForm, ...fields }) => (
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

            <ReactCatalogue dslAddress={DSL_PROXY} index={DSL_INDEX}>
              {(useCatalog) => {
                const { error, loading, data } = useCatalog(getQuery(fields))
                return children({ error, loading, data })
              }}
            </ReactCatalogue>
          </Grid>
        </div>
      )}
    </Form>
  )
}
