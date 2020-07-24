import React from 'react'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import QuickForm from '@saeon/quick-form'
import ListboxComponent from './list-box-component'

export default ({ id, options, setOption, selectedOption = [], ...props }) => {
  return (
    <Autocomplete
      fullWidth
      ListboxComponent={ListboxComponent}
      size="small"
      id={id}
      value={selectedOption}
      options={options}
      onChange={(ev, newVal) => setOption(newVal)}
      getOptionLabel={option => `${option}`}
      renderInput={params => (
        <QuickForm inputValue="">
          {({ updateForm, inputValue }) => {
            return (
              <TextField
                {...params}
                id={`${id}-text-input`}
                variant="outlined"
                autoFocus
                size="small"
                onChange={inputValue => updateForm({ inputValue })}
                value={inputValue}
                {...props}
              />
            )
          }}
        </QuickForm>
      )}
    />
  )
}
