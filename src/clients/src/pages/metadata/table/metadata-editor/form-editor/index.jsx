import { useContext, memo } from 'react'
import { context as editorContext } from '../context'
import Fade from '@mui/material/Fade'
import { withTheme } from '@rjsf/core'
import Theme from '../../../../../theme/react-jsonschema-form'
import Container from '@mui/material/Container'

const RjsfForm = withTheme(Theme)

const Form = memo(
  ({ metadata, updateMetadata, schemaJson }) => (
    <RjsfForm
      formData={metadata}
      schema={schemaJson}
      onChange={({ formData }) => updateMetadata(formData)}
      onError={error => console.error('Metadata form error', error)}
    />
  ),
  () => true
)

export default () => {
  const { activeEditor, metadata, updateMetadata, schemaJson } = useContext(editorContext)

  const isIn = activeEditor === 'form'

  return (
    <Fade unmountOnExit in={isIn} key="rjsf-form">
      <span style={{ display: isIn ? 'inherit' : 'none' }}>
        <Container maxWidth="md">
          <Form metadata={metadata} updateMetadata={updateMetadata} schemaJson={schemaJson} />
        </Container>
      </span>
    </Fade>
  )
}
