import React from 'react'
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab'
import { Form } from '../../../../components'
import useStyles from '../../style'
import { isMobile, isTablet } from 'react-device-detect'

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
          onOpen={() => {
            if (!(isMobile || isTablet)) updateForm({ active: true })
          }}
          onClose={() => updateForm({ active: false })}
          onClick={() => updateForm({ active: isMobile || isTablet ? !active : true })}
          open={active}
          direction={direction || 'right'}
        >
          {children}
        </SpeedDial>
      )}
    </Form>
  )
}
