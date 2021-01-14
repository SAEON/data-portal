import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import QuickForm from '@saeon/quick-form'
import ListboxComponent from './list-box-component'

export default ({
  id,
  options = [], //STEVEN: gave default value. On filter creation was throwing error as component was initializing with options=undefined
  setOption,
  getOptionSelected = undefined,
  selectedOptions = [],
  multiple = false,
  ...props
}) => {
  console.log('components/autocomplete/ props', props)
  console.log('components/autocomplete/ options', options)
  console.log('components/autocomplete/ selectedOptions', selectedOptions)

  return (
    <Autocomplete
      // From parent
      id={id}
      value={selectedOptions?.length ? selectedOptions : multiple ? [] : null}
      options={options}
      onChange={(ev, newVal) => setOption(newVal)}
      getOptionSelected={getOptionSelected}
      //multiple related
      multiple={multiple}
      disableCloseOnSelect={multiple}
      // Internal
      fullWidth
      ListboxComponent={ListboxComponent}
      size="small"
      style={{ zIndex: 5000 }}
      getOptionLabel={option => `${option}`}
      renderInput={params => (
        <QuickForm inputValue="">
          {(update, { inputValue }) => {
            return (
              <TextField
                {...params}
                id={`${id}-text-input`}
                autoFocus
                size="small"
                onChange={inputValue => update({ inputValue })}
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
