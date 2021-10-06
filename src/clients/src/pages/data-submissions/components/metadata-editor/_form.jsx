import { useContext } from 'react'
import { context as editorContext } from './_context'
import Fade from '@material-ui/core/Fade'

export default () => {
  const { view, json } = useContext(editorContext)

  const isIn = view === 'form'

  return (
    <Fade unmountOnExit in={isIn} key="form-editor">
      <span style={{ display: isIn ? 'inherit' : 'none' }}>im the fields editor</span>
    </Fade>
  )
}
