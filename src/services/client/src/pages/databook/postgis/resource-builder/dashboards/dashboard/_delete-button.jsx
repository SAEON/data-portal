import { useContext } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from 'mdi-react/DeleteIcon'
import { useMutation, gql } from '@apollo/client'
import { context as databookContext } from '../../../../context'

const DASHBOARDS = gql`
  query($databookId: ID!) {
    dashboards(databookId: $databookId) {
      id
    }
  }
`

export default ({ id, setActiveTabIndex }) => {
  const { databook } = useContext(databookContext)
  const [deleteDashboard] = useMutation(
    gql`
      mutation($id: ID!) {
        deleteDashboard(id: $id)
      }
    `,
    {
      update: cache => {
        const { dashboards } = cache.read({
          query: DASHBOARDS,
          variables: {
            databookId: databook.doc._id,
          },
        })

        const remainingDashboards = [...dashboards].filter(({ id: _id }) => id !== _id)

        cache.writeQuery({
          query: DASHBOARDS,
          data: { dashboards: remainingDashboards },
        })

        setActiveTabIndex(remainingDashboards.length - 1)
      },
    }
  )
  return (
    <Tooltip title="Delete current dashboard" placement="left-start">
      <span style={{ zIndex: 99, position: 'absolute', right: 4, bottom: 4 }}>
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
