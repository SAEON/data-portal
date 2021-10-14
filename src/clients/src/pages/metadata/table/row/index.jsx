import { memo } from 'react'
import { Row } from 'react-data-grid'

export default memo(props => {
  const changed = Boolean(props.row._changed)
  return <Row {...props} className={changed ? 'changed-metadata' : ''} />
})
