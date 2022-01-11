import Card from '@mui/material/Card'
import Fade from '@mui/material/Fade'
import Header from './header'
import Authors from './_authors'
import Descriptions from './_descriptions'
import Titles from './_titles'
import FileFormat from './file-format'
import useTheme from '@mui/material/styles/useTheme'

export default _source => {
  const theme = useTheme()

  return (
    <Fade in={true} timeout={(Math.floor(Math.random() * 1.5) + 0.1) * 1000} key={_source.id}>
      <span>
        <Card
          sx={{
            backgroundColor: theme.backgroundColor,
            transitionTimingFunction: theme.transitions.easing.easeInOut,
            transitionProperty: 'all',
            transitionDuration: theme.transitions.duration.standard,
            '&:hover': {
              backgroundColor: theme.palette.common.white,
              boxShadow: theme.boxShadow,
            },
          }}
          variant="outlined"
        >
          <Header {..._source} />
          <Titles {..._source} />
          <Authors {..._source} />
          <Descriptions {..._source} />
          <FileFormat {..._source} />
        </Card>
      </span>
    </Fade>
  )
}
