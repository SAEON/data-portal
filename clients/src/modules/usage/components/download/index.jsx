import { useState } from 'react'
import Button from '@mui/material/Button'
import { Download as DownloadIcon } from '../../../../components/icons'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import { Parser } from 'json2csv'

const DownloadButton = ({ data, fields, transforms, filename, setOpen }) => (
  <Button
    onClick={() => {
      const parser = new Parser({
        fields,
        quote: '"',
        delimiter: ',',
        eol: '\n',
        transforms,
      })
      const csv = parser.parse(data)
      const link = document.createElement('a')
      link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      setOpen(false)
    }}
    variant="contained"
    disableElevation
    size="small"
  >
    Okay
  </Button>
)

export default ({
  title,
  description,
  defaultFilename = 'download.csv',
  data,
  fields,
  transforms,
  DataComponent = undefined,
}) => {
  const [open, setOpen] = useState(false)
  const [filename, setFilename] = useState(defaultFilename)

  return (
    <>
      {/* TOGGLE */}
      <Button
        onClick={() => setOpen(true)}
        startIcon={<DownloadIcon fontSize="small" />}
        variant="text"
        size="small"
        disableElevation
      >
        {title}
      </Button>

      {/* DIALOGUE */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {title
            .replace(/download/i, '')
            .trim()
            .titleize()}
        </DialogTitle>
        <DialogContent>
          {description}
          <TextField
            placeholder={defaultFilename}
            fullWidth
            label="Filename"
            helperText={`What should the file be called (default is ${defaultFilename})`}
            autoComplete="off"
            margin="normal"
            onChange={e => setFilename(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {DataComponent ? (
            <DataComponent>
              {({ data }) => (
                <DownloadButton
                  data={data}
                  fields={fields}
                  transforms={transforms}
                  filename={filename}
                  setOpen={setOpen}
                />
              )}
            </DataComponent>
          ) : (
            <DownloadButton
              data={data}
              fields={fields}
              transforms={transforms}
              filename={filename}
              setOpen={setOpen}
            />
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
