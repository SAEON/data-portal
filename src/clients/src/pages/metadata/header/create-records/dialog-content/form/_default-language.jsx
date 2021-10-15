import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { fieldProps } from './index'

const options = ['en-US']

export default ({ language, update }) => (
  <TextField
    {...fieldProps}
    select
    value={language || ''}
    helperText={'Select a default locale for new records'}
    label="Language (locale)"
    onChange={({ target: { value: language } }) => update({ language })}
  >
    {options.map(language => (
      <MenuItem key={language} value={language}>
        {language}
      </MenuItem>
    ))}
  </TextField>
)
