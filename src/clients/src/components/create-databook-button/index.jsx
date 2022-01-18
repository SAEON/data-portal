import { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'
import Tooltip from '@mui/material/Tooltip'
import LoadingCircular from '../../components/loading-circular'
import { useTheme } from '@mui/material/styles'
import { TECHNICAL_CONTACT, CATALOGUE_SUPPORTED_DATABOOK_FORMATS } from '../../config'
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import packageJson from '../../../package.json'
import { gql, useMutation } from '@apollo/client'
import { context as globalContext } from '../../contexts/global'
import { context as authorizationContext } from '../../contexts/authorization'

export default ({ id, immutableResource, buttonSize = 'small' }) => {
  const isAllowed = CATALOGUE_SUPPORTED_DATABOOK_FORMATS.includes(immutableResource?._fileFormat)
  const { setGlobal } = useContext(globalContext)
  const { hasPermission, isAuthenticated } = useContext(authorizationContext)
  const theme = useTheme()

  if (!isAuthenticated) {
    return null
  }

  const _hasPermission = hasPermission('databook:create')

  const [createDatabook, { error, loading }] = useMutation(
    gql`
      mutation ($search: JSON!, $createdBy: String!) {
        createDatabook(search: $search, createdBy: $createdBy)
      }
    `,
    {
      onCompleted: data => {
        if (data) {
          setGlobal({ selectedIds: [id] })
          window.open(`/databooks/${data.createDatabook}`, '_blank')
        } else {
          throw new Error('createDatabook mutation failed')
        }
      },
    }
  )

  if (loading) {
    return (
      <Fade in={true}>
        <span>
          <LoadingCircular />
        </span>
      </Fade>
    )
  }

  if (error) {
    throw new Error(`Error creating databook: ${error.message}`)
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
                  color: _hasPermission ? theme.palette.primary.main : theme.palette.warning.main,
                }
              : {}
          }
          disabled={!isAllowed}
          onClick={
            _hasPermission
              ? e => {
                  e.stopPropagation()
                  createDatabook({
                    variables: {
                      createdBy: `${packageJson.name} v${packageJson.version}`,
                      search: { ids: [id] },
                    },
                  })
                }
              : () =>
                  alert(
                    `Your login is not authorized to use this feature. Please request access (${TECHNICAL_CONTACT})`
                  )
          }
        >
          <DatabookIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
