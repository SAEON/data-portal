import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import PlusIcon from 'mdi-react/PlusIcon'
import useTheme from '@material-ui/core/styles/useTheme'

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
