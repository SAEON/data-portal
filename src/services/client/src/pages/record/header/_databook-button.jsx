import { useState, useContext } from 'react'
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import { CircularProgress, Fade, Tooltip, IconButton } from '@material-ui/core'
import { useApolloClient, gql } from '@apollo/client'
import packageJson from '../../../../package.json'
import { useHistory } from 'react-router-dom'
import { context as authContext } from '../../../contexts/authentication'

export default ({ immutableResource, id }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const history = useHistory()
  const client = useApolloClient()
  const { userInfo } = useContext(authContext)

  if (error) throw error

  const isShapefile = immutableResource?._fileFormat === 'Shapefile'

  return loading ? (
    <Fade in={loading}>
      <CircularProgress thickness={2} size={18} style={{ margin: '15px 8px' }} />
    </Fade>
  ) : (
    userInfo && (
      <Tooltip title={isShapefile ? 'Analyze dataset' : 'Only shapefiles supported currently'}>
        <span>
          <IconButton
            disabled={!isShapefile}
            color={'primary'}
            onClick={async e => {
              e.stopPropagation()
              setLoading(true)
              const { data } = await client
                .mutate({
                  mutation: gql`
                    mutation($search: JSON!, $createdBy: String!) {
                      createDatabook(search: $search, createdBy: $createdBy)
                    }
                  `,
                  variables: {
                    createdBy: `${packageJson.name} v${packageJson.version}`,
                    search: { ids: [id] },
                  },
                })
                .catch(error => {
                  setError(new Error(`Error creating databook. ${error.message}`))
                })

              if (data) {
                history.push({
                  pathname: window.location.pathname.includes('/render')
                    ? `/render/databooks/${data.createDatabook}`
                    : `/databooks/${data.createDatabook}`,
                })
              } else {
                setError(new Error('Unknown error creating databook'))
              }
            }}
          >
            <DatabookIcon />
          </IconButton>
        </span>
      </Tooltip>
    )
  )
}
