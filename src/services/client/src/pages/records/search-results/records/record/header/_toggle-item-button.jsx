import { useContext } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Checkbox from '@material-ui/core/Checkbox'
import { context as globalContext } from '../../../../../../contexts/global'

export default ({ id }) => {
  const { global, setGlobal } = useContext(globalContext)
  const { selectedIds, selectAll } = global

  return (
    <Tooltip title={'Select record'} placement="left-start">
      <Checkbox
        style={{ marginRight: 4 }}
        size="small"
        color="primary"
        checked={selectAll || selectedIds.includes(id)}
        indeterminate={selectAll}
        onChange={(e, checked) => {
          if (selectAll) {
            setGlobal({ selectedIds: [...new Set([...selectedIds, id])], selectAll: false })
          } else if (checked) {
            setGlobal({ selectedIds: [...new Set([...selectedIds, id])] })
          } else {
            setGlobal({
              selectedIds: selectedIds.filter(selectedId => selectedId !== id),
            })
          }
        }}
      />
    </Tooltip>
  )
}
