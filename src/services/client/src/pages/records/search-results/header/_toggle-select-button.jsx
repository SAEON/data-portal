import { useContext } from 'react'
import { Tooltip, Checkbox } from '@material-ui/core'
import { context as globalContext } from '../../../../contexts/global'
import StyledBadge from './components/styled-badge'

export default ({ catalogue }) => {
  const { global, setGlobal } = useContext(globalContext)
  const { selectedIds, selectAll } = global
  const isIndeterminate = Boolean(selectedIds?.length)
  const resultCount = catalogue?.records.totalCount
  const applicableRecordsCount = selectedIds?.length || (selectAll ? resultCount : 0)

  return (
    <Tooltip title={selectAll || isIndeterminate ? `Unselect all records` : 'Select all records'}>
      <span>
        <StyledBadge
          color={applicableRecordsCount ? 'secondary' : 'default'}
          badgeContent={applicableRecordsCount}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          invisible={false}
          top={10}
          right={4}
        >
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
        </StyledBadge>
      </span>
    </Tooltip>
  )
}
