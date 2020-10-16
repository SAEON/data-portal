import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import QuickForm from '@saeon/quick-form'
import ListboxComponent from './list-box-component'

export default ({ id, options, setOption, selectedOptions = [], ...props }) => {
  return (
    <Autocomplete
      style={{ zIndex: 5000 }}
      fullWidth
      ListboxComponent={ListboxComponent}
      size="small"
      id={id}
      value={selectedOptions}
      options={options}
      onChange={(ev, newVal) => setOption(newVal)}
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
