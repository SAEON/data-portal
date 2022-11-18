import { useState } from 'react'
import Collapse from '@mui/material/Collapse'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import { ChevronDown as ExpandIcon, ChevronUp as CollapseIcon } from '../icons'
import { useTheme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export default ({
  children,
  title,
  subheader = undefined,
  Icon = undefined,
  defaultExpanded = false,
  actions = [],
  cardStyle = {},
}) => {
  const theme = useTheme()
  const [collapsed, setCollapsed] = useState(!defaultExpanded)

  return (
    <Card
      variant="outlined"
      style={{
        width: '100%',
        backgroundColor: alpha(theme.palette.common.white, 0.9),
        ...cardStyle,
      }}
    >
      <CardHeader
        subheader={subheader || ''}
        style={{ cursor: 'pointer' }}
        onClick={() => setCollapsed(!collapsed)}
        avatar={Icon && <Icon />}
        title={title}
        action={[
          ...actions,
          <IconButton key="in-out" size="large">
            {collapsed && <ExpandIcon />}
            {!collapsed && <CollapseIcon />}
          </IconButton>,
        ]}
      />

      <Collapse mountOnEnter unmountOnExit in={!collapsed}>
        {typeof children === 'function' ? children(collapsed) : children}
      </Collapse>
    </Card>
  )
}
