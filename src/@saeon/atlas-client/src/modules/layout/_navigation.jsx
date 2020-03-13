import React from 'react'
import { SpeedDial } from '../../components'
import { Form } from '../../components'
import { IconButton } from '@material-ui/core'

export const navItem = ({ icon, tooltip, toggle, Component }) => ({
  icon,
  tooltip,
  toggle,
  Component
})

export const NavigationButton = ({ children, style, icon, open, ...props }) => (
  <Form open={open} {...props}>
    {({ updateForm, ...fields }) => (
      <>
        <IconButton
          color="primary"
          style={Object.assign({ backgroundColor: 'white' }, style)}
          aria-label="toggle menu"
          onClick={() => updateForm({ open: !fields.open })}
        >
          {icon}
        </IconButton>
        {children(updateForm, { ...fields }).map(({ Component }, i) => (
          <div key={i}>{Component}</div>
        ))}
      </>
    )}
  </Form>
)

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
