import { lazy, Suspense } from 'react'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import DeleteButton from './_delete-button'
import ShareButton from './_share-button'
import EditButton from './_edit-button'
import useStyles from './style'
import clsx from 'clsx'

const EChart = lazy(() => import('../../../../../../components/chart-controller'))

export default ({ chart, activeTabIndex, setActiveTabIndex }) => {
  const classes = useStyles()
  const { id } = chart

  return (
    <>
      <Toolbar className={clsx(classes.toolbar)} variant={'dense'}>
        <Typography>{id}</Typography>
        <span style={{ marginLeft: 'auto' }} />
        <EditButton id={id} />
        <span style={{ marginRight: 8 }} />
        <ShareButton id={id} />
        <span style={{ marginRight: 8 }} />
        <DeleteButton
          id={id}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
      </Toolbar>
      <Suspense fallback={null}>
        <div style={{ height: 'calc(100% - 48px)', margin: 0, position: 'relative' }}>
          <EChart style={{ padding: 16 }} id={id} />
        </div>
      </Suspense>
    </>
  )
}
