import { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from 'mdi-react/DeleteIcon'
import { useMutation, gql } from '@apollo/client'
import { context as databookContext } from '../../../../contexts/databook-provider'

export default ({ id, activeTabIndex, setActiveTabIndex }) => {
  const { id: databookId } = useContext(databookContext)
  const [deleteDashboard] = useMutation(
    gql`
      mutation($id: ID!) {
        deleteDashboard(id: $id)
      }
    `,
    {
      update: cache => {
        const query = gql`
          query databook($id: ID!) {
            databook(id: $id) {
              id
              dashboards {
                id
              }
            }
          }
        `

        const staleData = cache.read({
          query,
          variables: {
            id: databookId,
          },
        })

        const dashboards = [...staleData.databook.dashboards].filter(({ id: _id }) => id !== _id)

        cache.writeQuery({
          query,
          data: {
            databook: Object.assign(
              { ...staleData.databook },
              {
                dashboards,
              }
            ),
          },
        })

        if (activeTabIndex) {
          setActiveTabIndex(activeTabIndex - 1)
        }
      },
    }
  )
  return (
    <Tooltip title="Delete current dashboard" placement="left-start">
      <span>
        <IconButton
          onClick={() => {
            deleteDashboard({ variables: { id } })
          }}
          size="small"
        >
          <DeleteIcon size={20} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
