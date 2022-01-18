import { memo } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'

export default memo(({ title, color, children }) => {
  console.log('TODO', color, 'This seems to be unused')
  return (
    <Tooltip title={title}>
      <Avatar
        sx={theme => ({
          width: theme.spacing(2),
          height: theme.spacing(2),
          fontSize: 10,
          backgroundColor: deepOrange[500],
        })}
        variant="circular"
      >
        {children}
      </Avatar>
    </Tooltip>
  )
})
