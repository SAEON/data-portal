import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

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
