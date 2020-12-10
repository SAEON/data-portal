import { useState, useContext } from 'react'
import { CircularProgress, Fade, IconButton, Tooltip } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { context as databookContext } from '../../../../context'
import SaveIcon from 'mdi-react/ContentSaveIcon'
import { useApolloClient, gql } from '@apollo/client'

const DASHBOARDS_QUERY = gql`
  query($databookId: ID!) {
    dashboards(databookId: $databookId) {
      id
      charts {
        id
      }
    }
  }
`

export default ({ gridState, dashboard }) => {
  const theme = useTheme()
  const [loading, setLoading] = useState()
  const client = useApolloClient()
  const { databook } = useContext(databookContext)
  const { _id: databookId } = databook.doc

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
                update: (cache, { data }) => {
                  const { dashboards } = cache.read({
                    query: DASHBOARDS_QUERY,
                    variables: {
                      databookId,
                    },
                  })
                  cache.writeQuery({
                    query: DASHBOARDS_QUERY,
                    data: {
                      dashboards: [
                        ...dashboards.map(d => {
                          return Object.assign(
                            {},
                            { ...d },
                            {
                              layout: data.updateDashboard.layout,
                            }
                          )
                        }),
                      ],
                    },
                  })
                },
              })
              await new Promise(res => setTimeout(res, 2000))
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
