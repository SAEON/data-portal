import { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from 'mdi-react/DeleteIcon'
import { context as databookContext } from '../../../../contexts/databook-provider'
import { useMutation, gql } from '@apollo/client'

export default ({ id, setActiveTabIndex, activeTabIndex }) => {
  const { id: databookId } = useContext(databookContext)
  const [deleteFilter] = useMutation(
    gql`
      mutation($id: ID!) {
        deleteFilter(id: $id)
      }
    `,
    {
      update: cache => {
        const { databook } = cache.read({
          query: gql`
            query databook($id: ID!) {
              databook(id: $id) {
                id
              }
            }
          `,
          variables: {
            id: databookId,
          },
        })

        cache.modify({
          id: cache.identify(databook),
          fields: {
            filters(existingFilters, { readField }) {
              return existingFilters.filter(f => id !== readField('id', f))
            },
          },
        })

        if (activeTabIndex) {
          setActiveTabIndex(activeTabIndex - 1)
        }
      },
    }
  )

  return (
    <Tooltip title="Delete current filter" placement="left-start">
      <span>
        <IconButton onClick={() => deleteFilter({ variables: { id } })} size="small">
          <DeleteIcon size={20} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
