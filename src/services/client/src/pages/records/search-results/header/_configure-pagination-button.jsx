import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

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
        aria-controls="pagination-size-menu"
        aria-expanded={Boolean(anchorEl)}
        aria-haspopup="true"
        aria-label="Change pagination size"
        endIcon={<ArrowDropDownIcon />}
        onClick={event => {
          setAnchorEl(event.currentTarget)
        }}
      >
        {pageSize}
      </Button>
      <Menu
        id="pagination-size-menu"
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
