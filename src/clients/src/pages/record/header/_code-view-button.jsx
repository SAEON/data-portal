import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
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
        size="large">
        <CodeIcon size={22} />
      </IconButton>
    </Tooltip>
  );
}
