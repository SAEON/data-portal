import { useContext, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Fade from '@material-ui/core/Fade'
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress'
import useTheme from '@material-ui/core/styles/useTheme'
import { CATALOGUE_TECHNICAL_CONTACT } from '../../config'
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import packageJson from '../../../package.json'
import { gql, useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { context as globalContext } from '../../contexts/global'
import { context as authorizationContext } from '../../contexts/authorization'

const DATABOOK_SUPPORTED_FORMATS = ['SHAPEFILE', 'NETCDF']

export default ({ id, immutableResource, buttonSize = 'small' }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const client = useApolloClient()
  const { setGlobal } = useContext(globalContext)
  const { isDataScientist, isAuthenticated } = useContext(authorizationContext)
  const history = useHistory()
  const theme = useTheme()

  if (!isAuthenticated) {
    return null
  }

  const isAllowed = DATABOOK_SUPPORTED_FORMATS.includes(immutableResource?._fileFormat)

  if (error) {
    throw new Error(`Error creating databook: ${error.message}`)
  }

  if (loading) {
    return (
      <Fade in={true}>
        <CircularProgress thickness={2} size={18} style={{ margin: '0 6px' }} />
      </Fade>
    )
  }

  return (
    <Tooltip
      title={
        isAllowed ? 'Analyze dataset' : 'Only some file formats supported for databook workflows'
      }
      placement="left"
    >
      <span>
        <IconButton
          aria-label="Create databook"
          size={buttonSize}
          style={
            isAllowed
              ? {
                  color: isDataScientist ? theme.palette.primary.main : theme.palette.warning.main,
                }
              : {}
          }
          disabled={!isAllowed}
          onClick={
            isDataScientist
              ? async e => {
                  e.stopPropagation()
                  setLoading(true)
                  setGlobal({ selectedIds: [id] })
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
                      setError(error)
                    })
                    .finally(() => setLoading(false))
                  if (data) {
                    history.push({
                      pathname: window.location.pathname.includes('render')
                        ? `render/databooks/${data.createDatabook}`
                        : `/databooks/${data.createDatabook}`,
                    })
                  } else {
                    throw new Error('Error creating databook')
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
