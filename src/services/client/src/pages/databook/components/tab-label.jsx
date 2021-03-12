import { memo } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import clsx from 'clsx'
import useStyles from '../style'
import Avatar from '@material-ui/core/Avatar'

export default memo(
  ({ title, color, children }) => {
    const classes = useStyles()

    return (
      <Tooltip title={title}>
        <Avatar
          className={clsx(classes.smallAvatar, { [classes[color]]: Boolean(color) })}
          variant="circular"
        >
          {children}
        </Avatar>
      </Tooltip>
    )
  },
  () => true
)
