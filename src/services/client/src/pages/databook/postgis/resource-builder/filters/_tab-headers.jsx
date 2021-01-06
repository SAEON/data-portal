import { useContext } from 'react'
import { Tabs, Tab, Avatar, Tooltip, IconButton, CircularProgress, Fade } from '@material-ui/core'
import { context as databookContext } from '../../../context'
import { gql, useMutation } from '@apollo/client'
import useStyles from '../../../style'
import PlusIcon from 'mdi-react/PlusIcon'
import clsx from 'clsx'

const ADD_FILTER = gql`
  mutation($databookId: ID!, $name: String) {
    createFilter(name: $name, databookId: $databookId) {
      id
    }
  }
`

const FILTERS = gql`
  query($databookId: ID!) {
    filters(databookId: $databookId) {
      id
    }
  }
`
/**
 * TODO. Perhaps a better option then manually updating the cache is to specify
 * that a query should be rerun. There is a problem here where the active tab index is updated
 * BEFORE the component is rerendered with the new dashboards
 */
export default ({ activeTabIndex, setActiveTabIndex }) => {
  const { databook, filters } = useContext(databookContext)
  const classes = useStyles()
  const [addFilter, { error, loading }] = useMutation(ADD_FILTER, {
    update: (cache, { data }) => {
      const existingFilters = cache.read({
        query: FILTERS,
        variables: {
          databookId: databook.doc._id,
        },
      })

      cache.writeQuery({
        query: FILTERS,
        data: { filters: [data.createFilter, ...existingFilters.filters] },
      })
    },
    onCompleted: () => setActiveTabIndex(filters.length),
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
          variant={filters.length > 5 ? 'scrollable' : 'standard'}
          value={activeTabIndex}
          onChange={(event, newValue) => setActiveTabIndex(newValue)}
        >
          {filters.map(({ id }, i) => (
            <Tab
              key={id}
              className={clsx(classes.tab)}
              label={
                <Tooltip title={`Filter ${id}`}>
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
              addFilter({ variables: { databookId: databook.doc._id, name: 'test' } })
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
