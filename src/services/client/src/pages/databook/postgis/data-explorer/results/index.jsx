import { Toolbar, IconButton } from '@material-ui/core'
import VirtualTable from '../../../../../components/virtual-table'
import AddItemIcon from 'mdi-react/ViewGridAddIcon'
import clsx from 'clsx'
import useStyles from './style'
import { useTheme } from '@material-ui/core/styles'

export default ({ data }) => {
  const theme = useTheme()
  const classes = useStyles()
  return (
    <>
      <Toolbar variant="dense" className={clsx(classes.toolbar)}>
        <IconButton style={{ color: theme.palette.primary.light }} size="small">
          <AddItemIcon />
        </IconButton>
      </Toolbar>
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
