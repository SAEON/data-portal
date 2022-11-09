import Paper from '@mui/material/Paper'
import Fade from '@mui/material/Fade'
import Header from './header'
import Authors from './_authors'
import Descriptions from './_descriptions'
import Titles from './_titles'
import Footer from './footer'
import { alpha } from '@mui/material/styles'
import { Span } from '../../../../../components/html-tags'

export default _source => {
  return (
    <Fade in={true} timeout={(Math.floor(Math.random() * 1.5) + 0.1) * 1000} key={_source.id}>
      <Span>
        <Paper
          sx={theme => ({
            backgroundColor: alpha(theme.palette.common.white, 0.9),
            transitionTimingFunction: theme.transitions.easing.easeInOut,
            transitionProperty: 'all',
            transitionDuration: theme.transitions.duration.standard,
            '&:hover': {
              backgroundColor: theme.palette.common.white,
              boxShadow: theme.shadows[10],
            },
          })}
          variant="outlined"
        >
          {/* <Header {..._source} /> */}
          <Titles {..._source} />
          <Descriptions {..._source} />
          <Footer {..._source} />
        </Paper>
      </Span>
    </Fade>
  )
}
