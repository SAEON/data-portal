import { memo } from 'react'
import { Row } from 'react-data-grid'

export default memo(({ changed, ...props }) => {
  return <Row {...props} className={changed ? 'changed-metadata' : ''} />
})
