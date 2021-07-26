import { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from 'mdi-react/TrashCanOutlineIcon'
import { context as databookContext } from '../../../../contexts/databook-provider'
import { useMutation, gql } from '@apollo/client'

export default ({ id, setActiveTabIndex, activeTabIndex }) => {
  const { id: databookId } = useContext(databookContext)
  const [deleteChart] = useMutation(
    gql`
      mutation ($id: ID!) {
        deleteChart(id: $id)
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
            charts(existingCharts, { readField }) {
              return existingCharts.filter(c => id !== readField('id', c))
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
    <Tooltip title="Delete current chart" placement="left-start">
      <span>
        <IconButton onClick={() => deleteChart({ variables: { id } })} size="small">
          <DeleteIcon size={20} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
