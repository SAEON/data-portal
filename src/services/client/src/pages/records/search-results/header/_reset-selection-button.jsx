import { useContext } from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import { Refresh as RefreshIcon } from '@material-ui/icons'
import { context as globalContext } from '../../../../contexts/global'

export default ({ style }) => {
  const { global, setGlobal } = useContext(globalContext)
  const { selectedIds } = global

  return (
    <Tooltip title={`Unselect all datasets`}>
      <span style={style}>
        <IconButton
          disabled={!selectedIds?.length}
          onClick={() => {
            setGlobal({ selectedIds: [] })
          }}
        >
          <RefreshIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
