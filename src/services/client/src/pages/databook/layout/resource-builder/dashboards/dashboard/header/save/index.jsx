import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import useTheme from '@material-ui/core/styles/useTheme'
import SaveIcon from 'mdi-react/ContentSaveIcon'
import { useMutation, gql } from '@apollo/client'

export default ({ gridState, id: dashboardId, layout }) => {
  const theme = useTheme()
  const isSaved = JSON.stringify(gridState) === JSON.stringify(layout)

  const [saveLayout, { error, loading }] = useMutation(
    gql`
      mutation($id: ID!, $layout: JSON) {
        updateDashboard(id: $id, layout: $layout) {
          id
          layout
        }
      }
    `
  )

  if (loading) {
    return (
      <Fade in={loading} key={'show-loading'}>
        <div style={{ margin: '4px 8px 0 0' }}>
          <CircularProgress thickness={2} size={16} />
        </div>
      </Fade>
    )
  }

  if (error) {
    throw error
  }

  return (
    <Fade in={!loading} key={'show-button'}>
      <Tooltip title="Save dashboard layout" placement="left-start">
        <span>
          <IconButton
            onClick={() =>
              saveLayout({
                variables: {
                  id: dashboardId,
                  layout: gridState,
                },
              })
            }
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
