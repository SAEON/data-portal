import { lazy, Suspense } from 'react'
import Collapse from '../../../components/collapse'
import Loading from '../../../components/loading'
import CardContent from '@mui/material/CardContent'

const Table = lazy(() => import('./_table'))

export default ({ name, description, permissions }) => {
  return (
    <Collapse
      cardSx={{ border: 'none' }}
      title={`${name.toUpperCase()} permissions`}
      subheader={description}
    >
      <CardContent sx={{ position: 'relative' }}>
        <Suspense fallback={<Loading sx={{ bottom: '0' }} />}>
          <Table permissions={permissions} />
        </Suspense>
      </CardContent>
    </Collapse>
  )
}
