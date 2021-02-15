import IconButton from '@material-ui/core/IconButton'
import FilterIcon from '@material-ui/icons/FilterList'

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
