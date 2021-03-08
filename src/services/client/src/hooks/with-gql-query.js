import { memo } from 'react'
import { useQuery } from '@apollo/client'

export default memo(
  ({ children, QUERY, variables = {}, fetchPolicy = 'network-only' } = {}, ...options) => {
    console.log(
      'This query has bad logic and should not be used. If you see this log, please refactor your component to use the apollo useQuery hook directly'
    )
    const queryResult = useQuery(QUERY, { variables, fetchPolicy, ...options })
    return children(queryResult)
  }
)
