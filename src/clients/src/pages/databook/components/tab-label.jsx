import { memo } from 'react'
import Tooltip from '@mui/material/Tooltip'
import clsx from 'clsx'
import useStyles from '../style'
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors'

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
