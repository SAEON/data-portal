import { useState } from 'react'
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import { CircularProgress, Fade, Tooltip, IconButton } from '@material-ui/core'
import { useApolloClient, gql } from '@apollo/client'
import packageJson from '../../../../package.json'
import { useHistory } from 'react-router-dom'

export default ({ immutableResource, id }) => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const client = useApolloClient()

  const isShapefile = immutableResource?._fileFormat === 'Shapefile'

  return loading ? (
    <Fade in={loading}>
      <CircularProgress thickness={2} size={18} style={{ margin: '15px 8px' }} />
    </Fade>
  ) : (
    <Tooltip title={isShapefile ? 'Analyze dataset' : 'Only shapefiles supported currently'}>
      <span>
        <IconButton
          disabled={!isShapefile}
          color={'primary'}
          onClick={async e => {
            e.stopPropagation()
            setLoading(true)
            const { data } = await client.mutate({
              mutation: gql`
                mutation($state: JSON!, $createdBy: String!) {
                  createDatabook(state: $state, createdBy: $createdBy)
                }
              `,
              variables: {
                createdBy: `${packageJson.name} v${packageJson.version}`,
                state: { ids: [id] },
              },
            })
            if (data) {
              history.push({
                pathname: window.location.pathname.includes('/render')
                  ? `/render/databooks/${data.createDatabook}`
                  : `/databooks/${data.createDatabook}`,
              })
            } else {
              throw new Error('Error creating databook')
            }
          }}
        >
          <DatabookIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
