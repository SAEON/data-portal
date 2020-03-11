import React from 'react'
import { SpeedDial } from '../components'
import { DragMenu, Form } from '../components'

export const dialItem = ({ icon, tooltip, toggle, title, active, proxy, content }) => ({
  icon,
  tooltip,
  toggle,
  Component: (
    <DragMenu title={title} active={active} close={toggle} proxy={proxy}>
      {content}
    </DragMenu>
  )
})

export const Dial = ({ children, style, icon, ...props }) => (
  <Form dialOpen={false} {...props}>
    {({ updateForm, ...fields }) => (
      <SpeedDial
        style={style}
        onOpen={() => updateForm({ dialOpen: true })}
        onClose={() => updateForm({ dialOpen: false })}
        open={fields.dialOpen}
        icon={icon}
      >
        {[children(updateForm, { ...fields })]}
      </SpeedDial>
    )}
  </Form>
)
