import React from 'react'
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab'
import { Form } from '../../components'

export default ({ children, style, icon, direction }) => {
  return (
    <Form active={false}>
      {({ updateForm, active }) => (
        <SpeedDial
          style={style}
          ariaLabel="Config speed dial menu"
          icon={<SpeedDialIcon icon={icon || null} />}
          onOpen={() => updateForm({ active: true })}
          onClose={() => updateForm({ active: false })}
          open={active}
          direction={direction || 'right'}
        >
          {children}
        </SpeedDial>
      )}
    </Form>
  )
}
