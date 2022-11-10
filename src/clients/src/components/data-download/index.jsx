import { useState, useRef } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import { DownloadCircleOutline as DownloadIcon } from '../icons'
import { PUBLIC_HTTP_ADDRESS, EMAIL_REGEX } from '../../config'
import ConfirmDownload from './_confirm'
import QuickForm from '../../packages/quick-form'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import { useTheme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import { Span } from '../html-tags'

const PLACEHOLDER_URI = 'http://nothing.com'

const formFields = {
  emailAddress: '',
  organization: '',
  race: '',
  gender: '',
  location: '',
  comments: '',
  ageGroup: 'None',
  allowContact: false,
  student: 'NA',
}

const ageGroups = ['None', '< 18', '19 - 24', '25 - 30', '31 - 40', '> 41']

const yesNo = ['NA', 'Yes', 'No']

export default ({
  doi = undefined,
  id = undefined,
  immutableResource = undefined,
  children,
  title = undefined,
  fontSize = 'small',
  IconButtonSize = 'medium',
  TextButton = undefined,
  tooltipPlacement,
  buttonProps,
}) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const form = useRef({})
  const { resourceDescription, resourceDownload } = immutableResource || {}
  const downloadURL =
    new URL(resourceDownload?.downloadURL || PLACEHOLDER_URI).protocol === 'http:'
      ? `${PUBLIC_HTTP_ADDRESS}/download-proxy?uri=${resourceDownload?.downloadURL}`
      : resourceDownload?.downloadURL

  const disabaled = !resourceDownload?.downloadURL

  return (
    <>
      {!TextButton && (
        <Tooltip
          placement={tooltipPlacement || 'top-start'}
          title={
            disabaled
              ? 'No available download'
              : title ||
                `${resourceDescription || 'Download'} (${downloadURL?.replace(/.*\./, '')})` ||
                'Unknown download'
          }
        >
          <Span>
            {children ? (
              <Button
                disabled={disabaled}
                aria-label="Download data"
                aria-controls="usage-terms-confirmation-dialogue"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpen(open => !open)}
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
                onClick={() => setOpen(open => !open)}
                disabled={disabaled || downloadURL === PLACEHOLDER_URI}
                size={IconButtonSize}
                {...buttonProps}
              >
                <DownloadIcon fontSize={fontSize} />
              </IconButton>
            )}
          </Span>
        </Tooltip>
      )}

      {TextButton && <TextButton onClick={() => setOpen(open => !open)} />}

      <Dialog id="usage-terms-confirmation-dialogue" open={open} onClose={() => setOpen(false)}>
        <QuickForm effects={[fields => (form.current = { ...fields })]} {...formFields}>
          {(update, fields) => {
            const isValidEmailAddress = EMAIL_REGEX.test(fields.emailAddress)
            const formIsValid = fields.emailAddress === '' ? true : isValidEmailAddress

            return (
              <>
                <DialogTitle style={{ textAlign: 'center' }}>Terms of use</DialogTitle>
                <DialogContent dividers>
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
                  <Typography style={{ marginTop: theme.spacing(2) }} gutterBottom variant="body2">
                    If you are open to filling in the form below, we appreciate it and would use the
                    information to improve our service.
                  </Typography>
                  <FormGroup>
                    <TextField
                      value={fields.student}
                      onChange={({ target: { value: student } }) => update({ student })}
                      margin="normal"
                      select
                      helperText="Are you a student?"
                      fullWidth
                      variant="standard"
                    >
                      {[
                        ...yesNo.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        )),
                      ]}
                    </TextField>

                    <TextField
                      value={fields.organization}
                      onChange={({ target: { value: organization } }) => update({ organization })}
                      margin="normal"
                      multiline={fields.student === 'Yes' ? true : false}
                      minRows={fields.student === 'Yes' ? 2 : 1}
                      helperText={
                        fields.organization === ''
                          ? fields.student === 'Yes'
                            ? ''
                            : 'Optional'
                          : fields.student === 'Yes'
                          ? ''
                          : 'Organisation'
                      }
                      placeholder={
                        fields.student === 'Yes'
                          ? '(Optional) please let us know if you are undergraduate or postgraduate, and which school/university you attend'
                          : 'Organisation'
                      }
                      autoComplete="off"
                      fullWidth
                      variant={fields.student === 'Yes' ? 'outlined' : 'standard'}
                    />
                    <TextField
                      value={fields.emailAddress}
                      onChange={({ target: { value: emailAddress } }) => update({ emailAddress })}
                      margin="normal"
                      helperText={
                        fields.emailAddress === ''
                          ? 'Optional'
                          : isValidEmailAddress
                          ? 'Thank you!'
                          : 'Email address must be valid'
                      }
                      placeholder="Email Address"
                      fullWidth
                      error={fields.emailAddress !== '' && !isValidEmailAddress}
                      variant="standard"
                    />
                    <TextField
                      value={fields.ageGroup}
                      onChange={({ target: { value: ageGroup } }) => update({ ageGroup })}
                      margin="normal"
                      select
                      helperText={fields.ageGroup === '' ? 'Optional' : 'Age group'}
                      defaultValue="None"
                      autoComplete="off"
                      fullWidth
                      variant="standard"
                    >
                      {[
                        ...ageGroups.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        )),
                      ]}
                    </TextField>
                    <TextField
                      value={fields.race}
                      onChange={({ target: { value: race } }) => update({ race })}
                      margin="normal"
                      helperText={fields.race === '' ? 'Optional' : 'Race'}
                      placeholder="Race"
                      autoComplete="off"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      value={fields.gender}
                      onChange={({ target: { value: gender } }) => update({ gender })}
                      margin="normal"
                      helperText={fields.gender === '' ? 'Optional' : 'Gender'}
                      placeholder="Gender"
                      autoComplete="off"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      value={fields.location}
                      onChange={({ target: { value: location } }) => update({ location })}
                      margin="normal"
                      placeholder="Where do you live/work from?"
                      fullWidth
                      autoComplete="off"
                      multiline
                      minRows={2}
                      variant="outlined"
                    />
                    <TextField
                      value={fields.comments}
                      onChange={({ target: { value: comments } }) => update({ comments })}
                      margin="normal"
                      autoComplete="off"
                      placeholder="General comments"
                      multiline
                      minRows={4}
                      fullWidth
                      variant="outlined"
                    />
                    <FormControl fullWidth margin="dense">
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={!fields.emailAddress || !isValidEmailAddress}
                            checked={fields.allowContact}
                            onChange={({ target: { checked: allowContact } }) =>
                              update({ allowContact })
                            }
                          />
                        }
                        label={
                          fields.allowContact
                            ? `Wonderful! We'll be in touch`
                            : 'May we follow up with you?'
                        }
                      />
                    </FormControl>
                  </FormGroup>
                </DialogContent>
                <DialogActions>
                  <ConfirmDownload
                    formFields={formFields}
                    id={id}
                    doi={doi}
                    disabled={!formIsValid}
                    setOpen={setOpen}
                    downloadURL={downloadURL}
                    resourceDescription={resourceDescription}
                    form={form}
                  />
                </DialogActions>
              </>
            )
          }}
        </QuickForm>
      </Dialog>
    </>
  )
}
