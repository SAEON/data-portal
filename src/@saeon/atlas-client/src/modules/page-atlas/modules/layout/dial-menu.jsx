import React from 'react'
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab'
import { Form } from '../../../../components'
import useStyles from '../../style'

export default ({ children, style, icon, direction }) => {
  const classes = useStyles()
  return (
    <Form active={false}>
      {({ updateForm, active }) => (
        <SpeedDial
          className={classes.menuIcon}
          style={style}
          ariaLabel="Catalogue search menu"
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
