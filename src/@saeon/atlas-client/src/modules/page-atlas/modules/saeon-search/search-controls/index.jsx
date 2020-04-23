import React from 'react'
import { Grid, Divider } from '@material-ui/core'
import { Form } from '../../../../../components'
import { sub, format } from 'date-fns'
import DateSelector from './date-selector'
import TermSelector from './term-selector'
import TextSelector from './text-selector'
import AreaSelector from './area-selector'

const maxSlider = 7300
const dateToString = (dt) => format(dt, 'dd/MM/yyyy')
const getSubtractedDate = (days) => sub(new Date(), { days: Math.abs(days - maxSlider) })
const getDateStringFromInt = (val) => dateToString(getSubtractedDate(val))

const Div = () => (
  <Grid item xs={12}>
    <Divider variant="fullWidth" style={{ marginTop: 20, marginBottom: 20 }} />
  </Grid>
)

export default ({ data, children }) => {
  return (
    <Form
      fixedDateRange="all"
      textSearch=""
      extents={[]}
      selectedTerms={[]}
      _dateRange={[maxSlider - 365, maxSlider]}
      dateRange={[getDateStringFromInt(maxSlider - 365), getDateStringFromInt(maxSlider)]}
    >
      {({ updateForm, ...fields }) => (
        <div style={{ padding: 20 }}>
          <Grid container>
            {/* Text selector */}
            <TextSelector fields={fields} updateForm={updateForm} />

            {/* Term selector */}
            <TermSelector updateForm={updateForm} data={data} />

            <Div />

            {/* Area Selector */}
            <AreaSelector updateForm={updateForm} {...fields} />

            <Div />

            {/* Date range */}
            <DateSelector updateForm={updateForm} {...fields} />

            {/* Callback with search definition as arguments */}
            {children({ ...fields })}
          </Grid>
        </div>
      )}
    </Form>
  )
}
