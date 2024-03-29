import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import { MenuDown as ArrowDropDownIcon } from '../../../../components/icons'

const pageSizes = [
  10, 20, 50, 100, 200,
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
        endIcon={<ArrowDropDownIcon fontSize="small" />}
        size="small"
        onClick={event => {
          setAnchorEl(event.currentTarget)
        }}
        sx={{
          justifyContent: 'center',
          pr: 0,
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
              sx={x === 'ALL' ? { color: 'red' } : {}}
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
