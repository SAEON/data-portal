import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  Grid,
  Alert,
  CircularProgress,
  Stack,
  Card,
  CardContent,
} from '@mui/material'
import {
  Pencil as EditIcon,
  Download as UploadIcon,
  DatabasePlus as SubmitIcon,
  ChevronLeft as BackIcon,
} from '../../components/icons'
import { useParams, useNavigate } from 'react-router-dom'
import { PUBLIC_HTTP_ADDRESS } from '../../config'

export default () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [submission, setSubmission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const loadDetail = () => {
    setLoading(true)
    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setSubmission(data)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadDetail()
  }, [id])

  const handleSubmitForCuration = () => {
    if (
      !window.confirm(
        'Submit this dataset to SAEON for curation? You will not be able to edit it after submission.'
      )
    ) {
      return
    }
    setSubmitting(true)
    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/${id}/submit`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setMessage('Dataset successfully submitted for curation!')
        loadDetail()
      })
      .catch(err => setError(err.message))
      .finally(() => setSubmitting(false))
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !submission) {
    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Alert severity="error">{error || 'Submission not found'}</Alert>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/submit')} sx={{ mt: 2 }}>
          Back to Submissions
        </Button>
      </Box>
    )
  }

  const data = submission.data || {}
  const isEditable = submission.status === 'in_progress'

  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Button startIcon={<BackIcon />} onClick={() => navigate('/submit')} sx={{ mb: 2 }}>
        Back to Submissions
      </Button>

      {message && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      <Paper sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {data.title || 'Untitled Submission'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              ID: {submission.id}
            </Typography>
          </Box>
          <Chip
            label={submission.status === 'in_progress' ? 'In Progress' : submission.status}
            color={submission.status === 'in_progress' ? 'info' : 'success'}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Abstract
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {data.abstract || 'No abstract provided'}
            </Typography>
          </Grid>

          {data.methods && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                Methodology
              </Typography>
              <Typography variant="body2" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {data.methods}
              </Typography>
            </Grid>
          )}

          {data.keywords && data.keywords.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Keywords
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {data.keywords.map((kw, i) => (
                  <Chip key={i} label={kw} size="small" variant="outlined" />
                ))}
              </Stack>
            </Grid>
          )}

          {data.date_range && (
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Temporal Coverage
              </Typography>
              <Typography variant="body2">
                {data.date_range.start_date} to {data.date_range.end_date}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Dataset Source
            </Typography>
            <Typography variant="body2">
              {submission.dataset_file_name
                ? `File: ${submission.dataset_file_name}`
                : submission.dataset_url
                ? `URL: ${submission.dataset_url}`
                : 'No dataset linked'}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {isEditable ? (
          <Box display="flex" justifyContent="flex-end" gap={2} flexWrap="wrap">
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/submit/${submission.id}/edit`)}
            >
              Edit Metadata
            </Button>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={() => navigate(`/submit/${submission.id}/upload`)}
            >
              Upload / Link Data
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<SubmitIcon />}
              onClick={handleSubmitForCuration}
              disabled={submitting}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : 'Submit for Curation'}
            </Button>
          </Box>
        ) : (
          <Alert severity="info">
            This submission has been submitted to the curation team at SAEON.
          </Alert>
        )}
      </Paper>
    </Box>
  )
}
