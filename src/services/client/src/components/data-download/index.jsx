import { useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'
import DownloadIcon from 'mdi-react/DownloadIcon'
import SimpleLink from '../link'
import { CATALOGUE_API_ADDRESS } from '../../config'

const PLACEHOLDER_URI = 'http://nothing.com'

export default ({
  immutableResource,
  children,
  size = 22,
  IconButtonSize = 'medium',
  tooltipPlacement,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const { resourceDescription, resourceDownload } = immutableResource || {}
  const downloadURL =
    new URL(resourceDownload?.downloadURL || PLACEHOLDER_URI).protocol === 'http:'
      ? `${CATALOGUE_API_ADDRESS}/download-proxy?uri=${resourceDownload?.downloadURL}`
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
              {...props}
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
              {...props}
            >
              <DownloadIcon size={size} />
            </IconButton>
          )}
        </span>
      </Tooltip>

      <Dialog id="usage-terms-confirmation-dialogue" open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ textAlign: 'center' }}>Terms of use</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            These data are made available with the express understanding that any such use will
            properly acknowledge the originator(s) and publisher and cite the associated Digital
            Object Identifiers (DOIs). Anyone wishing to use these data should properly cite and
            attribute the data providers listed as authors in the metadata provided with each
            dataset. It is expected that all the conditions of the data license will be strictly
            honoured. Use of any material herein should be properly cited using the dataset&apos;s
            DOIs. SAEON cannot be held responsible for the quality of data provided by third
            parties, and while we take reasonable care in referencing these datasets, the content of
            both metadata and data is under control of the third-party provider.
          </Typography>
        </DialogContent>
        <DialogActions>
          <SimpleLink
            aria-label="Agree to terms and download resource"
            download={resourceDescription || 'Unknown resource'}
            style={{ display: 'block' }}
            uri={downloadURL}
          >
            <Typography
              onClick={() => setOpen(false)}
              variant="overline"
              style={{ margin: theme.spacing(2) }}
            >
              I AGREE
            </Typography>
          </SimpleLink>
        </DialogActions>
      </Dialog>
    </>
  )
}
