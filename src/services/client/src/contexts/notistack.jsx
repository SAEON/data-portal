import React from 'react'
import { useSnackbar, SnackbarProvider } from 'notistack'
import { DEFAULT_NOTICES } from '../config'

const DefaultNotices = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()

  const notices = DEFAULT_NOTICES.split(';')
    .filter(_ => _)
    .map(str => {
      const [msg, variant] = str.split(',').map(s => s.trim())
      return {
        msg,
        variant,
      }
    })

  notices.forEach(({ msg, variant }) =>
    enqueueSnackbar(msg, {
      variant,
    })
  )

  return children
}

export default ({ children }) => (
  <SnackbarProvider>
    <DefaultNotices>{children}</DefaultNotices>
  </SnackbarProvider>
)
