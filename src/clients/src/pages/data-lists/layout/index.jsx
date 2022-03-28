import { useContext, useMemo, useState, useEffect } from 'react'
import { context as ListsContext } from '../context'
import ContentNav from '../../../components/content-nav'
import Fade from '@mui/material/Fade'
import { useTheme } from '@mui/material/styles'
import NoItems from '../components/no-items'
import ListItem from '../components/list-item'
import InactiveIcon from 'mdi-react/FolderIcon'
import ActiveIcon from 'mdi-react/FolderOpenIcon'

export default () => {
  const [renderCount, setRenderCount] = useState(0)
  const theme = useTheme()
  const { lists } = useContext(ListsContext)

  const navItems = useMemo(
    () =>
      lists.map(({ id, title, description, ...props }) => ({
        id,
        title,
        description,
        primaryText: title,
        secondaryText: description,
        Icon: ({ active }) => (active ? <ActiveIcon /> : <InactiveIcon />),
        ...props
      })),
    [lists]
  )

  useEffect(() => {
    setRenderCount(c => c + 1)
  }, [navItems])

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
    <ContentNav activeIndex={renderCount === 1 ? 0 : lists.length - 1} navItems={navItems}>
      {({ activeIndex }) => {
        return navItems.map(({ id, ...props }, i) => (
          <Fade
            unmountOnExit
            mountOnEnter
            timeout={theme.transitions.duration.standard}
            in={activeIndex === i}
            key={id}
          >
            <span style={{ display: activeIndex === i ? 'inherit' : 'none' }}>
              <ListItem key={id} id={id} {...props} />
            </span>
          </Fade>
        ))
      }}
    </ContentNav>
  )
}
