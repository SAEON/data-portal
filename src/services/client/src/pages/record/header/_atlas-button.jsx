import { useState } from 'react'
import { Explore as PreviewIcon } from '@material-ui/icons'
import { CircularProgress, Fade, Tooltip, IconButton } from '@material-ui/core'
import { useApolloClient, gql } from '@apollo/client'
import packageJson from '../../../../package.json'
import { useHistory } from 'react-router-dom'

export default ({ linkedResources, doi }) => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const client = useApolloClient()

  const hasLayers = Boolean(
    linkedResources?.find(({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY')
  )

  return loading ? (
    <Fade in={loading}>
      <CircularProgress thickness={2} size={18} style={{ margin: '15px 8px' }} />
    </Fade>
  ) : (
    <Tooltip title={hasLayers ? 'Preview dataset' : 'Unable to preview this dataset'}>
      <span>
        <IconButton
          disabled={!hasLayers}
          color={'primary'}
          onClick={async e => {
            e.stopPropagation()
            setLoading(true)
            const { data } = await client.mutate({
              mutation: gql`
                mutation($state: JSON!, $createdBy: String!) {
                  browserClient {
                    id
                    createAtlas(state: $state, createdBy: $createdBy)
                  }
                }
              `,
              variables: {
                createdBy: `${packageJson.name} v${packageJson.version}`,
                state: { dois: [doi] },
              },
            })
            if (data) {
              history.push({
                pathname: window.location.pathname.includes('/render') ? '/render/atlas' : '/atlas',
                search: `?atlas=${data.browserClient.createAtlas}`,
              })
            } else {
              throw new Error('Error creating atlas')
            }
          }}
        >
          <PreviewIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
