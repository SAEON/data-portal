import { useContext } from 'react'
import { context as userRolesContext } from '../context'
import Table from './_table'

export default ({ active }) => {
  const { users, roles } = useContext(userRolesContext)

  if (!active) {
    return null
  }

  return (
    <div style={{ width: '100%', height: 1000, position: 'relative' }}>
      <Table roles={roles} users={users} />
    </div>
  )
}
