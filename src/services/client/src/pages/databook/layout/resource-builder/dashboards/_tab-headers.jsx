import { useContext } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import { context as databookContext } from '../../../contexts/databook-provider'
import { gql, useMutation } from '@apollo/client'
import useStyles from '../../../style'
import PlusIcon from 'mdi-react/PlusIcon'
import clsx from 'clsx'

export default ({ dashboards, activeTabIndex, setActiveTabIndex }) => {
  const classes = useStyles()
  const { id: databookId } = useContext(databookContext)

  /**
   * Because a new dashboard is being created, the Apollo
   * cache has to be updated explicilty (or the entire page
   * needs to be refreshed)
   */
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
            id: databookId,
          },
        })

        const dashboards = [...staleData.databook.dashboards, freshData.createDashboard]

        cache.writeQuery({
          query,
          data: {
            databook: Object.assign({ ...staleData.databook }, { dashboards }),
          },
        })
      },
      onCompleted: () => setTimeout(() => setActiveTabIndex(dashboards.length), 100), // TODO fix this hack. TODO fix the flash
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
    <Fade in={!error && !loading} key="data-in">
      <div style={{ display: 'flex' }}>
        <Tabs
          indicatorColor="primary"
          variant={dashboards.length > 5 ? 'scrollable' : 'standard'}
          value={activeTabIndex}
          onChange={(event, newValue) => setActiveTabIndex(newValue)}
        >
          {dashboards.map(({ id }, i) => (
            <Tab
              key={id}
              className={clsx(classes.tab)}
              label={
                <Tooltip title={`Dashboard ${id}`}>
                  <Avatar className={clsx(classes.smallAvatar, classes.blue)} variant="circular">
                    {i + 1}
                  </Avatar>
                </Tooltip>
              }
              id={`tab-${id}`}
            />
          ))}
        </Tabs>

        {/* ADD TAB BUTTON */}
        <div style={{ alignSelf: 'center' }}>
          <IconButton
            onClick={() => {
              addDashboard({ variables: { databookId, name: 'test' } })
            }}
            size="small"
          >
            <PlusIcon size={14} />
          </IconButton>
        </div>
      </div>
    </Fade>
  )
}
