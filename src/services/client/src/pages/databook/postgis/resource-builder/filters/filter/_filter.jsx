import { useState, useContext } from 'react'
import AutoComplete from '../../../../../../components/autocomplete'
import { Toolbar } from '@material-ui/core'
import useStyles from './style'
import clsx from 'clsx'
import { context as databookContext } from '../../../../context'
export default ({ filter }) => {
  const { id, name, selectedValues } = filter
  const classes = useStyles()
  const [selectedValue, setSelectedValue] = useState('')
  const context = useContext(databookContext)

  console.log('_filter.jsx context', context)
  console.log('_filter', filter)
  return (
    <AutoComplete
      id="region-filter"
      options={selectedValues}
      selectedOptions={selectedValue}
      setOption={newVal => {
        setSelectedValue(newVal)
      }}
      label={name}
    />
  )
}
