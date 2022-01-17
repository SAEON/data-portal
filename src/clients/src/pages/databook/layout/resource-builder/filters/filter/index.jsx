import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Delete from './_delete'
import Filter from './_filter'

export default ({ filter, activeTabIndex, setActiveTabIndex }) => {
  const { id, name } = filter

  return (
    <>
      {/* Header */}
      <Toolbar
        disableGutters
        sx={theme => ({
          backgroundColor: theme.palette.grey[100],
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        })}
        variant={'dense'}
      >
        <div style={{ display: 'flex', width: '100%' }}>
          <Typography
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            variant="overline"
          >
            {name || id}
          </Typography>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          <Delete id={id} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
        </div>
      </Toolbar>

      {/* Filter */}
      <div style={{ height: 'calc(100% - 48px)', margin: 0, position: 'relative' }}>
        <Filter filter={filter} />
      </div>
    </>
  )
}
