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
} from '@material-ui/core'
import {
  Visibility as ViewIcon,
  Code as CodeIcon,
  FormatQuote as CitationIcon,
} from '@material-ui/icons'
import { GlobalContext } from '../../../modules/provider-global'
import { CitationDialog, DataDownloadButton } from '../..'
import useStyles from './style'
import clsx from 'clsx'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.85)'

export default ({ DOI, _source, titles, contributors, descriptions, id, immutableResource }) => {
  const history = useHistory()
  const [codeView, setCodeView] = useState(false)
  const classes = useStyles()
  const { global, setGlobal } = useContext(GlobalContext)
  const { layers } = global

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
          {DOI ? (
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

          {/* Link to /record/:id */}
          <Tooltip title="View full record" placement="left-start">
            <IconButton
              className={clsx(classes['small-icon-button'])}
              size="small"
              disabled={!id}
              onClick={() => history.push(`/records/${id}`)}
            >
              <ViewIcon />
            </IconButton>
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

        <div style={{ maxHeight: 156, overflowY: 'auto', margin: '8px' }}>
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
