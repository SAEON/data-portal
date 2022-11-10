import { useState } from 'react'
import Dialogue from './dialogue'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { FormatQuoteOpen as FormatQuoteOpenIcon } from '../icons'
import { nanoid } from 'nanoid'
import { Span } from '../html-tags'

export default ({ doi, buttonSize = 'medium', ...props }) => {
  const [open, setOpen] = useState(false)
  const id = doi || nanoid()

  return (
    <>
      <Dialogue id={`citation-dialogue-${id}`} doi={doi} open={open} setOpen={setOpen} />
      <Tooltip
        placement="top-start"
        title={
          doi
            ? 'Cite this record'
            : "Apologies, we cannot generate citations for records that don't have DOIS"
        }
      >
        <Span>
          <IconButton
            disabled={!doi}
            aria-label="Generate citation"
            aria-controls={`citation-dialogue-${id}`}
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            size={buttonSize}
            {...props}
          >
            <FormatQuoteOpenIcon fontSize="small" />
          </IconButton>
        </Span>
      </Tooltip>
    </>
  )
}
