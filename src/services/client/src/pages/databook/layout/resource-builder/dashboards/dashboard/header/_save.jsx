import { useState, useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import useTheme from '@material-ui/core/styles/useTheme'
import { context as databookContext } from '../../../../../contexts/databook-provider'
import SaveIcon from 'mdi-react/ContentSaveIcon'
import { useApolloClient, gql } from '@apollo/client'

const DASHBOARDS_QUERY = gql`
  query($databookId: ID!) {
    dashboards(databookId: $databookId) {
      id
      layout
      filters
    }
  }
`

export default ({ gridState, dashboard }) => {
  const theme = useTheme()
  const [loading, setLoading] = useState()
  const client = useApolloClient()
  const { id: databookId } = useContext(databookContext)

  const isSaved = JSON.stringify(gridState) === JSON.stringify(dashboard.layout)

  if (loading) {
    return (
      <Fade in={loading} key={'show-loading'}>
        <div style={{ margin: '4px 8px 0 0' }}>
          <CircularProgress thickness={2} size={16} />
        </div>
      </Fade>
    )
  }
  return (
    <Fade in={!loading} key={'show-button'}>
      <Tooltip title="Save dashboard layout" placement="left-start">
        <span>
          <IconButton
            onClick={async () => {
              setLoading(true)
              await client.mutate({
                mutation: gql`
                  mutation($id: ID!, $layout: JSON) {
                    updateDashboard(id: $id, layout: $layout) {
                      id
                      layout
                    }
                  }
                `,
                variables: {
                  id: dashboard.id,
                  layout: gridState,
                },
                // TODO - can't remember why the data value isn't used. probably should be
                // eslint-disable-next-line
                update: (cache, { data }) => {
                  const { dashboards } = cache.read({
                    query: DASHBOARDS_QUERY,
                    variables: {
                      databookId,
                    },
                  })

                  const updatedDashboards = [
                    ...dashboards.map(d => {
                      return Object.assign(
                        {},
                        { ...d },
                        {
                          layout: gridState, // TODO. for some reason the second time this mutation is called, data.updatedDashboard.layout is stale
                        }
                      )
                    }),
                  ]

                  cache.writeQuery({
                    query: DASHBOARDS_QUERY,
                    data: {
                      dashboards: updatedDashboards,
                    },
                  })
                },
              })
              setLoading(false)
            }}
            size="small"
          >
            <SaveIcon
              style={{ color: isSaved ? theme.palette.success.main : theme.palette.warning.main }}
              size={20}
            />
          </IconButton>
        </span>
      </Tooltip>
    </Fade>
  )
}
