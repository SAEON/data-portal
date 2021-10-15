import React from 'react'
import clsx from 'clsx'
import IconButton from '@mui/material/IconButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
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
        size="small"
        style={{ float: 'right' }}
        onClick={() => {
          setOpen(!open)
        }}
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
          <IconButton onClick={() => setOpen(false)} size="large">
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
