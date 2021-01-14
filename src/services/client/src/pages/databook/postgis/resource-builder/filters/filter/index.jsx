import { lazy, Suspense } from 'react'
import { Toolbar, Typography } from '@material-ui/core'
import DeleteButton from './_delete-button'
// import ShareButton from './_share-button'
import Filter from './_filter'
import useStyles from './style'
import clsx from 'clsx'

export default ({ filter, activeTabIndex, setActiveTabIndex }) => {
  const classes = useStyles()
  const { id } = filter
  return (
    <>
      <Toolbar className={clsx(classes.toolbar)} variant={'dense'}>
        <Typography>{id}</Typography>
        <span style={{ marginLeft: 'auto' }} />
        <DeleteButton
          id={id}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
      </Toolbar>
      <Suspense fallback={null}>
        <div style={{ height: 'calc(100% - 48px)', margin: 0, position: 'relative' }}>
          <Filter filter={filter} />
        </div>
      </Suspense>
    </>
  )
}
