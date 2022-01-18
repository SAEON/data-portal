import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import SaveIcon from 'mdi-react/ContentSaveOutlineIcon'
import Icon from '@mui/material/Icon'

export default ({ onClick }) => {
  return (
    <Tooltip
      title="Save SQL (Note this feature is a work in progress. Clicking this will overwrite other users SQL)"
      placement="left-start"
    >
      <span
        style={{
          marginLeft: 'auto',
        }}
      >
        <IconButton onClick={onClick} size="small">
          <Icon
            sx={{ color: theme => theme.palette.warning.main }}
            size={20}
            component={SaveIcon}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}
