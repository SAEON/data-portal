import { useContext } from 'react'
import { Tabs, Tab, Avatar, Tooltip, IconButton } from '@material-ui/core'
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

export default ({ dashboards, activeTabIndex, setActiveTabIndex }) => {
  const { databook } = useContext(databookContext)
  const classes = useStyles()
  const [addDashboard, { error, loading, data }] = useMutation(ADD_DASHBOARD)

  return (
    <div style={{ display: 'flex' }}>
      <Tabs
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
                <Avatar className={clsx(classes.smallAvatar)} variant="circle">
                  {i + 1}
                </Avatar>
              </Tooltip>
            }
            id={`tab-${id}`}
          />
        ))}
      </Tabs>

      {/* ADD TAB BUTTON */}
      <IconButton
        onClick={() => {
          addDashboard({ variables: { databookId: databook.doc._id, name: 'test' } })
        }}
        size="small"
      >
        <PlusIcon size={14} />
      </IconButton>
    </div>
  )
}