import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import QuickForm from '../../packages/quick-form'
import ListboxComponent from './list-box-component'

export default ({
  id,
  options = [], //STEVEN: gave default value. On filter creation was throwing error as component was initializing with options=undefined for some reason, crashing the client
  setOption,
  getOptionSelected = undefined,
  selectedOptions = [],
  limitTags = true,
  multiple = false,
  renderTags = undefined,
  ...props
}) => {
  console.log('option', options)
  return (
    <Autocomplete
      aria-label="Select option"
      // From parent
      id={id}
      value={selectedOptions?.length ? selectedOptions : multiple ? [] : null}
      options={options}
      onChange={(ev, newVal) => {
        const optionIndex = ev.target.dataset.optionIndex
        setOption(newVal, optionIndex)
      }}
      isOptionEqualToValue={getOptionSelected}
      // Internal
      fullWidth
      ListboxComponent={ListboxComponent}
      size="small"
      getOptionLabel={option => `${option}`}
      renderInput={params => (
        <QuickForm inputValue="">
          {(update, { inputValue }) => {
            return (
              <TextField
                autoComplete="off"
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
      //multiple related
      multiple={multiple}
      disableCloseOnSelect={multiple}
      renderTags={renderTags}
      limitTags={limitTags && multiple ? 3 : undefined}
    />
  )
}
