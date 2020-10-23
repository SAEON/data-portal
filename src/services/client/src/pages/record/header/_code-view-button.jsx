import { Tooltip, IconButton } from '@material-ui/core'
import { Code as CodeIcon } from '@material-ui/icons'

export default ({ codeView, toggleCodeView }) => {
  return (
    <Tooltip title="View raw metadata record (JSON)">
      <IconButton
        color={codeView ? 'primary' : 'default'}
        onClick={e => {
          e.stopPropagation()
          toggleCodeView()
        }}
      >
        <CodeIcon />
      </IconButton>
    </Tooltip>
  )
}
