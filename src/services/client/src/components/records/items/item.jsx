import React, { useState, memo } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  IconButton,
  Fade,
  Tooltip,
  Collapse,
  Toolbar,
  Checkbox,
} from '@material-ui/core'
import {
  Visibility as ViewIcon,
  Explore as PreviewIcon,
  Code as CodeIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  FormatQuote as CitationIcon,
} from '@material-ui/icons'
import QuickForm from '@saeon/quick-form'
import { Link, CitationDialog, DataDownloadButton } from '../..'
import useStyles from './style'
import clsx from 'clsx'

export default memo(
  ({
    DOI,
    _source,
    _score,
    titles,
    contributors,
    descriptions,
    alternateIdentifiers,
    immutableResource,
    selectedLinkedResources,
  }) => {
    const history = useHistory()
    const [codeView, setCodeView] = useState(false)
    const classes = useStyles()

    return (
      <Fade in={true} key={DOI}>
        <Card
          variant="outlined"
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Toolbar
            className={clsx(classes.toolbar)}
            disableGutters
            variant="dense"
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            {/* SCORE */}
            {_score ? (
              <Tooltip title="Relevance to text filter (higher is better)">
                <Typography
                  style={{ marginRight: 'auto', marginLeft: 16 }}
                  color="textSecondary"
                  variant="overline"
                >
                  Score: {_score.toFixed(3)}
                </Typography>
              </Tooltip>
            ) : null}

            {/* Citation */}
            <CitationDialog record={_source}>
              {({ disabled, onClick }) => (
                <Tooltip placement="left-start" title="Cite this record">
                  <IconButton
                    className={clsx(classes['small-icon-button'])}
                    size="small"
                    disabled={disabled}
                    onClick={onClick}
                  >
                    <CitationIcon />
                  </IconButton>
                </Tooltip>
              )}
            </CitationDialog>

            {/* Download Data */}
            <DataDownloadButton
              tooltipPlacement="left-start"
              className={clsx(classes['small-icon-button'])}
              size="small"
              immutableResource={immutableResource}
            />

            {/* Link to /record/:id */}
            <Tooltip title="View full record" placement="left-start">
              <IconButton
                style={{ marginRight: 16 }}
                className={clsx(classes['small-icon-button'])}
                size="small"
                disabled={!alternateIdentifiers}
                onClick={() =>
                  history.push(
                    `/records/${
                      alternateIdentifiers?.find(
                        ({ alternateIdentifierType: type }) => type === 'Plone'
                      ).alternateIdentifier
                    }`
                  )
                }
              >
                <ViewIcon />
              </IconButton>
            </Tooltip>

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
            {selectedLinkedResources?.map(({ id, toggled, toggle }) => {
              return (
                <Tooltip key={id} title={'Select data for exploration'} placement="left-start">
                  <Checkbox
                    style={{ marginRight: 4 }}
                    size="small"
                    checked={toggled ? true : false}
                    onClick={toggle}
                  />
                </Tooltip>
              )
            })}
          </Toolbar>
          <CardContent>
            <Typography variant="h6">{titles?.[0]?.title || 'Title missing'}</Typography>
            <Typography variant="overline">
              {contributors?.[0]?.name || 'Contributor info missing'}
            </Typography>
          </CardContent>
          {codeView ? (
            <CardContent>
              <Fade key="1" in={codeView}>
                <div style={{ maxHeight: 400, overflowY: 'auto', overflowX: 'hidden' }}>
                  <pre style={{ whiteSpace: 'break-spaces', wordBreak: 'break-word' }}>
                    {JSON.stringify(_source, null, 2)}
                  </pre>
                </div>
              </Fade>
            </CardContent>
          ) : (
            <Fade key="2" in={!codeView}>
              <div>
                <CardContent>{descriptions?.[0]?.description || 'No description'}</CardContent>

                <CardContent>
                  {DOI ? (
                    <Link uri={`https://doi.org/${DOI}`} />
                  ) : (
                    <Typography variant="overline">No DOI</Typography>
                  )}
                </CardContent>
              </div>
            </Fade>
          )}
        </Card>
      </Fade>
    )
  },
  ({ selectedLinkedResources: a }, { selectedLinkedResources: b }) => {
    let stopRender = true
    if (a?.length) {
      a.forEach(({ toggled }, i) => {
        if (toggled !== b[i].toggled) {
          stopRender = false
        }
      })
    }

    return stopRender
  }
)
