import React from 'react'
import IconButton from '@mui/material/IconButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import FilterIcon from 'mdi-react/FilterOutlineIcon'
import Filters from './_filters'
import CloseIcon from 'mdi-react/CloseIcon'
import { styled } from '@mui/material/styles'

const Drawer = styled('div')(({ theme }) => ({
  width: 400,
  margin: '10px',
  '& .close-button': { color: theme.palette.info.dark },
}))

export default () => {
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

        <Drawer role="presentation">
          <Filters />
        </Drawer>
      </SwipeableDrawer>
    </>
  )
}
