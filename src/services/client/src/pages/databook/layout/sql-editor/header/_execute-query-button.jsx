import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import PlayIcon from 'mdi-react/PlayArrowIcon'
import clsx from 'clsx'
import useStyles from '../../../style'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ onClick }) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Tooltip title="Execute query" placement="left-start">
      <IconButton className={clsx(classes.playButton)} onClick={onClick} size="small">
        <PlayIcon style={{ color: theme.palette.success.main }} />
      </IconButton>
    </Tooltip>
  )
}
