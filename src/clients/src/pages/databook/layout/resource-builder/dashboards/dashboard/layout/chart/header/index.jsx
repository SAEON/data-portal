import Toolbar from '@mui/material/Toolbar'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import RemoveChart from './_remove-chart'

export default ({ id, title, dashboardId }) => {
  const theme = useTheme()

  return (
    <Toolbar
      disableGutters
      variant="dense"
      sx={theme => ({
        backgroundColor: theme.palette.primary.light,
        minHeight: 32,
        color: theme.palette.primary.contrastText,
      })}
    >
      <div style={{ display: 'flex', width: '100%' }}>
        <Typography
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            paddingLeft: theme.spacing(1),
          }}
          variant="overline"
        >
          {title || id}
        </Typography>
        <RemoveChart chartId={id} dashboardId={dashboardId} />
      </div>
    </Toolbar>
  )
}
