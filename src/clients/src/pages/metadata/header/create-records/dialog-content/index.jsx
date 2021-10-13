import { useContext } from 'react'
import { context as dialogContext } from '../context'
import DialogContent from '@material-ui/core/DialogContent'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import useTheme from '@material-ui/core/styles/useTheme'
import Form from './form'
import Typography from '@material-ui/core/Typography'

const Content = ({
  form,
  setForm,
  schemaVersions,
  institutionOptions,
  schemaOptions,
  loadingCollections,
  licenseOptions,
  createMetadataLoading,
}) => {
  const theme = useTheme()

  return (
    <DialogContent dividers={true}>
      <Collapse in={createMetadataLoading} key="show-loading">
        <span>
          <Fade in={createMetadataLoading} key="show-loading-fade">
            <div style={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
              <Typography variant="overline" style={{ display: 'block' }}>
                Please wait...
              </Typography>
              <Typography
                variant="overline"
                style={{ display: 'block', marginBottom: theme.spacing(4) }}
              >
                This can take a few minutes
              </Typography>
              <CircularProgress size={60} />
            </div>
          </Fade>
        </span>
      </Collapse>

      <Collapse in={!createMetadataLoading} key="show-form">
        <span>
          <Fade in={!createMetadataLoading} key="show-form-fade">
            <span>
              <Form
                form={form}
                setForm={setForm}
                schemaVersions={schemaVersions}
                institutionOptions={institutionOptions}
                schemaOptions={schemaOptions}
                loadingCollections={loadingCollections}
                licenseOptions={licenseOptions}
              />
            </span>
          </Fade>
        </span>
      </Collapse>
    </DialogContent>
  )
}

export default () => {
  const {
    form,
    setForm,
    schemaVersions,
    institutionOptions,
    schemaOptions,
    loadingCollections,
    licenseOptions,
    createMetadataLoading,
  } = useContext(dialogContext)

  return (
    <Content
      form={form}
      setForm={setForm}
      schemaVersions={schemaVersions}
      institutionOptions={institutionOptions}
      schemaOptions={schemaOptions}
      loadingCollections={loadingCollections}
      licenseOptions={licenseOptions}
      createMetadataLoading={createMetadataLoading}
    />
  )
}
