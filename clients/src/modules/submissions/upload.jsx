import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Stack,
  Link as MuiLink,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { PUBLIC_HTTP_ADDRESS } from '../../config'
import {
  Upload as UploadIcon,
  Link as LinkIcon,
  ChevronLeft as BackIcon,
} from '../../components/icons'

export default () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [submission, setSubmission] = useState(null)
  const [loadingSubmission, setLoadingSubmission] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const [datasetUrl, setDatasetUrl] = useState('')
  const [uploadingFile, setUploadingFile] = useState(false)
  const [savingUrl, setSavingUrl] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    setLoadingSubmission(true)
    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setSubmission(data)
          if (data.dataset_url) {
            setDatasetUrl(data.dataset_url)
          }
        }
      })
      .catch(err => console.error('Error fetching submission details:', err))
      .finally(() => setLoadingSubmission(false))
  }, [id])

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleFileUpload = e => {
    e.preventDefault()
    if (!selectedFile) {
      setError('Please select a file to upload.')
      return
    }

    setUploadingFile(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData()
    formData.append('file', selectedFile)

    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/${id}/upload`, {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })
      .then(async res => {
        const text = await res.text()
        let data = null
        if (text && text.trim()) {
          try {
            data = JSON.parse(text)
          } catch {
            data = { error: text }
          }
        }
        if (!res.ok) {
          const errMsg =
            data && data.error ? data.error : `Upload failed with HTTP status ${res.status}`
          throw new Error(errMsg)
        }
        if (data && data.error) {
          throw new Error(data.error)
        }
        return data
      })
      .then(() => {
        setSuccess(`Dataset file "${selectedFile.name}" uploaded successfully!`)
        setTimeout(() => navigate(`/submit/${id}`), 1200)
      })
      .catch(err => setError(err.message))
      .finally(() => setUploadingFile(false))
  }

  const handleUrlSubmit = e => {
    e.preventDefault()
    if (!datasetUrl.trim()) return
    setSavingUrl(true)
    setError(null)
    setSuccess(null)

    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/${id}/dataset_url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataset_url: datasetUrl }),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setSuccess('Dataset URL linked successfully!')
        setTimeout(() => navigate(`/submit/${id}`), 1200)
      })
      .catch(err => setError(err.message))
      .finally(() => setSavingUrl(false))
  }

  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const existingFileName = submission?.dataset_file_name
  const existingUrl = submission?.dataset_url

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Button startIcon={<BackIcon />} onClick={() => navigate(`/submit/${id}`)} sx={{ mb: 2 }}>
        Back to Submission Details
      </Button>

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
      >
        Upload Dataset / Link Resource
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Please upload either a <strong>dataset file</strong> OR a <strong>link (URL)</strong> to
        your dataset. In order to upload a folder, it must be zipped first. You can click Cancel and
        complete this step at a later stage—your metadata is already saved.
      </Alert>

      {/* EXISTING DATASET WARNING BANNER */}
      {existingFileName && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Currently Uploaded Dataset File: <code>{existingFileName}</code>
          </Typography>
          <Typography variant="body2">
            <strong>Warning:</strong> Uploading a new dataset file or providing a new link will
            overwrite the existing file (<code>{existingFileName}</code>).
          </Typography>
        </Alert>
      )}

      {existingUrl && !existingFileName && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Currently Linked Dataset URL:{' '}
            <MuiLink
              href={existingUrl}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
            >
              {existingUrl}
            </MuiLink>
          </Typography>
          <Typography variant="body2">
            <strong>Warning:</strong> Uploading a new dataset file or providing a new link will
            overwrite the existing dataset URL.
          </Typography>
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      {loadingSubmission ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={4}>
          {/* OPTION A: UPLOAD FILE */}
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <UploadIcon color="primary" />
              <Typography variant="h6" color="primary">
                Option A: Upload Dataset File
              </Typography>
            </Box>
            <Typography variant="caption" color="textSecondary" display="block" mb={2}>
              Upload your dataset directly to the platform. Large datasets or multi-file directories
              should be compressed into a single .zip or .tar.gz archive.
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box component="form" onSubmit={handleFileUpload}>
              <Stack spacing={3}>
                <Box
                  sx={{
                    border: '2px dashed #1976d2',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    bgcolor: 'rgba(25, 118, 210, 0.04)',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.08)' },
                  }}
                  onClick={() => document.getElementById('file-upload-input').click()}
                >
                  <input id="file-upload-input" type="file" hidden onChange={handleFileChange} />
                  <UploadIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {selectedFile ? selectedFile.name : 'Click or Drag File Here to Select'}
                  </Typography>
                  {selectedFile && (
                    <Typography variant="caption" color="textSecondary">
                      Size: {formatFileSize(selectedFile.size)}
                    </Typography>
                  )}
                  {!selectedFile && (
                    <Typography variant="caption" color="textSecondary" display="block">
                      Supports any file type (.zip, .csv, .netcdf, .nc, .geotiff, etc.)
                    </Typography>
                  )}
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!selectedFile || uploadingFile}
                    startIcon={
                      uploadingFile ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <UploadIcon />
                      )
                    }
                  >
                    {uploadingFile ? 'Uploading File...' : 'Upload Dataset File'}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Paper>

          {/* OPTION B: DATASET LINK (URL) */}
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LinkIcon color="primary" />
              <Typography variant="h6" color="primary">
                Option B: Link Dataset via URL
              </Typography>
            </Box>
            <Typography variant="caption" color="textSecondary" display="block" mb={2}>
              Alternatively, provide an accessible HTTP/FTP URL (e.g. Zenodo, Figshare,
              institutional repository) where the dataset files can be downloaded.
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box component="form" onSubmit={handleUrlSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Dataset Download URL"
                  placeholder="https://example.org/dataset/download/data.zip"
                  value={datasetUrl}
                  onChange={e => setDatasetUrl(e.target.value)}
                />
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!datasetUrl.trim() || savingUrl}
                    startIcon={
                      savingUrl ? <CircularProgress size={20} color="inherit" /> : <LinkIcon />
                    }
                  >
                    {savingUrl ? 'Saving Link...' : 'Save Dataset Link'}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Paper>

          {/* CANCEL ACTION */}
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="error" onClick={() => navigate(`/submit/${id}`)}>
              Cancel / Return to Details
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  )
}
