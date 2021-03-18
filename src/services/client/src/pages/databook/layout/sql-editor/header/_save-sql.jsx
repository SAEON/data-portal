import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SaveIcon from 'mdi-react/ContentSaveOutlineIcon'
import clsx from 'clsx'
import useStyles from '../../../style'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ onClick }) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Tooltip
      title="Save SQL (Note this feature is a work in progress. Clicking this will overwrite other users SQL)"
      placement="left-start"
    >
      <span className={clsx(classes.saveButton)}>
        <IconButton onClick={onClick} size="small">
          <SaveIcon style={{ color: theme.palette.warning.main }} size={20} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
