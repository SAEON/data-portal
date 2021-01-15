import { useState, useContext } from 'react'
import AutoComplete from '../../../../../../components/autocomplete'
import { Toolbar } from '@material-ui/core'
import useStyles from './style'
import clsx from 'clsx'
import { context as databookContext } from '../../../../context'
export default ({ filter }) => {
  const { id, name, values } = filter
  const classes = useStyles()
  const [selectedValues, setSelectedValues] = useState([])
  const context = useContext(databookContext)
  //STEVEN TO DO: update this to match dashboard autocomplete
  return (
    /* <AutoComplete
        id="sample-filter"
        options={values}
        selectedOptions={selectedValue}
        setOption={newVal => {
          setSelectedValue(newVal)
        }}
        label={name}
      /> */
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
  )
}
