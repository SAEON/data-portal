import React from 'react'
import { SpeedDial } from '../../components'
import { Form } from '../../components'
import { Fab } from '@material-ui/core'

export const navItem = ({ icon, tooltip, toggle, Component }) => ({
  icon,
  tooltip,
  toggle,
  Component
})

export const NavigationDial = ({ children, style, icon, ...props }) => (
  <Form dialOpen={false} {...props}>
    {({ updateForm, ...fields }) => (
      <SpeedDial
        style={style}
        onOpen={() => updateForm({ dialOpen: true })}
        onClose={() => updateForm({ dialOpen: false })}
        open={fields.dialOpen}
        icon={icon}
        {...props}
      >
        {children(updateForm, { ...fields })}
      </SpeedDial>
    )}
  </Form>
)
