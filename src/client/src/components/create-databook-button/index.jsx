import { useContext, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Fade from '@material-ui/core/Fade'
import Tooltip from '@material-ui/core/Tooltip'
import LoadingCircular from '../../components/loading-circular'
import useTheme from '@material-ui/core/styles/useTheme'
import { CATALOGUE_TECHNICAL_CONTACT, CATALOGUE_SUPPORTED_DATABOOK_FORMATS } from '../../config'
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import packageJson from '../../../package.json'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { context as globalContext } from '../../contexts/global'
import { context as authorizationContext } from '../../contexts/authorization'

export default ({ id, immutableResource, buttonSize = 'small' }) => {
  const isAllowed = CATALOGUE_SUPPORTED_DATABOOK_FORMATS.includes(immutableResource?._fileFormat)
  const { setGlobal } = useContext(globalContext)
  const { isDataScientist, isAuthenticated } = useContext(authorizationContext)
  const history = useHistory()
  const theme = useTheme()

  if (!isAuthenticated) {
    return null
  }

  const [createDatabook, { error, loading }] = useMutation(
    gql`
      mutation ($search: JSON!, $createdBy: String!) {
        createDatabook(search: $search, createdBy: $createdBy)
      }
    `,
    {
      onCompleted: data => {
        if (data) {
          history.push({
            pathname: window.location.pathname.includes('render')
              ? `render/databooks/${data.createDatabook}`
              : `/databooks/${data.createDatabook}`,
          })
        } else {
          throw new Error('createDatabook mutation failed')
        }
      },
    }
  )

  if (loading) {
    return (
      <Fade in={true}>
        <LoadingCircular />
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
                  color: isDataScientist ? theme.palette.primary.main : theme.palette.warning.main,
                }
              : {}
          }
          disabled={!isAllowed}
          onClick={
            isDataScientist
              ? e => {
                  e.stopPropagation()
                  setGlobal({ selectedIds: [id] })
                  createDatabook({
                    variables: {
                      createdBy: `${packageJson.name} v${packageJson.version}`,
                      search: { ids: [id] },
                    },
                  })
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
