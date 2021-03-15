import { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from 'mdi-react/DeleteIcon'
import { useMutation, gql } from '@apollo/client'
import { context as databookContext } from '../../../../../contexts/databook-provider'

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
            dashboards(existingDashboards, { readField }) {
              return existingDashboards.filter(d => id !== readField('id', d))
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
    <Tooltip title="Delete current dashboard" placement="left-start">
      <span>
        <IconButton onClick={() => deleteDashboard({ variables: { id } })} size="small">
          <DeleteIcon size={20} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
