import { useContext } from 'react'
import { context as editorContext } from '../context'
import Fade from '@mui/material/Fade'
// import ObjectField from '../../../components/obj-form-field'
// import FormGroup from '@mui/material/FormGroup'
import { withTheme } from '@rjsf/core'
import { Theme } from './theme' // TODO rjsf is likely to include this theme as part of the library in the future

const Form = withTheme(Theme)

export default () => {
  const { activeEditor, json, schemaJson } = useContext(editorContext)
  console.log(schemaJson)

  const isIn = activeEditor === 'form'

  return (
    <Fade unmountOnExit in={isIn} key="form-editor">
      <span style={{ display: isIn ? 'inherit' : 'none' }}>
        <Form
          schema={schemaJson}
          onChange={console.log('changed')}
          onSubmit={console.log('submitted')}
          onError={console.log('errors')}
        />
      </span>
    </Fade>
  )
}
