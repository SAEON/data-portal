import { FormatQuote as CitationIcon } from '@material-ui/icons'
import CitationDialog from '../../../components/citation-dialogue'
import { Tooltip, IconButton } from '@material-ui/core'

export default ({ doi }) => {
  console.log('doi', doi)
  return (
    <CitationDialog doi={doi}>
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
