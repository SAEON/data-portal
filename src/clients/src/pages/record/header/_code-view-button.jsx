import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CodeIcon from 'mdi-react/CodeIcon'

export default ({ codeView, toggleCodeView }) => {
  return (
    <Tooltip title="View raw metadata record (JSON)">
      <IconButton
        aria-label="View raw (JSON) metadata"
        color={codeView ? 'primary' : 'default'}
        onClick={e => {
          e.stopPropagation()
          toggleCodeView()
        }}
      >
        <CodeIcon size={22} />
      </IconButton>
    </Tooltip>
  )
}
