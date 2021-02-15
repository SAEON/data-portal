import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CodeIcon from '@material-ui/icons/Code'

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
