import { FormatQuote as CitationIcon } from '@material-ui/icons'
import CitationDialog from '../../../components/citation-dialog'
import { Tooltip, IconButton } from '@material-ui/core'

// TODO shouldn't need both DOI and ID
export default ({ doi, id }) => {
  return (
    <CitationDialog doi={doi} id={id}>
      {({ disabled, onClick }) => (
        <Tooltip placement="left-start" title="Cite this record">
          <span>
            <IconButton color="primary" disabled={disabled} onClick={onClick}>
              <CitationIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </CitationDialog>
  )
}
