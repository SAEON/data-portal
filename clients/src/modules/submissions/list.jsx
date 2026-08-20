import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Tooltip,
  Stack,
} from '@mui/material'
import {
  PlaylistPlus as AddIcon,
  Pencil as EditIcon,
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Eye as ViewIcon,
  DatabasePlus as SubmitIcon,
} from '../../components/icons'
import { Link, useNavigate } from 'react-router-dom'
import { PUBLIC_HTTP_ADDRESS } from '../../config'
import { context as authenticationContext } from '../../contexts/authentication'

export default () => {
  const { user, authenticating } = useContext(authenticationContext)
  const isLoggedIn = Boolean(user)

  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const loadSubmissions = () => {
    setLoading(true)
    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions`, { credentials: 'include' })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          throw new Error('Please log in to access your data submissions.')
        }
        return res.json()
      })
      .then(data => {
        if (data && data.error) {
          throw new Error(data.error)
        }
        const items = Array.isArray(data) ? data : data?.items || []
        setSubmissions(items)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!authenticating) {
      if (isLoggedIn) {
        loadSubmissions()
      } else {
        setLoading(false)
      }
    }
  }, [authenticating, isLoggedIn])

  const handleDelete = id => {
    if (!window.confirm(`Are you sure you want to delete submission ${id}?`)) return
    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/${id}`, { method: 'DELETE', credentials: 'include' })
      .then(() => loadSubmissions())
      .catch(err => alert(`Error deleting submission: ${err.message}`))
  }

  const getStatusChip = status => {
    switch (status) {
      case 'in_progress':
        return <Chip label="In Progress" color="info" size="small" variant="outlined" />
      case 'submitted':
        return <Chip label="Submitted for Curation" color="warning" size="small" />
      case 'accepted':
      case 'published':
        return <Chip label="Accepted / Published" color="success" size="small" />
      default:
        return <Chip label={status || 'Draft'} size="small" />
    }
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Data Submissions
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage and submit dataset metadata for SAEON curation and publication.
          </Typography>
        </Box>
        {isLoggedIn && (
          <Button
            component={Link}
            to="/submit/new"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="large"
          >
            New Data Submission
          </Button>
        )}
      </Box>

      {authenticating || loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : !isLoggedIn ? (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" color="textSecondary">
            Log in to Submit Data or view previous submissions.
          </Typography>
        </Paper>
      ) : error ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : submissions.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No data submissions found.
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Click below to create your first dataset submission.
          </Typography>
          <Button component={Link} to="/submit/new" variant="contained" startIcon={<AddIcon />}>
            Create Submission
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Dataset Source</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map(sub => {
                const title = sub.data?.title || sub.title || 'Untitled Submission'
                const isEditable = sub.status === 'in_progress'
                const datasetSource = sub.dataset_file_name
                  ? `File: ${sub.dataset_file_name}`
                  : sub.dataset_url
                  ? `URL: ${sub.dataset_url}`
                  : 'No dataset uploaded'

                return (
                  <TableRow key={sub.id} hover>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        ID: {sub.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(sub.status)}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {datasetSource}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="View Details">
                          <IconButton size="small" onClick={() => navigate(`/submit/${sub.id}`)}>
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {isEditable && (
                          <>
                            <Tooltip title="Edit Metadata">
                              <IconButton
                                size="small"
                                onClick={() => navigate(`/submit/${sub.id}/edit`)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Upload Dataset">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => navigate(`/submit/${sub.id}/upload`)}
                              >
                                <UploadIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(sub.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
