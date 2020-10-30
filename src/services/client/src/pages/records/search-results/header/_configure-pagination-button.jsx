import { useState } from 'react'
import { Button, Menu, MenuItem, Tooltip } from '@material-ui/core'
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'

const pageSizes = [
  10,
  20,
  50,
  100,
  200,
  // 'ALL'
]

export default ({ pageSize, setPageSize }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <>
      <Button
        variant="text"
        disableElevation
        aria-controls="simple-menu"
        aria-haspopup="true"
        endIcon={<ArrowDropDownIcon />}
        onClick={event => {
          setAnchorEl(event.currentTarget)
        }}
      >
        {pageSize}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted={false}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null)
        }}
      >
        {pageSizes.map(x => (
          <Tooltip key={x} title={x === 'ALL' ? 'Warning - this can be slow' : ''}>
            <MenuItem
              style={x === 'ALL' ? { color: 'red' } : {}}
              onClick={() => {
                setPageSize(x === 'ALL' ? 10000 : x)
                setAnchorEl(null)
              }}
            >
              {x}
            </MenuItem>
          </Tooltip>
        ))}
      </Menu>
    </>
  )
}
