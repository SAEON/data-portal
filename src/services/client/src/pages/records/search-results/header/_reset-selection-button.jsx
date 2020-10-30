import { useContext } from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import { Refresh as RefreshIcon } from '@material-ui/icons'
import { GlobalContext } from '../../../../contexts/global'

export default () => {
  const { global, setGlobal } = useContext(GlobalContext)
  const { selectedDois } = global

  return (
    <Tooltip title={`Unselect all datasets`}>
      <span style={{ display: 'flex', alignContent: 'center' }}>
        <IconButton
          disabled={!selectedDois?.length}
          onClick={() => {
            setGlobal({ selectedDois: [] })
          }}
        >
          <RefreshIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
