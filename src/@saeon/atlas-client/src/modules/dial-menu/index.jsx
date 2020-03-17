import React from 'react'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import { Form } from '../../components'

export default ({ children, style, icon, direction }) => (
  <Form active={false}>
    {({ updateForm, active }) => (
      <>
        <SpeedDial
          style={style}
          ariaLabel="Config speed dial menu"
          icon={<SpeedDialIcon icon={icon || null} />}
          onOpen={() => updateForm({ active: true })}
          onClose={() => updateForm({ active: false })}
          open={active}
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
    )}
  </Form>
)
