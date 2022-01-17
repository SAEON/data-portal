import AddChart from './add-chart'
import Share from './_share'
import DeleteDashboard from './_delete'
import AddFilter from './add-filter'
import Preview from './_preview'
import Save from './save'
import Edit from './edit'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Span = styled('span')(({ theme }) => ({
  marginRight: theme.spacing(1),
}))

export default ({ dashboard, activeTabIndex, setActiveTabIndex, gridState }) => {
  const { id: dashboardId, title } = dashboard

  return (
    <Toolbar
      disableGutters
      sx={theme => ({
        backgroundColor: theme.palette.grey[100],
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
      })}
      variant={'dense'}
    >
      <div style={{ display: 'flex', width: '100%' }}>
        <Typography
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            paddingLeft: theme => theme.spacing(1),
          }}
          variant="overline"
        >
          {title || dashboardId}
        </Typography>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex' }}>
        <Save {...dashboard} gridState={gridState} />
        <Span />
        <Edit {...dashboard} />
        <Span />
        <AddChart {...dashboard} />
        <Span />
        <AddFilter {...dashboard} />
        <Span />
        <Share {...dashboard} />
        <Span />
        <Preview {...dashboard} />
        <Span />
        <DeleteDashboard
          {...dashboard}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
        <Span />
      </div>
    </Toolbar>
  )
}
