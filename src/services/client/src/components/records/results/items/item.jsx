import React, { useState, useContext } from 'react'
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
import {
  Explore as ViewIcon,
  Code as CodeIcon,
  FormatQuote as CitationIcon,
} from '@material-ui/icons'
import { GlobalContext } from '../../../../modules/provider-global'
import { CitationDialog, DataDownloadButton } from '../../..'
import useStyles from './style'
import { isMobile } from 'react-device-detect'
import clsx from 'clsx'
import { usePersistSearch as WithPersistSearch } from '../../../../hooks'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.85)'

export default ({
  DOI,
  _source,
  titles,
  contributors,
  descriptions,
  id,
  immutableResource,
  linkedResources,
}) => {
  const history = useHistory()
  const [codeView, setCodeView] = useState(false)
  const classes = useStyles()
  const { global, setGlobal } = useContext(GlobalContext)
  const { selectedDois } = global

  // TODO - this could be clearer
  const geoResourceDois = DOI
    ? [
        ...new Set(
          linkedResources
            ?.filter(({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY')
            ?.map(() => DOI)
        ),
      ]
    : undefined

  return (
    <Fade in={true} key={DOI}>
      <Card style={{ backgroundColor: CARD_BG_COLOUR, height: 220 }} variant="outlined">
        {/* Button bar */}
        <Toolbar
          className={clsx(classes.toolbar)}
          disableGutters
          variant="dense"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {/* DOI */}
          {isMobile ? undefined : DOI ? (
            <Typography
              component={MuiLink}
              variant="overline"
              href={`https://doi.org/${DOI}`}
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
              {`https://doi.org/${DOI}`}
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

          {/* TOOLS */}
          {/* Download Data */}
          <DataDownloadButton
            style={{ marginLeft: 8 }}
            tooltipPlacement="left-start"
            className={clsx(classes['small-icon-button'])}
            size="small"
            immutableResource={immutableResource}
          />

          {/* PREVIEW */}
          <Tooltip
            title={geoResourceDois.length ? 'Explore dataset' : 'Preview not available'}
            placement="left-start"
          >
            <span>
              <WithPersistSearch>
                {([persistSearchState, { loading, error, data }]) => {
                  if (error) {
                    throw new Error('Error persiting search state', error)
                  }

                  if (data) {
                    const searchId = data.browserClient.persistSearchState
                    history.push({
                      pathname: 'atlas',
                      search: `?search=${searchId}`,
                    })
                  }

                  if (loading || data) {
                    return (
                      <Fade in={true}>
                        <CircularProgress thickness={2} size={12} style={{ margin: '0 6px' }} />
                      </Fade>
                    )
                  }

                  return (
                    <IconButton
                      className={clsx(classes['small-icon-button'])}
                      size="small"
                      disabled={!geoResourceDois.length}
                      onClick={e => {
                        e.stopPropagation()
                        persistSearchState({
                          variables: {
                            state: { selectedDois: geoResourceDois },
                          },
                        })
                      }}
                    >
                      <ViewIcon />
                    </IconButton>
                  )
                }}
              </WithPersistSearch>
            </span>
          </Tooltip>

          {/* Citation */}
          <CitationDialog record={_source}>
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

          {/* View raw metadata record */}
          <Tooltip title="View record JSON" placement="left-start">
            <IconButton
              size="small"
              className={clsx(classes['small-icon-button'])}
              onClick={() => setCodeView(!codeView)}
              color={codeView ? 'primary' : 'default'}
              aria-label="Show metadata JSON object"
            >
              <CodeIcon />
            </IconButton>
          </Tooltip>

          {/* Toggle Item select */}
          <Tooltip title={'Select record'} placement="left-start">
            <Checkbox
              style={{ marginRight: 4 }}
              size="small"
              color="primary"
              checked={selectedDois.includes(DOI)}
              onChange={(e, checked) => {
                if (checked) {
                  setGlobal({ selectedDois: [...selectedDois, DOI] })
                } else {
                  setGlobal({ selectedDois: selectedDois.filter(doi => doi !== DOI) })
                }
              }}
            />
          </Tooltip>
        </Toolbar>

        <div style={{ maxHeight: 156, overflowY: 'auto', margin: '8px 8px 8px 0' }}>
          {/* Item content */}
          {codeView ? (
            <Fade key="1" in={codeView}>
              <CardContent style={{ paddingRight: 8, paddingTop: 0 }}>
                <pre style={{ whiteSpace: 'break-spaces', wordBreak: 'break-word' }}>
                  {JSON.stringify(_source, null, 2)}
                </pre>
              </CardContent>
            </Fade>
          ) : (
            <Fade key="2" in={!codeView}>
              <div>
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
                    {contributors?.[0]?.name || 'Contributor info missing'}
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
            </Fade>
          )}
        </div>
      </Card>
    </Fade>
  )
}
