import { useState, useContext } from 'react'
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import { CircularProgress, Fade, Tooltip, IconButton } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { useApolloClient, gql } from '@apollo/client'
import packageJson from '../../../../package.json'
import { useHistory } from 'react-router-dom'
import { context as authorizationContext } from '../../../contexts/authorization'
import { CATALOGUE_TECHNICAL_CONTACT } from '../../../config'

export default ({ immutableResource, id }) => {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const history = useHistory()
  const client = useApolloClient()
  const { isAuthenticated, isDataScientist } = useContext(authorizationContext)

  if (!isAuthenticated) {
    return null
  }

  if (error) throw error

  const isAllowed = ['Shapefile', 'NetCDF'].includes(immutableResource?._fileFormat)

  return loading ? (
    <Fade in={loading}>
      <CircularProgress thickness={2} size={18} style={{ margin: '15px 8px' }} />
    </Fade>
  ) : (
    <Tooltip title={isAllowed ? 'Analyze dataset' : 'Only shapefiles supported currently'}>
      <span>
        <IconButton
          disabled={!isAllowed}
          style={
            isAllowed
              ? { color: isDataScientist ? theme.palette.primary.main : theme.palette.warning.main }
              : {}
          }
          onClick={
            isDataScientist
              ? async e => {
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
                }
              : () =>
                  alert(
                    `Your login is not authorized to use this feature. Please request access (${CATALOGUE_TECHNICAL_CONTACT})`
                  )
          }
        >
          <DatabookIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
