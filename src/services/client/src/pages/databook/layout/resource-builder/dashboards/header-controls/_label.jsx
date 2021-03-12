import { memo } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import clsx from 'clsx'
import useStyles from '../../../../style'
import Avatar from '@material-ui/core/Avatar'

export default memo(({ id, i }) => {
  const classes = useStyles()

  return (
    <Tooltip title={`Dashboard ${id}`}>
      <Avatar className={clsx(classes.smallAvatar, classes.blue)} variant="circular">
        {i + 1}
      </Avatar>
    </Tooltip>
  )
})
