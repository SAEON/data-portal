import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { fieldProps } from './index'

export default ({ value, update, options }) => {
  return (
    <TextField
      {...fieldProps}
      select
      value={value}
      helperText={'Select a default schema version (constrained by selected schema)'}
      label="Schema version"
      onChange={({ target: { value: schemaVersion } }) => update({ schemaVersion })}
    >
      {options.map(schemaVersion => (
        <MenuItem key={schemaVersion} value={schemaVersion}>
          {schemaVersion}
        </MenuItem>
      ))}
    </TextField>
  )
}
