import { createContext, useMemo } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../components/loading'
import InactiveIcon from 'mdi-react/FolderIcon'
import ActiveIcon from 'mdi-react/FolderOpenIcon'
import ListDetails from '../components/list-details'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query {
        lists {
          id
          search
          title
          description
          url
          referrer
          createdBy
          disableSidebar
          showSearchBar
        }
      }
    `,
    { variables: {} }
  )

  const lists = useMemo(() => data?.lists || [], [data])

  const navItems = useMemo(
    () =>
      lists.map(({ title, description, ...props }) => ({
        title,
        description,
        primaryText: title,
        secondaryText: description,
        Icon: ({ active }) => (active ? <ActiveIcon /> : <InactiveIcon />),
        Section: ListDetails,
        ...props,
      })),
    [lists]
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return <context.Provider value={{ navItems }}>{children}</context.Provider>
}
