import React from 'react'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import FilterIcon from 'mdi-react/FilterOutlineIcon'
import Filters from './_filters'
import useStyles from '../style'
import CloseIcon from 'mdi-react/CloseIcon'

export default () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(!open)
        }}
        className={open ? clsx(classes.iconActive) : clsx(classes.icon)}
      >
        <FilterIcon />
      </IconButton>
      <SwipeableDrawer
        variant="persistent"
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        onOpen={() => {
          setOpen(true)
        }}
      >
        <div>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon size={20} className={'close-button'} />
          </IconButton>
        </div>

        <div className={clsx(classes.drawer)} role="presentation">
          <Filters />
        </div>
      </SwipeableDrawer>
    </>
  )
}
