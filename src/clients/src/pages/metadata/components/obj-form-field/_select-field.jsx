import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

export default ({ onChange, value, label, helperText, options }) => (
  <TextField
    fullWidth
    select
    variant="standard"
    margin="dense"
    helperText={helperText}
    label={label}
    value={value}
    onChange={onChange}
  >
    {options.map(val => (
      <MenuItem key={val} value={val}>
        {val}
      </MenuItem>
    ))}
  </TextField>
)
