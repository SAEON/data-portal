import { useMemo } from 'react'
import { gql, useQuery } from '@apollo/client'
import TextField from '@material-ui/core/TextField'
import { fieldProps } from './index'
import MenuItem from '@material-ui/core/MenuItem'

export default ({ institution, update, collection, formRef }) => {
  const { error, loading, data } = useQuery(
    gql`
      query ($institution: String!) {
        collections(institution: $institution)
      }
    `,
    {
      variables: {
        institution,
      },
    }
  )

  const collectionOptions = useMemo(
    () => data?.collections.map(({ name, key }) => ({ value: key, label: name })),
    [data]
  )

  if (loading) {
    return (
      <TextField helperText="loading..." label="Loading..." {...fieldProps} value="Loading..." />
    )
  }

  if (error) {
    throw error
  }

  /**
   * Set the default collection option
   * on first render or when the institution
   * changes
   */
  if (!collectionOptions.find(({ value }) => collection?.value === value)) {
    formRef.current.collection = collectionOptions[0]
  }

  return (
    <TextField
      {...fieldProps}
      select
      value={
        (collectionOptions.find(({ value }) => value === collection?.value) || collectionOptions[0])
          .value
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
