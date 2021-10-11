import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { fieldProps } from './index'

const map = {
  'Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)':
    'https://creativecommons.org/licenses/by-sa/4.0/',
}

export default ({ rightsList, update, options }) => {
  const rights = rightsList?.[0].rights || ''

  return (
    <TextField
      {...fieldProps}
      select
      value={rights}
      helperText={'Select a default license for new records'}
      label="License"
      onChange={({ target: { value: rights } }) =>
        update({ rightsList: [{ rightsURI: map[rights], rights }] })
      }
    >
      {options.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}
