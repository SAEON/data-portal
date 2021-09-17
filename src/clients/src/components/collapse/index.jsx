import { useState } from 'react'
import Collapse from '@material-ui/core/Collapse'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import ExpandIcon from 'mdi-react/ChevronDownIcon'
import CollapseIcon from 'mdi-react/ChevronUpIcon'
import useTheme from '@material-ui/core/styles/useTheme'

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
      style={{ width: '100%', backgroundColor: theme.backgroundColor, ...cardStyle }}
    >
      <CardHeader
        subheader={subheader || ''}
        style={{ cursor: 'pointer' }}
        onClick={() => setCollapsed(!collapsed)}
        avatar={Icon && <Icon />}
        title={title}
        action={[
          ...actions,
          <IconButton key="in-out">
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
