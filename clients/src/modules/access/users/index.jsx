import { useContext } from 'react'
import { context as userRolesContext } from '../context'
import Table from './_table'
import { Div } from '../../../components/html-tags'

export default ({ active }) => {
  const { users, selectedUsers, setSelectedUsers, roles } = useContext(userRolesContext)

  if (!active) {
    return null
  }

  return (
    <Div sx={{ width: '100%', height: 1000, position: 'relative' }}>
      <Table
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        roles={roles}
        users={users}
      />
    </Div>
  )
}
