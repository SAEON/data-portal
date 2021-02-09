import { useContext } from 'react'
import { Tooltip, Checkbox } from '@material-ui/core'
import { context as globalContext } from '../../../../contexts/global'

export default ({ style }) => {
  const { global, setGlobal } = useContext(globalContext)
  const { selectedIds, selectAll } = global
  const isIndeterminate = Boolean(selectedIds?.length)

  return (
    <Tooltip title={selectAll || isIndeterminate ? `Unselect all records` : 'Select all records'}>
      <span style={style}>
        <Checkbox
          size="small"
          checked={isIndeterminate || selectAll ? true : false}
          onChange={e => {
            const { checked: selectAll } = e.target
            if (isIndeterminate) {
              setGlobal({ selectedIds: [], selectAll: false })
            } else if (selectAll) {
              setGlobal({ selectAll: true })
            } else {
              setGlobal({ selectAll: false })
            }
          }}
          color="primary"
          indeterminate={isIndeterminate}
        />
      </span>
    </Tooltip>
  )
}
