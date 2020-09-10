import React, { useState, useContext } from 'react'
import { IconButton, Typography, Menu, MenuItem, Tooltip, ListItemIcon } from '@material-ui/core'
import { Share as ShareIcon, Link as LinkIcon } from '@material-ui/icons'
import { GlobalContext } from '../../provider-global'

const ID = 'share-or-embed-menu'
const HELP_TEXT = 'Create a link for sharing or embedding this page'

export default ({ style = {} }) => {
  const [shareMenuAnchor, setShareMenuAnchor] = useState(null)
  const { saveGlobalState } = useContext(GlobalContext)

  return (
    <div style={style}>
      <Tooltip placement="right" title={HELP_TEXT}>
        <IconButton
          aria-label={HELP_TEXT}
          aria-controls={ID}
          aria-haspopup="true"
          onClick={({ currentTarget }) => setShareMenuAnchor(currentTarget)}
          color="inherit"
          size="small"
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id={ID}
        anchorEl={shareMenuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(shareMenuAnchor)}
        onClose={() => setShareMenuAnchor(null)}
      >
        {/* SHARE */}
        <MenuItem
          onClick={async () => {
            // Save current state to Mongo
            const stateId = await saveGlobalState()
            alert(stateId)

            // Get the ID of that state
            // Open a new tab with that state in the URI

            setShareMenuAnchor(null)
          }}
          dense={true}
        >
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="overline">Share</Typography>
        </MenuItem>

        {/* EMBED */}
        <MenuItem
          onClick={() => {
            setShareMenuAnchor(null)
          }}
          dense={true}
        >
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="overline">Embed</Typography>
        </MenuItem>
      </Menu>
    </div>
  )
}
