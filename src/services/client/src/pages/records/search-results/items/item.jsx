import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Fade,
  Tooltip,
  Toolbar,
  Checkbox,
  Divider,
  Link as MuiLink,
  CircularProgress,
} from '@material-ui/core'
import { Explore as ViewIcon, FormatQuote as CitationIcon } from '@material-ui/icons'
import { GlobalContext } from '../../../../contexts/global'
import { CitationDialog } from '../../../../components'
import useStyles from './style'
import { isMobile } from 'react-device-detect'
import clsx from 'clsx'
import { gql, useApolloClient } from '@apollo/client'
import packageJson from '../../../../../package.json'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.85)'

export default ({ doi, titles, creators, descriptions, id, linkedResources }) => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const classes = useStyles()
  const { global, setGlobal } = useContext(GlobalContext)
  const { selectedDois } = global

  const hasLayers = Boolean(
    linkedResources?.find(({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY')
  )

  return (
    <Fade in={true} key={doi}>
      <Card style={{ backgroundColor: CARD_BG_COLOUR, height: 220 }} variant="outlined">
        {/* Button bar */}
        <Toolbar
          className={clsx(classes.toolbar)}
          disableGutters
          variant="dense"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {/* DOI */}
          {isMobile ? undefined : doi ? (
            <Typography
              component={MuiLink}
              variant="overline"
              href={`https://doi.org/${doi}`}
              style={{
                cursor: 'pointer',
                marginRight: 'auto',
                marginLeft: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`https://doi.org/${doi}`}
            </Typography>
          ) : (
            <Typography
              style={{
                marginRight: 'auto',
                marginLeft: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              variant="overline"
            >
              No DOI
            </Typography>
          )}

          {/* PREVIEW */}
          {loading ? (
            <Fade in={true}>
              <CircularProgress thickness={2} size={18} style={{ margin: '0 6px' }} />
            </Fade>
          ) : (
            <Tooltip
              title={hasLayers ? 'Explore dataset' : 'Preview not available'}
              placement="left-start"
            >
              <span>
                <IconButton
                  className={clsx(classes['small-icon-button'])}
                  size="small"
                  disabled={!hasLayers}
                  onClick={async e => {
                    e.stopPropagation()
                    setLoading(true)
                    setGlobal({ selectedDois: [...new Set([...selectedDois, doi])] })
                    const { data } = await client.mutate({
                      mutation: gql`
                        mutation($state: JSON!, $createdBy: String!) {
                          browserClient {
                            persistSearchState(state: $state, createdBy: $createdBy)
                          }
                        }
                      `,
                      variables: {
                        createdBy: `${packageJson.name} v${packageJson.version}`,
                        state: { selectedDois: [doi] },
                      },
                    })
                    if (data) {
                      history.push({
                        pathname: '/atlas',
                        search: `?search=${data.browserClient.persistSearchState}`,
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
          )}

          {/* Citation */}
          <CitationDialog id={id} doi={doi}>
            {({ disabled, onClick }) => (
              <Tooltip placement="left-start" title="Cite this record">
                <span>
                  <IconButton
                    className={clsx(classes['small-icon-button'])}
                    size="small"
                    disabled={disabled}
                    onClick={onClick}
                  >
                    <CitationIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </CitationDialog>

          <Divider orientation="vertical" style={{ height: 16, margin: 16 }} />

          {/* Toggle Item select */}
          <Tooltip title={'Select record'} placement="left-start">
            <Checkbox
              style={{ marginRight: 4 }}
              size="small"
              color="primary"
              checked={selectedDois.includes(doi)}
              onChange={(e, checked) => {
                if (checked) {
                  setGlobal({ selectedDois: [...new Set([...selectedDois, doi])] })
                } else {
                  setGlobal({ selectedDois: selectedDois.filter(doi => doi !== doi) })
                }
              }}
            />
          </Tooltip>
        </Toolbar>

        <div style={{ maxHeight: 156, overflowY: 'auto', margin: '8px 8px 8px 0' }}>
          {/* Title and author */}
          <CardContent style={{ paddingRight: 8, paddingTop: 0 }}>
            <Typography
              component={MuiLink}
              onClick={() => history.push(`/records/${id}`)}
              style={{
                cursor: 'pointer',
              }}
              variant="h6"
            >
              {titles?.[0]?.title || 'Title missing'}
            </Typography>
            <br />
            <Typography variant="overline">
              {creators?.map(({ name }) => name).join(', ') || 'Contributor info missing'}
            </Typography>
          </CardContent>

          {/* Description */}
          <CardContent style={{ paddingRight: 8 }}>
            <Typography
              style={{ whiteSpace: 'break-spaces', wordBreak: 'break-word' }}
              variant="body2"
            >
              {descriptions?.[0]?.description || 'No description'}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Fade>
  )
}
