import { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from 'mdi-react/DeleteIcon'
import { context as databookContext } from '../../../../contexts/databook-provider'
import { useApolloClient, gql } from '@apollo/client'

const FILTERS = gql`
  query($id: ID!) {
    databook(id: $id) {
      id
      filters {
        id
        name
      }
    }
  }
`

export default ({ id, setActiveTabIndex, activeTabIndex }) => {
  const client = useApolloClient()
  const databook = useContext(databookContext)

  return (
    <Tooltip title="Delete current filter" placement="left-start">
      <span>
        <IconButton
          onClick={async () => {
            await client.mutate({
              mutation: gql`
                mutation($id: ID!) {
                  deleteFilter(id: $id)
                }
              `,
              variables: {
                id,
              },
              update: (cache, { data }) => {
                const result = data.deleteFilter

                if (!result) {
                  throw new Error('Unable to delete filter')
                }

                const newDatabook = { ...databook }
                newDatabook.filters = [...databook.filters].filter(({ id: existingId }) => {
                  return existingId !== id
                })

                cache.writeQuery({
                  query: FILTERS,
                  data: { databook: newDatabook },
                })

                if (activeTabIndex) {
                  setActiveTabIndex(activeTabIndex - 1)
                }
              },
            })
          }}
          size="small"
        >
          <DeleteIcon size={20} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
