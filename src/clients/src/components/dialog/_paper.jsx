import Draggable from 'react-draggable'
import Paper from '@material-ui/core/Paper'

export default ({ draggableId, ...props }) => {
  return (
    <Draggable bounds="body" handle={`#${draggableId}`} cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} style={{ margin: 0 }} />
    </Draggable>
  )
}
