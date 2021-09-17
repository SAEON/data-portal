import { memo } from 'react'
import Table from './_table'

export default memo(({ users }) => {
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <Table users={users} />
    </div>
  )
})
