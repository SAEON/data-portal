import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { fieldProps } from './index'

export default ({ institutionOptions, update, institution }) => (
  <TextField
    {...fieldProps}
    select
    value={institution.value}
    helperText={'Which institution is this record for?'}
    label="Select institution"
    onChange={({ target: { value: label } }) =>
      update({ institution: institutionOptions.find(option => option.label === label) })
    }
  >
    {institutionOptions.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
)
