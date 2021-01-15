import { useContext } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import StopIcon from 'mdi-react/StopIcon'
import clsx from 'clsx'
import useStyles from '../../../style'
import { useTheme } from '@material-ui/core/styles'
import { context as databookContext } from '../../../context'

export default ({ onClick }) => {
  const { loading } = useContext(databookContext)
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Tooltip title="Cancel running query" placement="left-start">
      <span className={clsx(classes.cancelButton)}>
        <IconButton disabled={!loading} onClick={onClick} size="small">
          <StopIcon style={!loading ? {} : { color: theme.palette.error.main }} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
