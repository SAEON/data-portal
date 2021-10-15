import { useEffect } from 'react'
import Drawer from '@mui/material/SwipeableDrawer'
import Grid from '@mui/material/Grid'
import CloseIcon from 'mdi-react/CloseIcon'
import IconButton from '@mui/material/IconButton'
import Filters from './filters'

export default ({ showSidebar, data, setShowSidebar }) => {
  useEffect(() => () => setShowSidebar(false), [setShowSidebar])

  return (
    <div style={{ maxWidth: '300px' }}>
      <Drawer
        id="mobile-filters-menu"
        PaperProps={{ style: { maxWidth: '100%' } }}
        anchor="left"
        open={showSidebar}
        onOpen={() => setShowSidebar(true)}
        onClose={() => setShowSidebar(false)}
      >
        <Grid item xs={12}>
          <IconButton
            style={{ marginLeft: 'auto', display: 'flex' }}
            aria-label="Toggle search filters"
            onClick={() => setShowSidebar(false)}
            size="large">
            <CloseIcon />
          </IconButton>

          <Filters catalogue={data?.catalogue} />
        </Grid>
      </Drawer>
    </div>
  );
}
