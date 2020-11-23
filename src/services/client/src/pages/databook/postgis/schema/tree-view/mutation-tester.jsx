import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const TEST_MUTATION = gql`
  mutation {
    browserClient {
      databook(id: "5fae7017811a701352474d93") {
        schema {
          tables(id: "testtable") {
            updateTableName(name: "newname")
          }
        }
      }
    }
  }
`
const TEST_QUERY = gql`
  query browserClient {
    databook(id: "5fae7017811a701352474d93") {
      schema {
        tables(id: "testtable") {
          updateTableName(name: "newname")
        }
      }
    }
  }
`

export default props => {
  const [text, setText] = useState('')

  const { loading, error, data } = useQuery(TEST_QUERY)

  if (loading) {
    return <div>loading..</div>
  }
  if (error) {
    console.log('test error', error)
    return <div>ERROR!!!</div>
  }

  console.log('test mutation data', data)
  return <div>mutation tester</div>
}
