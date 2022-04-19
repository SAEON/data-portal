import { useEffect, useContext } from 'react'
import { useSnackbar } from 'notistack'
import { CLIENTS_DEFAULT_NOTICES } from '../../config'
import getUriState from '../../lib/fns/get-uri-state'
import { context as authContext } from '../../contexts/authentication'

/**
 * Example of a notice:
 * CLIENTS_DEFAULT_NOTICES=Some message,warning;Some other message,info
 */
export default ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { disableNotices } = getUriState()
  const { user } = useContext(authContext)

  useEffect(() => {
    if (!user) return

    if (disableNotices !== 'true') {
      enqueueSnackbar(`Welcome back ${user.name || user.emailAddress}`, { variant: 'info' })
    }
  }, [disableNotices, enqueueSnackbar, user])

  useEffect(() => {
    const _ = async () => {
      for (const { msg, variant } of CLIENTS_DEFAULT_NOTICES.split(';')
        .filter(_ => _)
        .map(str => {
          const [msg, variant] = str.split(',').map(s => s.trim())
          return {
            msg,
            variant,
          }
        })) {
        enqueueSnackbar(msg, {
          variant,
        })
        await new Promise(res => setTimeout(res, 250))
      }
    }
    if (disableNotices !== 'true') {
      _()
    }
  }, [disableNotices, enqueueSnackbar])

  return children
}
