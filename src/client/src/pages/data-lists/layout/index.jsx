import { useContext } from 'react'
import { context as ListsContext } from '../context'
import ContentNav from '../../../components/content-nav'
import Fade from '@material-ui/core/Fade'
import useTheme from '@material-ui/core/styles/useTheme'
import InactiveIcon from 'mdi-react/FolderIcon'
import ActiveIcon from 'mdi-react/FolderOpenIcon'
import ListDetails from './_list-details'

export default () => {
  const theme = useTheme()
  const { lists } = useContext(ListsContext)

  const navItems = lists.map(({ name, description, ...props }) => ({
    name,
    description,
    primaryText: name,
    secondaryText: description,
    Icon: ({ active }) => (active ? <ActiveIcon /> : <InactiveIcon />),
    Section: ListDetails,
    ...props,
  }))

  return (
    <ContentNav navItems={navItems}>
      {({ activeIndex }) =>
        navItems.map(({ Section, primaryText, ...props }, i) => {
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
      }
    </ContentNav>
  )
}
