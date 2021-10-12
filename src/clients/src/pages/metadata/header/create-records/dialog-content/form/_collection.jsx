import TextField from '@material-ui/core/TextField'
import { fieldProps } from './index'
import MenuItem from '@material-ui/core/MenuItem'

export default ({ update, collection, collectionOptions, loading }) => {
  if (loading) {
    return (
      <TextField helperText="loading..." label="Loading..." {...fieldProps} value="Loading..." />
    )
  }

  return (
    <TextField
      {...fieldProps}
      select
      value={
        (collectionOptions.find(({ value }) => value === collection?.value) || collectionOptions[0])
          ?.value || ''
      }
      helperText={'Which collection is this record for?'}
      label="Select collection"
      onChange={({ target: { value: label } }) =>
        update({ collection: collectionOptions.find(option => option.label === label) })
      }
    >
      {collectionOptions.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}
