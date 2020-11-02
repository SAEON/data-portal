import { IconButton, Tooltip } from '@material-ui/core'
import { FormatQuote as CitationIcon } from '@material-ui/icons'
import CitationDialog from '../../../../../../components/citation-dialogue'
import clsx from 'clsx'
import useStyles from './style'

export default ({ id, doi }) => {
  const classes = useStyles()

  return (
    <CitationDialog id={id} doi={doi}>
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
  )
}
