import TextField from '@material-ui/core/TextField'
import { fieldProps } from './index'

const MAX = 20

export default ({ numRecords, update }) => (
  <TextField
    {...fieldProps}
    helperText="Records are all created with the same default data specified in the form"
    label="How many records would you like to create"
    value={numRecords}
    InputProps={{
      inputProps: {
        min: 1,
        max: MAX,
      },
    }}
    onChange={({ target: { value } }) => {
      value = value || 1
      update({ numRecords: Math.min(parseInt(value, 10), MAX) })
    }}
    type="number"
  />
)
