import { useEffect } from 'react'
import Drawer from '@mui/material/SwipeableDrawer'
import Grid from '@mui/material/Grid'
import CloseIcon from 'mdi-react/CloseIcon'
import IconButton from '@mui/material/IconButton'
import Filters from './filters'
import { Div } from '../../../components/html-tags'

export default ({ showSidebar, data, setShowSidebar }) => {
  useEffect(() => () => setShowSidebar(false), [setShowSidebar])

  return (
    <Div sx={{ maxWidth: '300px' }}>
      <Drawer
        id="mobile-filters-menu"
        PaperProps={{ sx: { maxWidth: '100%' } }}
        anchor="left"
        open={showSidebar}
        onOpen={() => setShowSidebar(true)}
        onClose={() => setShowSidebar(false)}
      >
        <Grid item xs={12}>
          <IconButton
            sx={{ marginLeft: 'auto', display: 'flex' }}
            aria-label="Toggle search filters"
            onClick={() => setShowSidebar(false)}
            size="large"
          >
            <CloseIcon />
          </IconButton>

          <Filters catalogue={data?.catalogue} />
        </Grid>
      </Drawer>
    </Div>
  )
}
