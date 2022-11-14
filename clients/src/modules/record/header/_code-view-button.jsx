import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { CodeJson as CodeJsonIcon } from '../../../components/icons'

export default ({ codeView, toggleCodeView }) => {
  return (
    <Tooltip placement="top" title="View raw metadata record (JSON)">
      <IconButton
        aria-label="View raw (JSON) metadata"
        color={codeView ? 'primary' : 'default'}
        onClick={e => {
          e.stopPropagation()
          toggleCodeView()
        }}
        size="medium"
      >
        <CodeJsonIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}
