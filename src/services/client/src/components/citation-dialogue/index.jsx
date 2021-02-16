import { useState } from 'react'
import Dialogue from './dialogue'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CitationIcon from '@material-ui/icons/FormatQuote'

export default ({ doi, buttonSize = 'small' }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialogue doi={doi} open={open} setOpen={setOpen} />
      <Tooltip placement="left-start" title="Cite this record">
        <span>
          <IconButton aria-label="Get citation" onClick={() => setOpen(!open)} size={buttonSize}>
            <CitationIcon />
          </IconButton>
        </span>
      </Tooltip>
    </>
  )
}
