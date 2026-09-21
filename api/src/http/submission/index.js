import { ODP_API, ORCID_BASE_URL, ORCID_API_KEY } from '../../config/index.js'
import authenticateWithOdp from '../../lib/authenticate-with-odp.js'
import { ObjectId } from 'mongodb'

/**
 * Extract bearer token and saeonId for logged-in user or fallback to client token
 */
async function getAuthToken(ctx) {
  let userId = null
  if (ctx.state && ctx.state.user) {
    userId = ctx.state.user.id || ctx.state.user._id || ctx.state.user
  } else if (ctx.session && ctx.session.passport && ctx.session.passport.user) {
    const pUser = ctx.session.passport.user
    userId = typeof pUser === 'object' ? (pUser.id || pUser._id) : pUser
  }

  if (userId) {
    try {
      const { findUsers } = ctx.mongo.dataFinders
      const queryId = typeof userId === 'string' ? new ObjectId(userId) : userId
      const user = (await findUsers({ _id: queryId }))[0]
      if (user && user.tokenSet && user.tokenSet.access_token) {
        return {
          accessToken: user.tokenSet.access_token,
          saeonId: user.saeonId || user._id.toString(),
        }
      }
    } catch (err) {
      console.warn('Error reading user token from session:', err)
    }
  }

  const clientAuth = await authenticateWithOdp()
  return {
    accessToken: clientAuth.access_token,
    saeonId: null,
  }
}

/**
 * Helper to recursively extract 'value' string properties from NASA CMR JSON
 */
function extractValues(data, keysToExtract = ['value']) {
  const extractedList = []
  if (Array.isArray(data)) {
    for (const item of data) {
      if (typeof item === 'object' && item !== null) {
        extractedList.push(...extractValues(item, keysToExtract))
      }
    }
  } else if (typeof data === 'object' && data !== null) {
    for (const [key, value] of Object.entries(data)) {
      if (keysToExtract.includes(key) && typeof value === 'string') {
        extractedList.push(value)
      }
      if (typeof value === 'object' && value !== null) {
        extractedList.push(...extractValues(value, keysToExtract))
      }
    }
  }
  return extractedList
}

/**
 * Helper to safely parse JSON response or return error text if non-JSON (e.g. HTTP 500 Internal Server Error)
 */
async function parseResponse(res) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { error: text || res.statusText || 'Error from ODP API' }
  }
}

/**
 * Fetch and extract clean NASA CMR keywords
 */
