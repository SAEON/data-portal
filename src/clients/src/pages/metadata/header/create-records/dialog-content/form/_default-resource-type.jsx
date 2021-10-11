import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { fieldProps } from './index'

const options = ['Dataset']

export default ({ resourceTypeGeneral, update }) => (
  <TextField
    {...fieldProps}
    select
    value={resourceTypeGeneral || ''}
    helperText={'Select a default resource type for new records'}
    label="Resource type (general)"
    onChange={({ target: { value: resourceTypeGeneral } }) =>
      update({ types: { resourceTypeGeneral } })
    }
  >
    {options.map(resourceTypeGeneral => (
      <MenuItem key={resourceTypeGeneral} value={resourceTypeGeneral}>
        {resourceTypeGeneral}
      </MenuItem>
    ))}
  </TextField>
)
