import { Toolbar } from '@material-ui/core'
import VirtualTable from '../../../../../components/virtual-table'
import clsx from 'clsx'
import useStyles from './style'

export default ({ data }) => {
  const classes = useStyles()
  return (
    <>
      <Toolbar variant="dense" className={clsx(classes.toolbar)} />
      <div style={{ position: 'relative', height: 'calc(100% - 48px)' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <VirtualTable data={data} />
        </div>
      </div>
    </>
  )
}
