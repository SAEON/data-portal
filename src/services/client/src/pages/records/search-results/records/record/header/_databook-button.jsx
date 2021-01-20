import { useContext, useState } from 'react'
import { IconButton, Fade, Tooltip, CircularProgress } from '@material-ui/core'
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import packageJson from '../../../../../../../package.json'
import { gql, useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import useStyles from './style'
import { context as globalContext } from '../../../../../../contexts/global'
import { context as authContext } from '../../../../../../contexts/authentication'

export default ({ id, immutableResource }) => {
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()
  const classes = useStyles()
  const { global, setGlobal } = useContext(globalContext)
  const { userInfo } = useContext(authContext)
  const { selectedIds } = global
  const history = useHistory()

  const isShapefile = immutableResource?._fileFormat === 'Shapefile'

  if (!userInfo) {
    return null
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
      title={isShapefile ? 'Analyze dataset' : 'Only shapefiles supported currently'}
      placement="left-start"
    >
      <span>
        <IconButton
          className={clsx(classes['small-icon-button'])}
          size="small"
          disabled={!isShapefile}
          onClick={async e => {
            e.stopPropagation()
            setLoading(true)
            setGlobal({ selectedIds: [...new Set([...selectedIds, id])] })
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
                pathname: window.location.pathname.includes('render')
                  ? `render/databooks/${data.createDatabook}`
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
