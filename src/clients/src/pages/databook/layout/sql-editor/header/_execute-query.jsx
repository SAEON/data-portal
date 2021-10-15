import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PlayIcon from 'mdi-react/PlayArrowIcon'
import clsx from 'clsx'
import useStyles from '../../../style'
import { useTheme } from '@mui/material/styles'

export default ({ onClick }) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Tooltip title="Execute query" placement="left-start">
      <IconButton className={clsx(classes.playButton)} onClick={onClick} size="small">
        <PlayIcon size={20} style={{ color: theme.palette.success.main }} />
      </IconButton>
    </Tooltip>
  )
}
