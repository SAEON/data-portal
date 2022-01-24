import { useContext, memo } from 'react'
import { context as editorContext } from '../context'
import Fade from '@mui/material/Fade'
import { withTheme } from '@rjsf/core'
import Theme from '../../../../../theme/react-jsonschema-form'
import Grid from '@mui/material/Grid'
import Hidden from '@mui/material/Hidden'
import Typography from '@mui/material/Typography'
import { Pre, Span } from '../../../../../components/html-tags'

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
  const { activeEditor, metadata, updateMetadata, schemaJson, errors } = useContext(editorContext)

  const isIn = activeEditor === 'form'

  return (
    <Fade unmountOnExit in={isIn} key="rjsf-form">
      <Span sx={{ display: isIn ? 'inherit' : 'none' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Form metadata={metadata} updateMetadata={updateMetadata} schemaJson={schemaJson} />
          </Grid>
          <Hidden smDown>
            <Grid item md={4}>
              <Typography
                variant="overline"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  marginBottom: theme => theme.spacing(2),
                }}
              >
                Validation errors (last save)
              </Typography>
              <Pre
                sx={{
                  height: '100%',
                  fontSize: 'smaller',
                }}
              >
                {JSON.stringify(JSON.parse(errors), null, 2)}
              </Pre>
            </Grid>
          </Hidden>
        </Grid>
      </Span>
    </Fade>
  )
}
