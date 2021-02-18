import Drawer from '@material-ui/core/SwipeableDrawer'
import Grid from '@material-ui/core/Grid'
import Filters from './filters'

export default ({ showSidebar, data, setShowSidebar }) => {
  return (
    <div style={{ maxWidth: '300px' }}>
      <Drawer
        hideBackdrop
        ModalProps={{ style: { top: 225, zIndex: 1 } }}
        PaperProps={{ style: { maxWidth: '100%', top: 225, boxShadow: 'none' } }}
        anchor="right"
        open={showSidebar}
        onOpen={() => setShowSidebar(true)}
        onClose={() => setShowSidebar(false)}
      >
        <Grid item xs={12}>
          <Filters catalogue={data?.catalogue} />
        </Grid>
      </Drawer>
    </div>
  )
}
