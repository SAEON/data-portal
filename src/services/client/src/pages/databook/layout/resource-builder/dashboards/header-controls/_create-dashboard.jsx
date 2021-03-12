import CircularProgress from '@material-ui/core/CircularProgress'
import { gql, useMutation } from '@apollo/client'
import IconButton from '@material-ui/core/IconButton'
import PlusIcon from 'mdi-react/PlusIcon'
import Fade from '@material-ui/core/Fade'

export default ({ id, setActiveTabIndex }) => {
  const [addDashboard, { error, loading }] = useMutation(
    gql`
      mutation createDashboard($databookId: ID!) {
        createDashboard(databookId: $databookId) {
          id
        }
      }
    `,
    {
      update: (cache, { data: freshData }) => {
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
            id: id,
          },
        })

        const dashboards = [...staleData.databook.dashboards, freshData.createDashboard]

        cache.writeQuery({
          query,
          data: {
            databook: Object.assign({ ...staleData.databook }, { dashboards }),
          },
        })

        /**
         * Set timeout prevents the activeTabIndex from being
         * set before the new dashboards state is updated
         *
         * It's a bit of a hack, but actually gives a nice
         * UI effect
         */
        setTimeout(() => setActiveTabIndex(dashboards.length - 1), 100)
      },
    }
  )

  if (error) {
    throw error
  }

  if (loading) {
    return (
      <Fade in={loading} key={'loading-in'}>
        <div style={{ display: 'flex', paddingLeft: 16 }}>
          <CircularProgress thickness={2} size={18} />
        </div>
      </Fade>
    )
  }

  return (
    <div style={{ alignSelf: 'center' }}>
      <IconButton
        onClick={() => {
          addDashboard({ variables: { databookId: id, name: 'test' } })
        }}
        size="small"
      >
        <PlusIcon size={14} />
      </IconButton>
    </div>
  )
}
