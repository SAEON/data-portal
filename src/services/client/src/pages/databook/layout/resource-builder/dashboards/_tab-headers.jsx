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

const ADD_DASHBOARD = gql`
  mutation($databookId: ID!) {
    createDashboard(databookId: $databookId) {
      id
    }
  }
`

const DASHBOARDS = gql`
  query($databookId: ID!) {
    dashboards(databookId: $databookId) {
      id
    }
  }
`
/**
 * TODO. Perhaps a better option then manually updating the cache is to specify
 * that a query should be rerun. There is a problem here where the active tab index is updated
 * BEFORE the component is re-rendered with the new dashboards
 */
export default ({ dashboards, activeTabIndex, setActiveTabIndex }) => {
  const { id: databookId } = useContext(databookContext)
  const classes = useStyles()
  const [addDashboard, { error, loading }] = useMutation(ADD_DASHBOARD, {
    update: (cache, { data }) => {
      const existingDashboards = cache.read({
        query: DASHBOARDS,
        variables: {
          databookId,
        },
      })

      cache.writeQuery({
        query: DASHBOARDS,
        data: { dashboards: [data.createDashboard, ...existingDashboards.dashboards] },
      })
    },
    onCompleted: () => setActiveTabIndex(dashboards.length),
  })

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