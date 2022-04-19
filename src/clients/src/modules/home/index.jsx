import { useRef } from 'react'
import SkipLink from '../../components/skip-link'
import Search from './search'
import { alpha } from '@mui/material/styles'
import { Div } from '../../components/html-tags'
import Fade from '@mui/material/Fade'

export default () => {
  const ref = useRef(null)
  return (
    <Fade in={true}>
      <Div>
        <SkipLink href="#home-search" text="Skip to main content" />
        <Search />
        <Div
          ref={el => (ref.current = el)}
          sx={{
            minHeight: '10vh',
            backgroundColor: theme => alpha(theme.palette.common.black, 0.4),
          }}
        ></Div>
      </Div>
    </Fade>
  )
}
