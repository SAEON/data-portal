import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Autocomplete,
  Chip,
  Alert,
  CircularProgress,
  Stack,
  Card,
  CardContent,
  Link,
} from '@mui/material'
import {
  PlaylistPlus as AddIcon,
  Delete as DeleteIcon,
  Account as OrcidIcon,
} from '../../components/icons'
import { PUBLIC_HTTP_ADDRESS } from '../../config'
import BoundingBoxMap from './bounding-box-map'

const CONTRIBUTOR_TYPES = [
  { value: 'ContactPerson', label: 'Contact Person' },
  { value: 'DataCollector', label: 'Data Collector' },
  { value: 'DataCurator', label: 'Data Curator' },
  { value: 'DataManager', label: 'Data Manager' },
  { value: 'Distributor', label: 'Distributor' },
  { value: 'Editor', label: 'Editor' },
  { value: 'HostingInstitution', label: 'Hosting Institution' },
  { value: 'Producer', label: 'Producer' },
  { value: 'ProjectLeader', label: 'Project Leader' },
  { value: 'ProjectManager', label: 'Project Manager' },
  { value: 'ProjectMember', label: 'Project Member' },
  { value: 'RegistrationAgency', label: 'Registration Agency' },
  { value: 'RegistrationAuthority', label: 'Registration Authority' },
  { value: 'RelatedPerson', label: 'Related Person' },
  { value: 'Researcher', label: 'Researcher' },
  { value: 'ResearchGroup', label: 'Research Group' },
  { value: 'RightsHolder', label: 'Rights Holder' },
  { value: 'Sponsor', label: 'Sponsor' },
  { value: 'Supervisor', label: 'Supervisor' },
  { value: 'WorkPackageLeader', label: 'Work Package Leader' },
  { value: 'Other', label: 'Other' },
]

const FUNDER_ID_TYPES = ['', 'ISNI', 'GRID', 'Crossref Funder ID', 'ROR', 'Other']

const RELATIONSHIP_TYPES = [
  { value: '', label: '-- Select --' },
  { value: 'IsCitedBy', label: 'Is Cited By' },
  { value: 'Cites', label: 'Cites' },
  { value: 'IsSupplementTo', label: 'Is Supplement To' },
  { value: 'IsSupplementedBy', label: 'Is Supplemented By' },
  { value: 'IsContinuedBy', label: 'Is Continued By' },
  { value: 'Continues', label: 'Continues' },
  { value: 'IsDescribedBy', label: 'Is Described By' },
  { value: 'Describes', label: 'Describes' },
  { value: 'HasMetadata', label: 'Has Metadata' },
  { value: 'IsMetadataFor', label: 'Is Metadata For' },
  { value: 'HasVersion', label: 'Has Version' },
  { value: 'IsVersionOf', label: 'Is Version Of' },
  { value: 'IsNewVersionOf', label: 'Is New Version Of' },
  { value: 'IsPreviousVersionOf', label: 'Is Previous Version Of' },
  { value: 'IsPartOf', label: 'Is Part Of' },
  { value: 'HasPart', label: 'Has Part' },
  { value: 'IsPublishedIn', label: 'Is Published In' },
  { value: 'IsReferencedBy', label: 'Is Referenced By' },
  { value: 'References', label: 'References' },
  { value: 'IsDocumentedBy', label: 'Is Documented By' },
  { value: 'Documents', label: 'Documents' },
  { value: 'IsCompiledBy', label: 'Is Compiled By' },
  { value: 'Compiles', label: 'Compiles' },
  { value: 'IsVariantFormOf', label: 'Is Variant Form Of' },
  { value: 'IsOriginalFormOf', label: 'Is Original Form Of' },
  { value: 'IsIdenticalTo', label: 'Is Identical To' },
  { value: 'IsReviewedBy', label: 'Is Reviewed By' },
  { value: 'Reviews', label: 'Reviews' },
  { value: 'IsDerivedFrom', label: 'Is Derived From' },
  { value: 'IsSourceOf', label: 'Is Source Of' },
  { value: 'IsRequiredBy', label: 'Is Required By' },
  { value: 'Requires', label: 'Requires' },
  { value: 'IsObsoletedBy', label: 'Is Obsoleted By' },
  { value: 'Obsoletes', label: 'Obsoletes' },
]

