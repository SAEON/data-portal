import { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from 'mdi-react/DeleteIcon'
import { context as databookContext } from '../../../../contexts/databook-provider'
import { useApolloClient, gql } from '@apollo/client'

const CHARTS = gql`
  query($id: ID!) {
    databook(id: $id) {
      id
      charts {
        id
        title
      }
    }
  }
`

export default ({ id, setActiveTabIndex, activeTabIndex }) => {
  const client = useApolloClient()
  const databook = useContext(databookContext)

  //STEVEN: TO-DO: Bug: Deleting a chart doesn't remove it from dashboard.layout.charts.
  //Dashboard then throws error since it cant find the chart(Probably same problem with filters)
  return (
    <Tooltip title="Delete current chart" placement="left-start">
      <span>
        <IconButton
          onClick={async () => {
            await client.mutate({
              mutation: gql`
                mutation($id: ID!) {
                  deleteChart(id: $id)
                }
              `,
              variables: {
                id,
              },
              update: (cache, { data }) => {
                const result = data.deleteChart

                if (!result) {
                  throw new Error('Unable to delete chart')
                }

                const newDatabook = { ...databook }
                newDatabook.charts = [...databook.charts].filter(({ id: existingId }) => {
                  return existingId !== id
                })

                cache.writeQuery({
                  query: CHARTS,
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
