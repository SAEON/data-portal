import { lazy, Suspense } from 'react'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Delete from './_delete'
import Share from './_share'
import Edit from './_edit'
import useStyles from './style'
import clsx from 'clsx'
import { useTheme } from '@mui/material/styles';

const EChart = lazy(() => import('../../../../../../components/chart-controller'))

export default ({ chart, activeTabIndex, setActiveTabIndex }) => {
  const classes = useStyles()
  const { id, title } = chart
  const theme = useTheme()

  return (
    <>
      <Toolbar disableGutters className={clsx(classes.toolbar)} variant={'dense'}>
        <div style={{ display: 'flex', width: '100%' }}>
          <Typography
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            variant="overline"
          >
            {title || id}
          </Typography>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          <Edit id={id} />
          <span style={{ marginRight: theme.spacing(1) }} />
          <Share id={id} />
          <span style={{ marginRight: theme.spacing(1) }} />
          <Delete id={id} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
        </div>
      </Toolbar>
      <Suspense fallback={null}>
        <div style={{ height: 'calc(100% - 48px)', margin: 0, position: 'relative' }}>
          <EChart style={{ padding: theme.spacing(4) }} id={id} />
        </div>
      </Suspense>
    </>
  )
}
