import Toolbar from '@mui/material/Toolbar'
import useStyles from '../style'
import { useTheme } from '@mui/material/styles'
import clsx from 'clsx'
import Typography from '@mui/material/Typography'
import RemoveChart from './_remove-chart'

export default ({ id, title, dashboardId }) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Toolbar disableGutters variant="dense" className={clsx(classes.toolbar)}>
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
