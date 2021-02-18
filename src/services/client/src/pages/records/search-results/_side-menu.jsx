import { useEffect } from 'react'
import Drawer from '@material-ui/core/SwipeableDrawer'
import Grid from '@material-ui/core/Grid'
import CloseIcon from 'mdi-react/CloseIcon'
import IconButton from '@material-ui/core/IconButton'
import Filters from './filters'

export default ({ showSidebar, data, setShowSidebar }) => {
  useEffect(() => () => setShowSidebar(false), [setShowSidebar])

  return (
    <div style={{ maxWidth: '300px' }}>
      <Drawer
        PaperProps={{ style: { maxWidth: '100%' } }}
        anchor="right"
        open={showSidebar}
        onOpen={() => setShowSidebar(true)}
        onClose={() => setShowSidebar(false)}
      >
        <Grid item xs={12}>
          <IconButton onClick={() => setShowSidebar(false)}>
            <CloseIcon />
          </IconButton>

          <Filters catalogue={data?.catalogue} />
        </Grid>
      </Drawer>
    </div>
  )
}
