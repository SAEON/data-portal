import React from 'react'
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab'
import QuickForm from '@saeon/quick-form'
import useStyles from '../../style'
import { isMobile, isTablet } from 'react-device-detect'
import clsx from 'clsx'

export default ({ children, style, icon, direction }) => {
  const classes = useStyles()
  return (
    <QuickForm active={false}>
      {({ updateForm, active }) => (
        <SpeedDial
          className={clsx({
            [classes.menuIcon]: true,
          })}
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
    </QuickForm>
  )
}
