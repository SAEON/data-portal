import { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import StopIcon from 'mdi-react/StopIcon'
import clsx from 'clsx'
import useStyles from '../../../style'
import { useTheme } from '@mui/material/styles'
import { context as dataContext } from '../../../contexts/data-provider'

export default ({ onClick }) => {
  const { loading } = useContext(dataContext)
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Tooltip title="Cancel running query" placement="left-start">
      <span>
        <IconButton disabled={!loading} onClick={onClick} size="small">
          <StopIcon size={20} style={!loading ? {} : { color: theme.palette.error.main }} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
