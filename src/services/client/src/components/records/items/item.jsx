import React, { useState, useContext, memo } from 'react'
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
} from '@material-ui/core'
import {
  Visibility as ViewIcon,
  Code as CodeIcon,
  FormatQuote as CitationIcon,
} from '@material-ui/icons'
import { GlobalContext } from '../../../modules/provider-global'
import { Link, CitationDialog, DataDownloadButton } from '../..'
import useStyles from './style'
import clsx from 'clsx'

export default ({
  DOI,
  _source,
  _score,
  titles,
  contributors,
  descriptions,
  alternateIdentifiers,
  immutableResource,
}) => {
  const history = useHistory()
  const [codeView, setCodeView] = useState(false)
  const classes = useStyles()
  const { global, setGlobal } = useContext(GlobalContext)
  const { layers } = global

  return (
    <Fade in={true} key={DOI}>
      <Card
        variant="outlined"
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Button bar */}
        <Toolbar
          className={clsx(classes.toolbar)}
          disableGutters
          variant="dense"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {/* Score */}
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
          <Tooltip title={'Select data for exploration'} placement="left-start">
            <Checkbox
              style={{ marginRight: 4 }}
              size="small"
              checked={layers.includes(DOI)}
              onChange={(e, checked) => {
                if (checked) {
                  setGlobal({ layers: [...layers, DOI] })
                } else {
                  setGlobal({ layers: layers.filter(layer => layer !== DOI) })
                }
              }}
            />
          </Tooltip>
        </Toolbar>

        {/* Item content */}
        {codeView ? (
          <Fade key="1" in={codeView}>
            <CardContent>
              <div style={{ maxHeight: 400, overflowY: 'auto', overflowX: 'hidden' }}>
                <pre style={{ whiteSpace: 'break-spaces', wordBreak: 'break-word' }}>
                  {JSON.stringify(_source, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Fade>
        ) : (
          <Fade key="2" in={!codeView}>
            <div>
              {/* Title and author */}
              <CardContent>
                <Typography variant="h6">{titles?.[0]?.title || 'Title missing'}</Typography>
                <Typography variant="overline">
                  {contributors?.[0]?.name || 'Contributor info missing'}
                </Typography>
              </CardContent>

              {/* Description */}
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
}
