import React, { useState, useEffect, createContext } from 'react'
import { Alert } from '@material-ui/lab'
import { Typography } from '@material-ui/core'

export const FeedbackContext = createContext()

export default ({
  children,
  defaultInfo = null,
  defaultWarning = null,
  defaultError = null,
  defaultSuccess = null,
}) => {
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const [info, setInfo] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (defaultError) setError(defaultError)
    if (defaultWarning) setWarning(defaultWarning)
    if (defaultInfo) setInfo(defaultInfo)
    if (defaultSuccess) setSuccess(defaultSuccess)
  }, [])

  return (
    <FeedbackContext.Provider
      value={{
        setError,
        setInfo,
        setWarning,
      }}
    >
      {error ? (
        <Alert onClose={() => setError(null)} severity="error">
          <Typography>{typeof error === 'string' ? error : JSON.stringify(error)}</Typography>
        </Alert>
      ) : null}

      {warning ? (
        <Alert onClose={() => setWarning(null)} severity="warning">
          <Typography>{typeof warning === 'string' ? warning : JSON.stringify(warning)}</Typography>
        </Alert>
      ) : null}

      {info ? (
        <Alert onClose={() => setInfo(null)} severity="info">
          <Typography>{typeof info === 'string' ? info : JSON.stringify(info)}</Typography>
        </Alert>
      ) : null}

      {success ? (
        <Alert onClose={() => setSuccess(null)} severity="success">
          <Typography>{typeof success === 'string' ? success : JSON.stringify(success)}</Typography>
        </Alert>
      ) : null}

      {children}
    </FeedbackContext.Provider>
  )
}
