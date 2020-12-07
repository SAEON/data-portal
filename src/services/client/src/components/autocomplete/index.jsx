import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import QuickForm from '@saeon/quick-form'
import ListboxComponent from './list-box-component'

export default ({
  id,
  options,
  setOption,
  getOptionSelected = undefined,
  selectedOptions = [],
  ...props
}) => {
  return (
    <Autocomplete
      // From parent
      id={id}
      value={selectedOptions?.length ? selectedOptions : null}
      options={options}
      onChange={(ev, newVal) => setOption(newVal)}
      getOptionSelected={getOptionSelected}
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
