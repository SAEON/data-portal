import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, Paper, Alert, CircularProgress, Button } from '@mui/material'
import ListSubmissions from './list'
import SubmissionForm from './form'
import UploadSubmission from './upload'
import DetailSubmission from './detail'
import { PUBLIC_HTTP_ADDRESS } from '../../config'
import { ChevronLeft as BackIcon } from '../../components/icons'

function CreateSubmissionView() {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleCreate = formData => {
    setSaving(true)
    setError(null)
    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: formData }),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        navigate(`/submit/${data.id}/upload`)
      })
      .catch(err => setError(err.message))
      .finally(() => setSaving(false))
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Button startIcon={<BackIcon />} onClick={() => navigate('/submit')} sx={{ mb: 2 }}>
        Back to Submissions
      </Button>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
      >
        New Data Submission
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <SubmissionForm
        onSubmit={handleCreate}
        onCancel={() => navigate('/submit')}
        isSaving={saving}
      />
    </Box>
  )
}

function EditSubmissionView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setInitialData(data.data || {})
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleUpdate = formData => {
    setSaving(true)
    setError(null)
    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: formData }),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        navigate(`/submit/${id}`)
      })
      .catch(err => setError(err.message))
      .finally(() => setSaving(false))
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Button startIcon={<BackIcon />} onClick={() => navigate(`/submit/${id}`)} sx={{ mb: 2 }}>
        Back to Submission Details
      </Button>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
      >
        Edit Submission Metadata
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {initialData && (
        <SubmissionForm
          initialValues={initialData}
          onSubmit={handleUpdate}
          onCancel={() => navigate(`/submit/${id}`)}
          isSaving={saving}
        />
      )}
    </Box>
  )
}

export default () => {
  return (
    <Routes>
      <Route path="/" element={<ListSubmissions />} />
      <Route path="/new" element={<CreateSubmissionView />} />
      <Route path="/:id/edit" element={<EditSubmissionView />} />
      <Route path="/:id/upload" element={<UploadSubmission />} />
      <Route path="/:id" element={<DetailSubmission />} />
    </Routes>
  )
}
