import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PlayIcon from 'mdi-react/PlayArrowIcon'
import Icon from '@mui/material/Icon'

export default ({ onClick }) => {
  return (
    <Tooltip title="Execute query" placement="left-start">
      <IconButton
        sx={{
          marginRight: theme => theme.spacing(1),
        }}
        onClick={onClick}
        size="small"
      >
        <Icon component={PlayIcon} size={20} sx={{ color: theme => theme.palette.success.main }} />
      </IconButton>
    </Tooltip>
  )
}
