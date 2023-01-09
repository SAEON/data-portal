import { useContext, useMemo } from 'react'
import { context as ListsContext } from '../context'
import ContentNav from '../../../components/content-nav'
import Fade from '@mui/material/Fade'
import NoItems from '../components/no-items'
import ListItem from '../components/list-item'
import { Folder as InactiveIcon, FolderOpen as ActiveIcon } from '../../../components/icons'
import { Div, Span } from '../../../components/html-tags'
import Container from '@mui/material/Container'

export default () => {
  const { lists } = useContext(ListsContext)

  const navItems = useMemo(
    () =>
      lists.map(({ id, title, description, ...props }) => ({
        id,
        title,
        description,
        primaryText: title,
        secondaryText: description,
        Icon: ({ active }) => (active ? <ActiveIcon color="primary" /> : <InactiveIcon />),
        ...props,
      })),
    [lists]
  )

  if (!navItems.length) {
    return (
      <Fade unmountOnExit mountOnEnter in={true}>
        <Container sx={{ mt: theme => theme.spacing(2) }}>
          <NoItems />
        </Container>
      </Fade>
    )
  }

  return (
    <ContentNav activeIndex={lists.length - 1} navItems={navItems}>
      {({ activeIndex }) => {
        return (
          <Container style={{ minHeight: 1000 }}>
            <Div sx={{ mt: theme => theme.spacing(2) }} />
            {navItems.map(({ id, ...props }, i) => (
              <Fade unmountOnExit mountOnEnter in={activeIndex === i} key={id}>
                <Span sx={{ display: activeIndex === i ? 'inherit' : 'none' }}>
                  <ListItem key={id} id={id} {...props} />
                </Span>
              </Fade>
            ))}
            <Div sx={{ mt: theme => theme.spacing(2) }} />
          </Container>
        )
      }}
    </ContentNav>
  )
}
