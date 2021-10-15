import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { fieldProps } from './index'

export default ({ value, update, options }) => (
  <TextField
    {...fieldProps}
    select
    value={value}
    helperText={'Which metadata schema suits your needs best?'}
    label="Select metadata schema"
    onChange={({ target: { value: label } }) =>
      update(options.find(option => option.label === label))
    }
  >
    {options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
)
