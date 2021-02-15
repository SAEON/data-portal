import { useState } from 'react'
import AutoComplete from '../../../../../../components/autocomplete'

export default ({ filter }) => {
  const { id, name, values } = filter
  const [selectedValues, setSelectedValues] = useState([])

  return (
    <>
      <AutoComplete
        multiple
        id="sample-filter"
        options={values}
        selectedOptions={selectedValues}
        setOption={newValues => {
          setSelectedValues(newValues)
        }}
        label={name}
      />
    </>
  )
}