export async function getKeywords(ctx) {
  const { type = 'science_keywords' } = ctx.query
  const allowedTypes = ['science_keywords', 'instruments', 'location_keywords']
  const keywordType = allowedTypes.includes(type) ? type : 'science_keywords'

  try {
    const res = await fetch(`https://cmr.earthdata.nasa.gov/search/keywords/${keywordType}`)
    if (!res.ok) {
      ctx.status = res.status
      ctx.body = { error: `Failed to fetch keywords for ${keywordType}` }
      return
    }
    const data = await res.json()
    const extracted = extractValues(data)
    const cleanOptions = Array.from(new Set(extracted.filter(v => v !== 'NOT APPLICABLE'))).sort()

    ctx.body = cleanOptions
  } catch (error) {
    console.error('Error fetching keywords:', error)
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

/**
 * List User Submissions
 */
export async function listSubmissions(ctx) {
  const { accessToken, saeonId } = await getAuthToken(ctx)
  const page = ctx.query.page || 1
  const userIdParam = saeonId ? `&user_id=${encodeURIComponent(saeonId)}` : ''

  try {
    const res = await fetch(`${ODP_API}/submission/user_submissions?page=${page}${userIdParam}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    ctx.status = res.status
    const body = await parseResponse(res)

    if (res.ok && body) {
      const items = Array.isArray(body) ? body : body.items
      if (Array.isArray(items) && items.length > 0) {
        const detailUserIdParam = saeonId ? `?user_id=${encodeURIComponent(saeonId)}` : ''
        const enrichedItems = await Promise.all(
          items.map(async item => {
            try {
              const detailRes = await fetch(`${ODP_API}/submission/${item.id}${detailUserIdParam}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
              })
              if (detailRes.ok) {
                const detail = await detailRes.json()
                return {
                  ...item,
                  dataset_file_name: detail.dataset_file_name || null,
                  dataset_url: detail.dataset_url || null,
                  data: detail.data || item.data,
                }
              }
            } catch (err) {
              console.warn(`Failed to fetch details for submission ${item.id}:`, err)
            }
            return item
          })
        )

        if (Array.isArray(body)) {
          ctx.body = enrichedItems
        } else {
          ctx.body = { ...body, items: enrichedItems }
        }
        return
      }
    }

    ctx.body = body
  } catch (error) {
    console.error('Error listing submissions:', error)
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

/**
 * Get Single Submission Detail
 */
export async function getSubmission(ctx) {
  const { id } = ctx.params
  const { accessToken, saeonId } = await getAuthToken(ctx)
  const userIdParam = saeonId ? `?user_id=${encodeURIComponent(saeonId)}` : ''

  try {
    const res = await fetch(`${ODP_API}/submission/${id}${userIdParam}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    ctx.status = res.status
    ctx.body = await parseResponse(res)
  } catch (error) {
    console.error(`Error getting submission ${id}:`, error)
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

/**
 * Create Submission
 */
export async function createSubmission(ctx) {
  const { accessToken, saeonId } = await getAuthToken(ctx)

  // Extract metadata dictionary, unwrapping any redundant 'data' wrappers
  let submissionData = ctx.request.body
  while (
    submissionData &&
    typeof submissionData === 'object' &&
    'data' in submissionData &&
    typeof submissionData.data === 'object' &&
    submissionData.data !== null &&
    !Array.isArray(submissionData.data)
  ) {
    submissionData = submissionData.data
  }

  // Expected POST body: { user_id: "<USER_ID>", data: { title: "...", abstract: "..." } }
  const payload = {
    data: submissionData,
    ...(saeonId ? { user_id: saeonId } : {}),
  }

  try {
    const res = await fetch(`${ODP_API}/submission/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    })
    ctx.status = res.status
    ctx.body = await res.json()
  } catch (error) {
    console.error('Error creating submission:', error)
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

/**
 * Update Submission
 */
export async function updateSubmission(ctx) {
  const { id } = ctx.params
  const { accessToken, saeonId } = await getAuthToken(ctx)

  // Extract metadata dictionary, unwrapping any redundant 'data' wrappers
  let submissionData = ctx.request.body
  while (
    submissionData &&
    typeof submissionData === 'object' &&
    'data' in submissionData &&
    typeof submissionData.data === 'object' &&
    submissionData.data !== null &&
    !Array.isArray(submissionData.data)
  ) {
    submissionData = submissionData.data
  }

  // Expected PUT body: metadata dictionary directly at root (NOT wrapped in { data: ... })
  const payload = submissionData

  const userIdParam = saeonId ? `?user_id=${encodeURIComponent(saeonId)}` : ''

  try {
    const res = await fetch(`${ODP_API}/submission/${id}${userIdParam}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    })
    ctx.status = res.status
    ctx.body = await res.json()
  } catch (error) {
    console.error(`Error updating submission ${id}:`, error)
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

/**
 * Set Dataset Link URL
 */
export async function setDatasetUrl(ctx) {
  const { id } = ctx.params
  const { accessToken, saeonId } = await getAuthToken(ctx)
  const datasetUrl = ctx.request.body.dataset_url || ctx.query.dataset_url

  let url = `${ODP_API}/submission/${id}/dataset_url?dataset_url=${encodeURIComponent(datasetUrl)}`
  if (saeonId) {
    url += `&user_id=${encodeURIComponent(saeonId)}`
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    })
    ctx.status = res.status
    ctx.body = await res.json()
  } catch (error) {
    console.error(`Error setting dataset URL for submission ${id}:`, error)
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

/**
 * Helper to read raw request stream into a Buffer
 */
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', err => reject(err))
  })
}

/**
 * Upload dataset file for submission
 */
export async function uploadDataset(ctx) {
  const { id } = ctx.params
  const { accessToken } = await getAuthToken(ctx)

  try {
    const rawBuffer = await getRawBody(ctx.req)
    console.log(`Uploading dataset file for submission ${id}, payload size: ${rawBuffer.length} bytes`)

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }
    if (ctx.headers['content-type']) {
      headers['content-type'] = ctx.headers['content-type']
    }
    if (rawBuffer.length > 0) {
      headers['content-length'] = String(rawBuffer.length)
    }

    const res = await fetch(`${ODP_API}/submission/${id}/upload`, {
      method: 'PUT',
      headers,
      body: rawBuffer,
    })

    console.log(`ODP API upload response for submission ${id}: status ${res.status}`)
    const parsedBody = await parseResponse(res)

    if (!res.ok) {
      console.error(`ODP API upload error (${res.status}):`, parsedBody)
      ctx.status = res.status
      ctx.body =
        typeof parsedBody === 'object' && parsedBody !== null && parsedBody.error
          ? parsedBody
          : { error: typeof parsedBody === 'string' ? parsedBody : `Upload failed with status ${res.status}` }
      return
    }

    ctx.status = res.status
    ctx.body = parsedBody || { success: true }
  } catch (error) {
    console.error(`Error uploading dataset file for submission ${id}:`, error)
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

/**
 * Submit for Curation
 */
export async function submitForCuration(ctx) {
  const { id } = ctx.params
  const { accessToken, saeonId } = await getAuthToken(ctx)
  const userIdParam = saeonId ? `?user_id=${encodeURIComponent(saeonId)}` : ''

  try {
    const res = await fetch(`${ODP_API}/submission/submit/${id}${userIdParam}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    })
    ctx.status = res.status
    ctx.body = await res.json()
  } catch (error) {
    console.error(`Error submitting submission ${id} for curation:`, error)
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

/**
 * Delete Submission
 */
export async function deleteSubmission(ctx) {
  const { id } = ctx.params
  const { accessToken, saeonId } = await getAuthToken(ctx)
  const userIdParam = saeonId ? `?user_id=${encodeURIComponent(saeonId)}` : ''

  try {
    const res = await fetch(`${ODP_API}/submission/${id}${userIdParam}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    ctx.status = res.status
    ctx.body = await res.json()
  } catch (error) {
    console.error(`Error deleting submission ${id}:`, error)
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

/**
 * Fetch ORCID Profile Info using ORCID Public API v3.0
 */
export async function getOrcidInfo(ctx) {
  const { id } = ctx.params
  const orcidMatch = (id || '').match(/(\d{4}-){3}\d{3}[\dX]$/)
  if (!orcidMatch) {
    ctx.status = 400
    ctx.body = { error: 'Invalid ORCID format. Expected format: 0000-0000-0000-0000' }
    return
  }
  const cleanOrcid = orcidMatch[0]

  /* ==========================================================================
     Internal ORCID API endpoint temporarily commented out.
     Uncomment when production server API key/tokens are available.
     ==========================================================================
  const baseOrcidUrl = (ORCID_BASE_URL || 'https://nrf.orcid.org').replace(/\/$/, '')
  const apiKey = ORCID_API_KEY || ''
  if (apiKey) {
    const res = await fetch(`${baseOrcidUrl}/v1.0/Integration/Orcid/GetBasicProfile/${cleanOrcid}`, {
      headers: {
        'X-Api-Key': apiKey,
        Accept: 'application/json',
      },
    })
    if (res.ok) {
      const data = await res.json()
      if (data.success && data.responseResult) {
        ctx.body = data.responseResult
        return
      }
    }
  }
  ========================================================================== */

  try {
    // Fetch directly from public ORCID v3 API (returns person info and employments summary)
    const pubRes = await fetch(`https://pub.orcid.org/v3.0/${cleanOrcid}`, {
      headers: { Accept: 'application/json' },
    })
    if (!pubRes.ok) {
      ctx.status = pubRes.status
      ctx.body = { error: 'ORCID record not found. Please check the identifier.' }
      return
    }

    const pubData = await pubRes.json()
    const givenNames = pubData.person?.name?.['given-names']?.value || ''
    const familyName = pubData.person?.name?.['family-name']?.value || ''

    // Extract latest employment organization name
    const affiliationGroups = pubData['activities-summary']?.employments?.['affiliation-group'] || []
    let organizationName = ''

    for (const group of affiliationGroups) {
      for (const summaryObj of group.summaries || []) {
        const emp = summaryObj['employment-summary']
        if (emp?.organization?.name) {
          organizationName = emp.organization.name
          break
        }
      }
      if (organizationName) break
    }

    ctx.body = {
      givenNames,
      familyName,
      employments: organizationName ? [{ organizationName }] : [],
    }
  } catch (error) {
    console.error(`Error fetching ORCID info for ${cleanOrcid}:`, error)
    ctx.status = 500
    ctx.body = { error: 'Failed to fetch ORCID profile' }
  }
}
