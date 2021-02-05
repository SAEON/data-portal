import { useContext, useState } from 'react'
import { IconButton, Fade, Tooltip, CircularProgress } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { CATALOGUE_TECHNICAL_CONTACT } from '../../../../../../config'
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import packageJson from '../../../../../../../package.json'
import { gql, useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import useStyles from './style'
import { context as globalContext } from '../../../../../../contexts/global'
import { context as authorizationContext } from '../../../../../../contexts/authorization'

export default ({ id, immutableResource }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const client = useApolloClient()
  const classes = useStyles()
  const { global, setGlobal } = useContext(globalContext)
  const { isDataScientist, isAuthenticated } = useContext(authorizationContext)
  const { selectedIds } = global
  const history = useHistory()
  const theme = useTheme()

  if (!isAuthenticated) {
    return null
  }

  const isAllowed = ['Shapefile', 'NetCDF'].includes(immutableResource?._fileFormat)

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
      title={isAllowed ? 'Analyze dataset' : 'Only shapefiles supported currently'}
      placement="left-start"
    >
      <span>
        <IconButton
          className={clsx(classes['small-icon-button'])}
          size="small"
          style={
            isAllowed
              ? { color: isDataScientist ? theme.palette.primary.main : theme.palette.warning.main }
              : {}
          }
          disabled={!isAllowed}
          onClick={
            isDataScientist
              ? async e => {
                  e.stopPropagation()
                  setLoading(true)
                  setGlobal({ selectedIds: [...new Set([...selectedIds, id])] })
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
