import { useContext } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { context as databookContext } from '../../../../contexts/databook-provider'
import { gql, useMutation } from '@apollo/client'
import IconButton from '@mui/material/IconButton'
import PlusIcon from 'mdi-react/PlusIcon'
import Fade from '@mui/material/Fade'
import { useTheme } from '@mui/material/styles';

export default ({ setActiveTabIndex }) => {
  const theme = useTheme()
  const { id } = useContext(databookContext)

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
          variables: { id },
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
        size="small"
        style={{ marginLeft: theme.spacing(1) }}
        onClick={() => addDashboard({ variables: { databookId: id, name: 'test' } })}
      >
        <PlusIcon size={14} />
      </IconButton>
    </div>
  )
}
