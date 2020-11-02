import { useContext } from 'react'
import { Tooltip, Checkbox } from '@material-ui/core'
import { GlobalContext } from '../../../../../../contexts/global'

export default ({ id }) => {
  const { global, setGlobal } = useContext(GlobalContext)
  const { selectedIds } = global

  return (
    <Tooltip title={'Select record'} placement="left-start">
      <Checkbox
        style={{ marginRight: 4 }}
        size="small"
        color="primary"
        checked={selectedIds.includes(id)}
        onChange={(e, checked) =>
          checked
            ? setGlobal({ selectedIds: [...new Set([...selectedIds, id])] })
            : setGlobal({ selectedIds: selectedIds.filter(selectedId => selectedId !== id) })
        }
      />
    </Tooltip>
  )
}
