import IconButton from '@mui/material/IconButton'
import FilterIcon from '@mui/icons-material/FilterList'

export default ({ setShowSidebar, showSidebar }) => {
  return (
    <IconButton
      aria-label="Toggle filters"
      aria-controls="mobile-filters-menu"
      aria-haspopup="true"
      aria-expanded={showSidebar}
      sx={{ ml: theme => theme.spacing(1) }}
      onClick={() => setShowSidebar(!showSidebar)}
      color={showSidebar ? 'primary' : 'inherit'}
      size="large"
    >
      <FilterIcon />
    </IconButton>
  )
}
