import React from 'react'
import clsx from 'clsx'
import { SwipeableDrawer, Button, IconButton } from '@material-ui/core'
import FilterIcon from 'mdi-react/FilterOutlineIcon'
import Filters from './_filters'
import useStyles from '../style'

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(!open)
        }}
        className={clsx(classes.icon)}
        style={{ backgroundColor: open ? 'lightblue' : undefined }}
      >
        <FilterIcon className={clsx(classes.select)} />
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
        {
          <div className={clsx(classes.drawer)} role="presentation">
            <Filters />
          </div>
        }
      </SwipeableDrawer>
    </>
  )
}
