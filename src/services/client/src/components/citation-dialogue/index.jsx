import CitationDialog from './dialogue'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CitationIcon from '@material-ui/icons/FormatQuote'

export default ({ id, doi, buttonSize = 'small' }) => {
  return (
    <CitationDialog id={id} doi={doi}>
      {({ disabled, onClick }) => (
        <Tooltip placement="left-start" title="Cite this record">
          <span>
            <IconButton size={buttonSize} disabled={disabled} onClick={onClick}>
              <CitationIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </CitationDialog>
  )
}
