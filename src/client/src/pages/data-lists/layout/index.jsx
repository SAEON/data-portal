import { useContext, useMemo } from 'react'
import { context as ListsContext } from '../context'
import ContentNav from '../../../components/content-nav'
import Fade from '@material-ui/core/Fade'
import useTheme from '@material-ui/core/styles/useTheme'
import NoItems from '../components/no-items'
import ListItem from '../components/list-item'
import InactiveIcon from 'mdi-react/FolderIcon'
import ActiveIcon from 'mdi-react/FolderOpenIcon'

export default () => {
  const theme = useTheme()
  const { lists } = useContext(ListsContext)

  const navItems = useMemo(
    () =>
      lists.map(({ title, description, ...props }) => ({
        title,
        description,
        primaryText: title,
        secondaryText: description,
        Icon: ({ active }) => (active ? <ActiveIcon /> : <InactiveIcon />),
        ...props,
      })),
    [lists]
  )

  if (!navItems.length) {
    return (
      <Fade unmountOnExit mountOnEnter timeout={theme.transitions.duration.standard} in={true}>
        <span>
          <NoItems />
        </span>
      </Fade>
    )
  }

  return (
    <ContentNav activeIndex={lists.length - 1} navItems={navItems}>
      {({ activeIndex }) => {
        return navItems.map(({ primaryText, ...props }, i) => {
          return (
            <Fade
              unmountOnExit
              mountOnEnter
              timeout={theme.transitions.duration.standard}
              in={activeIndex === i}
              key={primaryText || i}
            >
              <span style={{ display: activeIndex === i ? 'inherit' : 'none' }}>
                <ListItem {...props} />
              </span>
            </Fade>
          )
        })
      }}
    </ContentNav>
  )
}
