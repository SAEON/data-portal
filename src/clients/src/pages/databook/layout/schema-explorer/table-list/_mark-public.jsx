import { useContext } from 'react'
import { context as DatabookContext } from '../../../contexts/databook-provider'
import { Item } from 'react-contexify'
import { gql, useMutation } from '@apollo/client'

export default ({ onClick, value, disabled, tableName }) => {
  const { id: databookId } = useContext(DatabookContext)

  const [markSchemaObjectPublic] = useMutation(
    gql`
      mutation ($databookId: ID!, $object: String!) {
        databook(id: $databookId) {
          markSchemaObjectPublic(object: $object)
        }
      }
    `,
    {
      onCompleted: () => {
        onClick()
      },
    }
  )

  return (
    <Item
      onClick={() => {
        markSchemaObjectPublic({
          variables: {
            databookId,
            object: tableName,
          },
        })
      }}
      disabled={disabled}
    >
      {value}
    </Item>
  )
}
