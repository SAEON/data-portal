import { IconButton } from '@material-ui/core'
import { FilterList as FilterIcon } from '@material-ui/icons'

export default ({ setShowSidebar, showSidebar }) => {
  return (
    <IconButton
      style={{ marginLeft: 5 }}
      onClick={() => setShowSidebar(!showSidebar)}
      color={showSidebar ? 'primary' : 'inherit'}
    >
      <FilterIcon />
    </IconButton>
  )
}
