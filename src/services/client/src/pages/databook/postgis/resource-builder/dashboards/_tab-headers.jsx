import { useContext } from 'react'
import { Tabs, Tab, Avatar, Tooltip, IconButton, CircularProgress, Fade } from '@material-ui/core'
import { context as databookContext } from '../../../context'
import { gql, useMutation } from '@apollo/client'
import useStyles from '../../../style'
import PlusIcon from 'mdi-react/PlusIcon'
import clsx from 'clsx'

const ADD_DASHBOARD = gql`
  mutation($databookId: ID!, $name: String) {
    createDashboard(name: $name, databookId: $databookId) {
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

export default ({ dashboards, activeTabIndex, setActiveTabIndex }) => {
  const { databook } = useContext(databookContext)
  const classes = useStyles()
  const [addDashboard, { error, loading }] = useMutation(ADD_DASHBOARD, {
    update: (cache, { data }) => {
      const existingDashboards = cache.read({
        query: DASHBOARDS,
        variables: {
          databookId: databook.doc._id,
        },
      })

      cache.writeQuery({
        query: DASHBOARDS,
        data: { dashboards: [data.createDashboard, ...existingDashboards.dashboards] },
      })

      setActiveTabIndex(dashboards.length)
    },
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
                  <Avatar className={clsx(classes.smallAvatar, classes.blue)} variant="circle">
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
              addDashboard({ variables: { databookId: databook.doc._id, name: 'test' } })
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
