import { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import StopIcon from 'mdi-react/StopIcon'
import { context as dataContext } from '../../../contexts/data-provider'
import Icon from '@mui/material/Icon'

export default ({ onClick }) => {
  const { loading } = useContext(dataContext)

  return (
    <Tooltip title="Cancel running query" placement="left-start">
      <span>
        <IconButton disabled={!loading} onClick={onClick} size="small">
          <Icon
            component={StopIcon}
            size={20}
            sx={!loading ? {} : { color: theme => theme.palette.error.main }}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}
