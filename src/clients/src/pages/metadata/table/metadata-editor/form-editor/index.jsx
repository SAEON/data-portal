import { useContext } from 'react'
import { context as editorContext } from '../context'
import Fade from '@mui/material/Fade'
import { withTheme } from '@rjsf/core'
import { Theme } from '../../../../../theme/react-jsonschema-form'

const Form = withTheme(Theme)

export default () => {
  const { activeEditor, json, schemaJson } = useContext(editorContext)

  const isIn = activeEditor === 'form'

  return (
    <Fade unmountOnExit in={isIn} key="form-editor">
      <span style={{ display: isIn ? 'inherit' : 'none' }}>
        <Form
          formData={json}
          schema={schemaJson}
          onChange={console.log('changed')}
          onError={error => console.error('Metadata form error', error)}
        />
      </span>
    </Fade>
  )
}
