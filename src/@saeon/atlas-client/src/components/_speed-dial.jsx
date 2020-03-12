import React from 'react'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'

export default ({ onOpen, onClose, open, children, icon, style, direction }) => (
  <>
    <SpeedDial
      style={style}
      ariaLabel="Config speed dial menu"
      icon={<SpeedDialIcon icon={icon || null} />}
      onOpen={onOpen}
      onClose={onClose}
      open={open}
      direction={direction || 'right'}
    >
      {children.map((m, i) => (
        <SpeedDialAction key={i} icon={m.icon} tooltipTitle={m.tooltip} onClick={m.toggle} />
      ))}
    </SpeedDial>
    {children.map(({ Component }, i) => (
      <div key={i}>{Component}</div>
    ))}
  </>
)
