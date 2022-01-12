import { useContext, memo } from 'react'
import { context as editorContext } from '../context'
import Fade from '@mui/material/Fade'
import useTheme from '@mui/material/styles/useTheme'
import { withTheme } from '@rjsf/core'
import Theme from '../../../../../theme/react-jsonschema-form'
import Grid from '@mui/material/Grid'
import Hidden from '@mui/material/Hidden'
import Typography from '@mui/material/Typography'

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
  const theme = useTheme()
  const { activeEditor, metadata, updateMetadata, schemaJson, errors } = useContext(editorContext)

  const isIn = activeEditor === 'form'

  return (
    <Fade unmountOnExit in={isIn} key="rjsf-form">
      <span style={{ display: isIn ? 'inherit' : 'none' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Form metadata={metadata} updateMetadata={updateMetadata} schemaJson={schemaJson} />
          </Grid>
          <Hidden smDown>
            <Grid item md={4}>
              <Typography
                variant="overline"
                style={{ display: 'block', textAlign: 'center', marginBottom: theme.spacing(2) }}
              >
                Validation errors (last save)
              </Typography>
              <pre
                style={{
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid ${theme.palette.grey[200]}`,
                  whiteSpace: 'pre-wrap',
                  padding: theme.spacing(1),
                  wordBreak: 'break-word',
                  height: '100%',
                  fontSize: 'smaller',
                }}
              >
                {JSON.stringify(JSON.parse(errors), null, 2)}
              </pre>
            </Grid>
          </Hidden>
        </Grid>
      </span>
    </Fade>
  )
}
