import { useContext, useState } from 'react'
import { IconButton, Fade, Tooltip, CircularProgress } from '@material-ui/core'
import { Explore as ViewIcon } from '@material-ui/icons'
import packageJson from '../../../../../../../package.json'
import { gql, useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import useStyles from './style'
import { context as globalContext } from '../../../../../../contexts/global'

export default ({ id, linkedResources }) => {
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()
  const classes = useStyles()
  const { global, setGlobal } = useContext(globalContext)
  const { selectedIds } = global
  const history = useHistory()

  const hasLayers = Boolean(
    linkedResources?.find(({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY')
  )

  return loading ? (
    <Fade in={true}>
      <CircularProgress thickness={2} size={18} style={{ margin: '0 6px' }} />
    </Fade>
  ) : (
    <Tooltip title={hasLayers ? 'Explore dataset' : 'Preview not available'} placement="left-start">
      <span>
        <IconButton
          className={clsx(classes['small-icon-button'])}
          size="small"
          disabled={!hasLayers}
          onClick={async e => {
            e.stopPropagation()
            setLoading(true)
            setGlobal({ selectedIds: [...new Set([...selectedIds, id])] })
            const { data } = await client.mutate({
              mutation: gql`
                mutation($search: JSON!, $createdBy: String!) {
                  createAtlas(search: $search, createdBy: $createdBy)
                }
              `,
              variables: {
                createdBy: `${packageJson.name} v${packageJson.version}`,
                search: { ids: [id] },
              },
            })
            if (data) {
              history.push({
                pathname: window.location.pathname.includes('render') ? '/render/atlas' : '/atlas',
                search: `?atlas=${data.createAtlas}`,
              })
            } else {
              throw new Error('Error creating atlas')
            }
          }}
        >
          <ViewIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
