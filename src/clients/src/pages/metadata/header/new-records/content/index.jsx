import { useContext, useMemo } from 'react'
import { context as newMetadataFormContext } from '../_context'
import { context as metadataContext } from '../../../context'
import DialogContent from '@material-ui/core/DialogContent'
import QuickForm from '@saeon/quick-form'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import schemaOptions from './_schemas'
import { gql, useQuery } from '@apollo/client'

const fieldProps = {
  fullWidth: true,
  margin: 'normal',
  variant: 'outlined',
}

const SelectCollection = ({ institution, update, collection, formRef }) => {
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

  console.log('data', data)

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

export default () => {
  const { institutions } = useContext(metadataContext)
  const { formRef } = useContext(newMetadataFormContext)

  const institutionOptions = useMemo(
    () => institutions.map(name => ({ label: name, value: name })),
    [institutions]
  )

  return (
    <DialogContent dividers={true}>
      <QuickForm
        effects={[
          form => {
            formRef.current = form
          },
        ]}
        numRecords={1}
        schema={schemaOptions[0]}
        institution={institutionOptions[0]}
        collection={{}}
      >
        {(update, { numRecords, schema, institution, collection }) => {
          return (
            <>
              {/* NUMBER OF RECORDS */}
              <TextField
                {...fieldProps}
                helperText="How many records would you like to create"
                value={numRecords}
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                }}
                onChange={({ target: { value } }) => update({ numRecords: parseInt(value, 10) })}
                type="number"
              />

              {/* SCHEMA */}
              <TextField
                {...fieldProps}
                select
                value={schema.value}
                helperText={'Which metadata schema suits your needs best?'}
                label="Select metadata schema"
                onChange={({ target: { value: label } }) =>
                  update({ schema: schemaOptions.find(option => option.label === label) })
                }
              >
                {schemaOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* INSTITUTION */}
              <TextField
                {...fieldProps}
                select
                value={institution.value}
                helperText={'Which institution is this record for?'}
                label="Select institution"
                onChange={({ target: { value: label } }) =>
                  update({ institution: institutionOptions.find(option => option.label === label) })
                }
              >
                {institutionOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* COLLECTIONS */}
              <SelectCollection
                formRef={formRef}
                institution={institution.value}
                update={update}
                collection={collection}
              />
            </>
          )
        }}
      </QuickForm>
    </DialogContent>
  )
}
