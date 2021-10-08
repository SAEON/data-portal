import TextField from '@material-ui/core/TextField'
import { fieldProps } from './index'

export default ({ numRecords, update }) => (
  <TextField
    {...fieldProps}
    helperText="Records are all created with the same default data specified in the form"
    label="How many records would you like to create"
    value={numRecords}
    InputProps={{
      inputProps: {
        min: 1,
        max: 100,
      },
    }}
    onChange={({ target: { value } }) => update({ numRecords: parseInt(value, 10) })}
    type="number"
  />
)
