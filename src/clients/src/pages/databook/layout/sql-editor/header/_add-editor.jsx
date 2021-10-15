import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PlusIcon from 'mdi-react/PlusIcon'
import { useTheme } from '@mui/material/styles';

export default ({ onClick }) => {
  const theme = useTheme()

  return (
    <Tooltip title="Create new SQL editor" placement="right-start">
      <IconButton onClick={onClick} size="small" style={{ marginLeft: theme.spacing(1) }}>
        <PlusIcon size={14} />
      </IconButton>
    </Tooltip>
  )
}
