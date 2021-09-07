import { useContext } from 'react'
import { context as ListsContext } from '../context'
import ContentNav from '../../../components/content-nav'
import Fade from '@material-ui/core/Fade'
import useTheme from '@material-ui/core/styles/useTheme'
import NoLists from '../components/no-lists'

export default () => {
  const theme = useTheme()
  const { navItems } = useContext(ListsContext)

  if (!navItems.length) {
    return (
      <Fade unmountOnExit mountOnEnter timeout={theme.transitions.duration.regular} in={true}>
        <span>
          <NoLists />
        </span>
      </Fade>
    )
  }

  return (
    <ContentNav navItems={navItems}>
      {({ activeIndex }) => {
        return navItems.map(({ Section, primaryText, ...props }, i) => {
          return (
            <Fade
              unmountOnExit
              mountOnEnter
              timeout={theme.transitions.duration.regular}
              in={activeIndex === i}
              key={primaryText || i}
            >
              <span style={{ display: activeIndex === i ? 'inherit' : 'none' }}>
                <Section {...props} />
              </span>
            </Fade>
          )
        })
      }}
    </ContentNav>
  )
}
