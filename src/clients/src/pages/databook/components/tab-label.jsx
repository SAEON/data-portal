import { memo } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import clsx from 'clsx'
import useStyles from '../style'
import Avatar from '@material-ui/core/Avatar'
import useTheme from '@material-ui/core/styles/useTheme'
import { deepOrange } from '@material-ui/core/colors'

export default memo(({ title, color, children }) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Tooltip title={title}>
      <Avatar
        style={{
          width: theme.spacing(2),
          height: theme.spacing(2),
          fontSize: 10,
          backgroundColor: deepOrange[500],
        }}
        className={clsx(classes[color])}
        variant="circular"
      >
        {children}
      </Avatar>
    </Tooltip>
  )
})
