import { useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import { context as globalContext } from '../../../../../../contexts/global'

export default ({ id }) => {
  const { global, setGlobal } = useContext(globalContext)
  const { selectedIds, selectAll } = global

  const checked = selectAll || selectedIds.includes(id)

  return (
    <Tooltip title={'Select record'} placement="left-start">
      <Checkbox
        style={{ marginRight: 4 }}
        size="small"
        color="primary"
        inputProps={{
          'aria-label': 'Select/unselect search result',
          'aria-checked': checked
        }}
        checked={checked}
        indeterminate={selectAll}
        onChange={(e, checked) => {
          if (selectAll) {
            setGlobal({ selectedIds: [...new Set([...selectedIds, id])], selectAll: false })
          } else if (checked) {
            setGlobal({ selectedIds: [...new Set([...selectedIds, id])] })
          } else {
            setGlobal({
              selectedIds: selectedIds.filter(selectedId => selectedId !== id)
            })
          }
        }}
      />
    </Tooltip>
  )
}
