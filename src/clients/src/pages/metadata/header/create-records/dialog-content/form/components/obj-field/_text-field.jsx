import TextField from '@material-ui/core/TextField'

export default ({ onChange, value, label, helperText }) => {
  return (
    <TextField
      fullWidth
      variant="standard"
      margin="dense"
      helperText={helperText}
      label={label}
      value={value}
      onChange={onChange}
    />
  )
}
