import { useState } from 'react'
import Dialogue from './dialogue'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CitationIcon from 'mdi-react/FormatQuoteCloseIcon'
import { nanoid } from 'nanoid'
import { Span } from '../html-tags'

export default ({ doi, buttonSize = 'small', ...props }) => {
  const [open, setOpen] = useState(false)
  const id = doi || nanoid()

  return (
    <>
      <Dialogue id={`citation-dialogue-${id}`} doi={doi} open={open} setOpen={setOpen} />
      <Tooltip
        placement="left-start"
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
            <CitationIcon />
          </IconButton>
        </Span>
      </Tooltip>
    </>
  )
}
