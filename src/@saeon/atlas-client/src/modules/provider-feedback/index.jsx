import React, { useState, createContext } from 'react'
import { Alert } from '@material-ui/lab'
import { Typography } from '@material-ui/core'

export const FeedbackContext = createContext()

export default ({ children }) => {
  const [error, setError] = useState(false)
  const [info, setInfo] = useState(false)
  return (
    <FeedbackContext.Provider
      value={{
        setError,
        setInfo,
      }}
    >
      {error ? (
        <Alert onClose={() => setError(false)} severity="error">
          <Typography>{typeof error === 'string' ? error : JSON.stringify(error)}</Typography>
        </Alert>
      ) : null}

      {info ? (
        <Alert onClose={() => setInfo(false)} severity="info">
          <Typography>{typeof info === 'string' ? info : JSON.stringify(info)}</Typography>
        </Alert>
      ) : null}

      {children}
    </FeedbackContext.Provider>
  )
}