const LICENSES = [
  {
    value: 'https://creativecommons.org/licenses/by/4.0/',
    label: 'Attribution 4.0 International (CC BY 4.0)',
  },
  {
    value: 'https://creativecommons.org/licenses/by-sa/4.0/',
    label: 'Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
  },
  { value: 'Embargo', label: 'Embargo' },
  { value: 'Other', label: 'Other' },
]

export default ({ initialValues, onSubmit, onCancel, isSaving }) => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    methods: '',
    keywords: [],
    instruments: [],
    creators: [{ orcid: '', first_name: '', last_name: '', affiliation_name: '' }],
    contributors: [
      {
        orcid: '',
        first_name: '',
        last_name: '',
        affiliation_name: '',
        contributor_type: 'ContactPerson',
        email: '',
      },
    ],
    location_name: '',
    geographic_extent: {
      east_bound_longitude: '',
      north_bound_latitude: '',
      south_bound_latitude: '',
      west_bound_longitude: '',
      point_latitude: '',
      point_longitude: '',
    },
    spatial_resolution: '',
    reference_system: '',
    vertical_extent: { height: '', depth: '', measurement: '' },
    date_range: { start_date: '', end_date: '' },
    project: [''],
    related_identifiers: [{ related_identifier: '', relationship_type: '' }],
    funding_reference: [
      {
        funder_name: '',
        funder_identifier: '',
        funder_identifier_type: '',
        award_number: '',
        award_title: '',
      },
    ],
    license: {
      license: 'https://creativecommons.org/licenses/by/4.0/',
      embargo_reason: '',
      other_text: '',
    },
  })

  const [scienceKeywordsOptions, setScienceKeywordsOptions] = useState([])
  const [instrumentsOptions, setInstrumentsOptions] = useState([])
  const [loadingKeywords, setLoadingKeywords] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        ...initialValues,
        date_range: initialValues.date_range || prev.date_range,
        geographic_extent: initialValues.geographic_extent || prev.geographic_extent,
        vertical_extent: initialValues.vertical_extent || prev.vertical_extent,
        creators: initialValues.creators?.length ? initialValues.creators : prev.creators,
        contributors: initialValues.contributors?.length
          ? initialValues.contributors
          : prev.contributors,
        license: initialValues.license || prev.license,
      }))
    }
  }, [initialValues])

  useEffect(() => {
    setLoadingKeywords(true)
    Promise.all([
      fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/keywords?type=keywords`).then(r => r.json()),
      fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/keywords?type=instruments`).then(r => r.json()),
    ])
      .then(([kw, inst]) => {
        if (Array.isArray(kw)) setScienceKeywordsOptions(kw)
        if (Array.isArray(inst)) setInstrumentsOptions(inst)
      })
      .catch(err => console.error('Error loading GCMD options:', err))
      .finally(() => setLoadingKeywords(false))
  }, [])

  const [fieldErrors, setFieldErrors] = useState({})

  const clearFieldError = key => {
    setFieldErrors(prev => {
      if (!prev[key]) return prev
      const copy = { ...prev }
      delete copy[key]
      return copy
    })
  }

  const handleChange = (field, value) => {
    clearFieldError(field)
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (parent, field, value) => {
    clearFieldError(`${parent}.${field}`)
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }))
  }

  const handleItemChange = (listName, index, field, value) => {
    clearFieldError(`${listName}-${index}-${field}`)
    setFormData(prev => {
      const updated = [...prev[listName]]
      if (typeof updated[index] === 'object' && updated[index] !== null) {
        updated[index] = { ...updated[index], [field]: value }
      } else {
        updated[index] = value
      }
      return { ...prev, [listName]: updated }
    })
  }

  const handleAddItem = (listName, defaultObj) => {
    setFormData(prev => ({
      ...prev,
      [listName]: [...prev[listName], defaultObj],
    }))
  }

  const [orcidLoading, setOrcidLoading] = useState({})
  const [orcidError, setOrcidError] = useState({})

  const handleOrcidBlur = (listName, index) => {
    const item = formData[listName][index]
    const rawValue = (item.orcid || '').trim()
    const key = `${listName}-${index}`

    if (!rawValue) {
      setOrcidError(prev => ({ ...prev, [key]: null }))
      return
    }

    const idMatch = rawValue.match(/(\d{4}-){3}\d{3}[\dX]$/)
    if (!idMatch) {
      setOrcidError(prev => ({
        ...prev,
        [key]: 'Invalid ORCID format. Expected format: 0000-0000-0000-0000',
      }))
      return
    }

    const orcidId = idMatch[0]
    const fullUrl = `https://orcid.org/${orcidId}`

    if (item.orcid !== fullUrl) {
      handleItemChange(listName, index, 'orcid', fullUrl)
    }

    setOrcidError(prev => ({ ...prev, [key]: null }))
    setOrcidLoading(prev => ({ ...prev, [key]: true }))

    fetch(`${PUBLIC_HTTP_ADDRESS}/submissions/orcid/${orcidId}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('ORCID record not found. Please check the identifier.')
          }
          throw new Error('Failed to fetch ORCID profile. Please fill in details manually.')
        }
        return res.json()
      })
      .then(data => {
        if (data.error) throw new Error(data.error)

        setFormData(prev => {
          const list = [...prev[listName]]
          const target = { ...list[index] }

          if (data.givenNames) target.first_name = data.givenNames
          if (data.familyName) target.last_name = data.familyName

          const primaryEmployment = data.employments?.[0]
          if (primaryEmployment?.organizationName) {
            target.affiliation_name = primaryEmployment.organizationName
          }

          list[index] = target
          return { ...prev, [listName]: list }
        })
      })
      .catch(err => {
        setOrcidError(prev => ({
          ...prev,
          [key]: err.message,
        }))
      })
      .finally(() => {
        setOrcidLoading(prev => ({ ...prev, [key]: false }))
      })
  }

  const handleRemoveItem = (listName, index) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errors = {}

    if (!formData.title || !formData.title.trim()) {
      errors.title = 'Dataset Title is required.'
    }
    if (!formData.abstract || !formData.abstract.trim()) {
      errors.abstract = 'Dataset Abstract is required.'
    }
    if (!formData.keywords || formData.keywords.length === 0) {
      errors.keywords = 'At least one Keyword is required.'
    }
    if (!formData.date_range?.start_date) {
      errors['date_range.start_date'] = 'Start date is required.'
    }
    if (!formData.date_range?.end_date) {
      errors['date_range.end_date'] = 'End date is required.'
    }

    formData.creators?.forEach((c, index) => {
      if (!c.affiliation_name || !c.affiliation_name.trim()) {
        errors[`creators-${index}-affiliation_name`] = 'Affiliation is required.'
      }
    })

    formData.contributors?.forEach((c, index) => {
      if (c.contributor_type === 'ContactPerson' && (!c.email || !c.email.trim())) {
        errors[`contributors-${index}-email`] = 'Email is required for Contact Person.'
      }
      if (!c.affiliation_name || !c.affiliation_name.trim()) {
        errors[`contributors-${index}-affiliation_name`] = 'Affiliation is required.'
      }
    })

    if (
      formData.license?.license === 'Embargo' &&
      (!formData.license?.embargo_reason || !formData.license?.embargo_reason.trim())
    ) {
      errors['license.embargo_reason'] = 'An Embargo Reason is required when Embargo is selected.'
    }
    if (
      formData.license?.license === 'Other' &&
      (!formData.license?.other_text || !formData.license?.other_text.trim())
    ) {
      errors['license.other_text'] = 'Please specify the license details.'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setErrorMsg('Please correct the highlighted fields with red outlines below.')
      return
    }

    setFieldErrors({})
    setErrorMsg(null)
    onSubmit(formData)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, pb: 6 }}>
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Stack spacing={4}>
        {/* ================================================================= */}
        {/* SUBHEADING 1: REQUIRED FIELDS (COMPULSORY)                       */}
        {/* ================================================================= */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: 'rgba(18, 24, 38, 0.75)',
            backdropFilter: 'blur(8px)',
            borderLeft: '6px solid #42a5f5',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
            <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              Required Fields
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            The following fields are compulsory and must be completed to submit the dataset.
          </Typography>
        </Box>

        {/* 1. GENERAL INFORMATION (TITLE & ABSTRACT) */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            1. General Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Dataset Title"
                value={formData.title}
                onChange={e => handleChange('title', e.target.value)}
                error={Boolean(fieldErrors.title)}
                helperText={fieldErrors.title}
                placeholder="Title of the dataset"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="Dataset Abstract"
                value={formData.abstract}
                onChange={e => handleChange('abstract', e.target.value)}
                error={Boolean(fieldErrors.abstract)}
                helperText={
                  fieldErrors.abstract ||
                  'Description of the dataset. The Abstract should include enough detail to fully explain the context of the dataset.'
                }
                placeholder="Description of the dataset."
              />
            </Grid>
          </Grid>
        </Paper>

        {/* 2. KEYWORDS */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            2. Keywords
          </Typography>
          <Typography variant="caption" color="textSecondary" display="block" mb={2}>
            Select applicable keywords from a fixed vocabulary of earth science topics. Start typing
            to see the available list.
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={scienceKeywordsOptions}
                loading={loadingKeywords}
                value={formData.keywords}
                onChange={(_, newValue) => handleChange('keywords', newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    required={formData.keywords.length === 0}
                    error={Boolean(fieldErrors.keywords)}
                    helperText={fieldErrors.keywords}
                    label="Keywords (GCMD Science Keywords)"
                    placeholder="Search keywords..."
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingKeywords ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* 3. TEMPORAL COVERAGE */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            3. Temporal Coverage
          </Typography>
          <Typography variant="caption" color="textSecondary" display="block" mb={2}>
            Time period covered by the content of the dataset. Use today's date if you are unsure of
            the time period covered.
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Temporal Start Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date_range.start_date}
                onChange={e => handleNestedChange('date_range', 'start_date', e.target.value)}
                error={Boolean(fieldErrors['date_range.start_date'])}
                helperText={fieldErrors['date_range.start_date']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Temporal End Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date_range.end_date}
                onChange={e => handleNestedChange('date_range', 'end_date', e.target.value)}
                error={Boolean(fieldErrors['date_range.end_date'])}
                helperText={fieldErrors['date_range.end_date']}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* 4. CREATORS */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" color="primary">
              4. Creators
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              size="small"
              onClick={() =>
                handleAddItem('creators', {
                  orcid: '',
                  first_name: '',
                  last_name: '',
                  affiliation_name: '',
                })
              }
            >
              Add Creator
            </Button>
          </Box>
          <Typography variant="caption" color="textSecondary" display="block" mb={2}>
            The main researchers or organisations involved in producing the data. Tip: If you fill
            in your ORCID ID the subsequent fields will auto-populate.
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            {formData.creators.map((creator, index) => (
              <Card variant="outlined" key={index}>
                <CardContent sx={{ pb: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Creator #{index + 1}
                    </Typography>
                    {formData.creators.length > 1 && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveItem('creators', index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        size="small"
                        label="ORCID iD"
                        value={creator.orcid}
                        onChange={e => handleItemChange('creators', index, 'orcid', e.target.value)}
                        onBlur={() => handleOrcidBlur('creators', index)}
                        error={Boolean(orcidError[`creators-${index}`])}
                        helperText={orcidError[`creators-${index}`]}
                        placeholder="0000-0002-1825-0097"
                        InputProps={{
                          endAdornment: orcidLoading[`creators-${index}`] ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : null,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        size="small"
                        label="First Name"
                        value={creator.first_name}
                        onChange={e =>
                          handleItemChange('creators', index, 'first_name', e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Last Name"
                        value={creator.last_name}
                        onChange={e =>
                          handleItemChange('creators', index, 'last_name', e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        label="Affiliation"
                        value={creator.affiliation_name}
                        onChange={e =>
                          handleItemChange('creators', index, 'affiliation_name', e.target.value)
                        }
                        error={Boolean(fieldErrors[`creators-${index}-affiliation_name`])}
                        helperText={fieldErrors[`creators-${index}-affiliation_name`]}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>

        {/* 5. CONTRIBUTORS */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" color="primary">
              5. Contributors
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              size="small"
              onClick={() =>
                handleAddItem('contributors', {
                  orcid: '',
                  first_name: '',
                  last_name: '',
                  affiliation_name: '',
                  contributor_type: 'ContactPerson',
                  email: '',
                })
              }
            >
              Add Contributor
            </Button>
          </Box>
          <Typography variant="caption" color="textSecondary" display="block" mb={2}>
            Other parties who contributed to the data, including a contact person. Tip: If you fill
            in your ORCID ID the subsequent fields will auto-populate.
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            {formData.contributors.map((contrib, index) => (
              <Card variant="outlined" key={index}>
                <CardContent sx={{ pb: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Contributor #{index + 1}
                    </Typography>
                    {formData.contributors.length > 1 && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveItem('contributors', index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Contributor Type</InputLabel>
                        <Select
                          value={contrib.contributor_type}
                          label="Contributor Type"
                          onChange={e =>
                            handleItemChange(
                              'contributors',
                              index,
                              'contributor_type',
                              e.target.value
                            )
                          }
                        >
                          {CONTRIBUTOR_TYPES.map(ct => (
                            <MenuItem key={ct.value} value={ct.value}>
                              {ct.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        required={contrib.contributor_type === 'ContactPerson'}
                        size="small"
                        label="Email"
                        value={contrib.email}
                        onChange={e =>
                          handleItemChange('contributors', index, 'email', e.target.value)
                        }
                        error={Boolean(fieldErrors[`contributors-${index}-email`])}
                        helperText={fieldErrors[`contributors-${index}-email`]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        label="Affiliation"
                        value={contrib.affiliation_name}
                        onChange={e =>
                          handleItemChange(
                            'contributors',
                            index,
                            'affiliation_name',
                            e.target.value
                          )
                        }
                        error={Boolean(fieldErrors[`contributors-${index}-affiliation_name`])}
                        helperText={fieldErrors[`contributors-${index}-affiliation_name`]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="First Name"
                        value={contrib.first_name}
                        onChange={e =>
                          handleItemChange('contributors', index, 'first_name', e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Last Name"
                        value={contrib.last_name}
                        onChange={e =>
                          handleItemChange('contributors', index, 'last_name', e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="ORCID iD"
                        value={contrib.orcid}
                        onChange={e =>
                          handleItemChange('contributors', index, 'orcid', e.target.value)
                        }
                        onBlur={() => handleOrcidBlur('contributors', index)}
                        error={Boolean(orcidError[`contributors-${index}`])}
                        helperText={orcidError[`contributors-${index}`]}
                        placeholder="0000-0002-1825-0097"
                        InputProps={{
                          endAdornment: orcidLoading[`contributors-${index}`] ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : null,
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>

        {/* ================================================================= */}
        {/* SUBHEADING 2: RECOMMENDED FIELDS (OPTIONAL)                      */}
        {/* ================================================================= */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: 'rgba(18, 24, 38, 0.75)',
            backdropFilter: 'blur(8px)',
            borderLeft: '6px solid #42a5f5',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            mt: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
            <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              Recommended Fields
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            The following fields are optional but recommended to provide richer metadata for your
            dataset.
          </Typography>
        </Box>

        {/* 6. METHODOLOGY & INSTRUMENTS */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            6. Methodology & Instruments
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Methodology"
                value={formData.methods}
                onChange={e => handleChange('methods', e.target.value)}
                helperText="Detailed provenance on how the dataset was produced including methods applied."
                placeholder="Detailed provenance on how the dataset was produced"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={instrumentsOptions}
                loading={loadingKeywords}
                value={formData.instruments}
                onChange={(_, newValue) => handleChange('instruments', newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Instruments (GCMD Instruments)"
                    helperText="Type in the instrument used, if applicable, and it will provide a list of available keywords."
                    placeholder="Search instruments..."
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* 7. SPATIAL COVERAGE & EXTENT */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            7. Spatial Coverage & Extent
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Geographic Location Name"
                value={formData.location_name}
                onChange={e => handleChange('location_name', e.target.value)}
                helperText="Name of the place covered by the dataset."
                placeholder="Name of place or region covered by the dataset"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom fontWeight="bold">
                Geographic Extent
              </Typography>
              <BoundingBoxMap
                extentData={formData.geographic_extent}
                onChange={newExtent =>
                  setFormData(prev => ({
                    ...prev,
                    geographic_extent: { ...prev.geographic_extent, ...newExtent },
                  }))
                }
              />
            </Grid>

            {/* BOUNDING BOX COORDINATES */}
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="North Lat"
                value={formData.geographic_extent.north_bound_latitude}
                onChange={e =>
                  handleNestedChange('geographic_extent', 'north_bound_latitude', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="South Lat"
                value={formData.geographic_extent.south_bound_latitude}
                onChange={e =>
                  handleNestedChange('geographic_extent', 'south_bound_latitude', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="East Long"
                value={formData.geographic_extent.east_bound_longitude}
                onChange={e =>
                  handleNestedChange('geographic_extent', 'east_bound_longitude', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="West Long"
                value={formData.geographic_extent.west_bound_longitude}
                onChange={e =>
                  handleNestedChange('geographic_extent', 'west_bound_longitude', e.target.value)
                }
              />
            </Grid>

            {/* POINT COORDINATES */}
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Point Latitude"
                value={formData.geographic_extent.point_latitude}
                onChange={e =>
                  handleNestedChange('geographic_extent', 'point_latitude', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Point Longitude"
                value={formData.geographic_extent.point_longitude}
                onChange={e =>
                  handleNestedChange('geographic_extent', 'point_longitude', e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Spatial Resolution"
                value={formData.spatial_resolution}
                onChange={e => handleChange('spatial_resolution', e.target.value)}
                helperText="Provide the spatial resolution for the dataset - this is only applicable to grid or imagery data."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Reference System"
                value={formData.reference_system}
                onChange={e => handleChange('reference_system', e.target.value)}
                helperText="Provide the spatial or coordinate reference system used in the data submission - this is only applicable to projection data, eg WGS84."
                placeholder="e.g. WGS84"
              />
            </Grid>

            {/* VERTICAL EXTENT */}
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
                fontWeight="bold"
                mt={1}
              >
                Vertical Extent
              </Typography>
              <Typography variant="caption" color="textSecondary" display="block" mb={2}>
                Altitude and depth of the features described in the data submission, as well as
                measurement used, eg. Mean Sea Level.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Height / Altitude"
                    value={formData.vertical_extent.height}
                    onChange={e => handleNestedChange('vertical_extent', 'height', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Depth"
                    value={formData.vertical_extent.depth}
                    onChange={e => handleNestedChange('vertical_extent', 'depth', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Measurement Unit"
                    value={formData.vertical_extent.measurement}
                    onChange={e =>
                      handleNestedChange('vertical_extent', 'measurement', e.target.value)
                    }
                    placeholder="e.g. Mean Sea Level"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* 8. PROJECTS, IDENTIFIERS & FUNDING */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            8. Projects, Identifiers & Funding
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* PROJECTS */}
          <Box mb={4}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1">Projects</Typography>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                size="small"
                onClick={() => handleAddItem('project', '')}
              >
                Add Project
              </Button>
            </Box>
            <Typography variant="caption" color="textSecondary" display="block" mb={2}>
              Project or collection that this dataset falls under, if applicable.
            </Typography>
            <Stack spacing={1}>
              {formData.project.map((proj, idx) => (
                <Box display="flex" gap={1} key={idx}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Project or collection name"
                    value={proj}
                    onChange={e => handleItemChange('project', idx, null, e.target.value)}
                  />
                  {formData.project.length > 1 && (
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleRemoveItem('project', idx)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* FUNDING REFERENCES */}
          <Box mb={4}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1">Funding References</Typography>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                size="small"
                onClick={() =>
                  handleAddItem('funding_reference', {
                    funder_name: '',
                    funder_identifier: '',
                    funder_identifier_type: '',
                    award_number: '',
                    award_title: '',
                  })
                }
              >
                Add Funding Reference
              </Button>
            </Box>
            <Stack spacing={2}>
              {formData.funding_reference.map((fund, idx) => (
                <Card variant="outlined" key={idx}>
                  <CardContent sx={{ pb: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Funder #{idx + 1}
                      </Typography>
                      {formData.funding_reference.length > 1 && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveItem('funding_reference', idx)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Funder Name"
                          value={fund.funder_name}
                          onChange={e =>
                            handleItemChange(
                              'funding_reference',
                              idx,
                              'funder_name',
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Funder Identifier"
                          value={fund.funder_identifier}
                          onChange={e =>
                            handleItemChange(
                              'funding_reference',
                              idx,
                              'funder_identifier',
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Funder ID Type</InputLabel>
                          <Select
                            value={fund.funder_identifier_type}
                            label="Funder ID Type"
                            onChange={e =>
                              handleItemChange(
                                'funding_reference',
                                idx,
                                'funder_identifier_type',
                                e.target.value
                              )
                            }
                          >
                            {FUNDER_ID_TYPES.map(t => (
                              <MenuItem key={t} value={t}>
                                {t || '-- Select --'}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Award Number"
                          value={fund.award_number}
                          onChange={e =>
                            handleItemChange(
                              'funding_reference',
                              idx,
                              'award_number',
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Award Title"
                          value={fund.award_title}
                          onChange={e =>
                            handleItemChange(
                              'funding_reference',
                              idx,
                              'award_title',
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* RELATED IDENTIFIERS */}
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1">Related Resources</Typography>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                size="small"
                onClick={() =>
                  handleAddItem('related_identifiers', {
                    related_identifier: '',
                    relationship_type: '',
                  })
                }
              >
                Add Related Resource
              </Button>
            </Box>
            <Typography variant="caption" color="textSecondary" display="block" mb={2}>
              Include links or DOIs for related resources and choose the relationship type.
            </Typography>
            <Stack spacing={2}>
              {formData.related_identifiers.map((rel, idx) => (
                <Box display="flex" gap={2} alignItems="center" key={idx}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Related Resource (DOI or URL)"
                    value={rel.related_identifier}
                    onChange={e =>
                      handleItemChange(
                        'related_identifiers',
                        idx,
                        'related_identifier',
                        e.target.value
                      )
                    }
                  />
                  <FormControl size="small" sx={{ minWidth: 240, maxWidth: 320 }}>
                    <InputLabel>Relationship Type</InputLabel>
                    <Select
                      value={rel.relationship_type}
                      label="Relationship Type"
                      onChange={e =>
                        handleItemChange(
                          'related_identifiers',
                          idx,
                          'relationship_type',
                          e.target.value
                        )
                      }
                    >
                      {RELATIONSHIP_TYPES.map(rt => (
                        <MenuItem key={rt.value} value={rt.value}>
                          {rt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formData.related_identifiers.length > 1 && (
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleRemoveItem('related_identifiers', idx)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Paper>

        {/* 9. LICENSE CONDITION */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            9. License Condition
          </Typography>
          <Typography variant="caption" color="textSecondary" display="block" mb={2}>
            Conditions under which the dataset should be shared. Read more about Creative Commons
            licenses{' '}
            <Link
              href="https://creativecommons.org/chooser/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              here
            </Link>
            .
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>License</InputLabel>
                <Select
                  value={formData.license.license}
                  label="License"
                  onChange={e => handleNestedChange('license', 'license', e.target.value)}
                >
                  {LICENSES.map(lic => (
                    <MenuItem key={lic.value} value={lic.value}>
                      {lic.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {formData.license.license === 'Embargo' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  size="small"
                  label="Embargo Reason"
                  value={formData.license.embargo_reason}
                  onChange={e => handleNestedChange('license', 'embargo_reason', e.target.value)}
                  error={Boolean(fieldErrors['license.embargo_reason'])}
                  helperText={fieldErrors['license.embargo_reason']}
                />
              </Grid>
            )}

            {formData.license.license === 'Other' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  size="small"
                  label="Specify Other License"
                  value={formData.license.other_text}
                  onChange={e => handleNestedChange('license', 'other_text', e.target.value)}
                  error={Boolean(fieldErrors['license.other_text'])}
                  helperText={fieldErrors['license.other_text']}
                />
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* SUBMIT BUTTONS */}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button variant="contained" size="large" type="submit" disabled={isSaving}>
            {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Save Metadata & Continue'}
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
