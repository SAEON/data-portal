import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Autocomplete from '@material-ui/lab/Autocomplete'
import QuickForm from '@saeon/quick-form'
import ListboxComponent from './list-box-component'
import CheckboxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckboxIcon from '@material-ui/icons/CheckBox'

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
      getOptionSelected={getOptionSelected}
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
      renderOption={
        multiple
          ? (option, { selected }) => {
              return (
                <>
                  <Checkbox
                    icon={<CheckboxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckboxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                    color="primary"
                  />
                  {option}
                </>
              )
            }
          : undefined
      }
    />
  )
}
