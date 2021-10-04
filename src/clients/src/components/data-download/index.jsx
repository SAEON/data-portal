import { useState, useRef } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import DownloadIcon from 'mdi-react/DownloadIcon'
import { API_PUBLIC_ADDRESS } from '../../config'
import ConfirmDownload from './_confirm'
import QuickForm from '@saeon/quick-form'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'

const PLACEHOLDER_URI = 'http://nothing.com'

export default ({
  doi = undefined,
  id = undefined,
  immutableResource = undefined,
  children,
  size = 22,
  IconButtonSize = 'medium',
  tooltipPlacement,
  buttonProps,
}) => {
  const [open, setOpen] = useState(false)
  const form = useRef({})
  const { resourceDescription, resourceDownload } = immutableResource || {}
  const downloadURL =
    new URL(resourceDownload?.downloadURL || PLACEHOLDER_URI).protocol === 'http:'
      ? `${API_PUBLIC_ADDRESS}/download-proxy?uri=${resourceDownload?.downloadURL}`
      : resourceDownload?.downloadURL

  if (!resourceDownload?.downloadURL) {
    return null
  }

  return (
    <>
      <Tooltip
        placement={tooltipPlacement || 'bottom'}
        title={
          `${resourceDescription || 'Unknown resource'} (${downloadURL?.replace(/.*\./, '')})` ||
          'Unknown download'
        }
      >
        <span>
          {children ? (
            <Button
              aria-label="Download data"
              aria-controls="usage-terms-confirmation-dialogue"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              {...buttonProps}
              startIcon={<DownloadIcon />}
            >
              {children}
            </Button>
          ) : (
            <IconButton
              aria-label="Download data"
              aria-controls="usage-terms-confirmation-dialogue"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              disabled={downloadURL === PLACEHOLDER_URI}
              size={IconButtonSize}
              {...buttonProps}
            >
              <DownloadIcon size={size} />
            </IconButton>
          )}
        </span>
      </Tooltip>

      <Dialog id="usage-terms-confirmation-dialogue" open={open} onClose={() => setOpen(false)}>
        <QuickForm
          effects={[fields => (form.current = { ...fields })]}
          emailAddress=""
          organization=""
          allowContact={false}
        >
          {(update, { emailAddress, organization, allowContact }) => {
            return (
              <>
                <DialogTitle style={{ textAlign: 'center' }}>Terms of use</DialogTitle>
                <DialogContent>
                  <Typography gutterBottom variant="body2">
                    These data are made available with the express understanding that any such use
                    will properly acknowledge the originator(s) and publisher and cite the
                    associated Digital Object Identifiers (DOIs). Anyone wishing to use these data
                    should properly cite and attribute the data providers listed as authors in the
                    metadata provided with each dataset. It is expected that all the conditions of
                    the data license will be strictly honoured. Use of any material herein should be
                    properly cited using the dataset&apos;s DOIs. SAEON cannot be held responsible
                    for the quality of data provided by third parties, and while we take reasonable
                    care in referencing these datasets, the content of both metadata and data is
                    under control of the third-party provider.
                  </Typography>
                  <FormGroup>
                    <TextField
                      value={emailAddress}
                      onChange={({ target: { value: emailAddress } }) => update({ emailAddress })}
                      margin="normal"
                      helperText="What is your email address?"
                      placeholder="Email Address (optional)"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      value={organization}
                      onChange={({ target: { value: organization } }) => update({ organization })}
                      margin="normal"
                      helperText="What organization do you work for?"
                      placeholder="Organization (optional)"
                      fullWidth
                      variant="standard"
                    />
                    <FormControl fullWidth margin="dense">
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={!emailAddress}
                            checked={allowContact}
                            onChange={({ target: { checked: allowContact } }) =>
                              update({ allowContact })
                            }
                          />
                        }
                        label="May we follow up with you to assess the quality of our service?"
                      />
                    </FormControl>
                  </FormGroup>
                </DialogContent>
              </>
            )
          }}
        </QuickForm>
        <DialogActions>
          <ConfirmDownload
            id={id}
            doi={doi}
            setOpen={setOpen}
            downloadURL={downloadURL}
            resourceDescription={resourceDescription}
            form={form}
          />
        </DialogActions>
      </Dialog>
    </>
  )
}
