import Ace from './_ace'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from 'mdi-react/DeleteIcon'

export default ({
  editor,
  updateCacheFn,

  closeEditorFn,
  activeEditorRef,
  disableCloseBtn,
}) => (
  <div style={{ position: 'relative', height: 'calc(100% - 48px)' }} role="tabpanel">
    <Ace editor={editor} updateCache={updateCacheFn} ref={activeEditorRef} />
    <Tooltip title="Close current editor" placement="left-start">
      <span style={{ zIndex: 99, position: 'absolute', right: 4, bottom: 4 }}>
        <IconButton onClick={closeEditorFn} disabled={disableCloseBtn} size="small">
          <DeleteIcon size={20} />
        </IconButton>
      </span>
    </Tooltip>
  </div>
)
