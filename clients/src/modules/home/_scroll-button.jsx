import { useEffect, useState } from 'react'
import debounce from '../../lib/fns/debounce'
import { ScrollButton } from '../../components/fancy-buttons'
import Fade from '@mui/material/Fade'

export default ({ contentRef }) => {
  const [pageScrolled, setPageScrolled] = useState(false)

  const onScroll = debounce(() => {
    const _pageScrolled = window.scrollY > 0
    if (pageScrolled != _pageScrolled) {
      setPageScrolled(_pageScrolled)
    }
  })

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  return (
    <Fade timeout={500} key="scroll-button" in={!pageScrolled}>
      <ScrollButton
        onClick={() =>
          window.scrollTo({ top: contentRef.current.offsetTop, left: 0, behavior: 'smooth' })
        }
        sx={{ bottom: theme => theme.spacing(6), position: 'absolute', zIndex: 9 }}
      />
    </Fade>
  )
}
