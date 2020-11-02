import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { CATALOGUE_CLIENT_DEFAULT_NOTICES } from '../../config'

/**
 * Example of a notice:
 * CATALOGUE_CLIENT_DEFAULT_NOTICES=Some message,warning;Some other message,info
 */
export default ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const _ = async () => {
      for (const { msg, variant } of CATALOGUE_CLIENT_DEFAULT_NOTICES.split(';')
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
    _()
  })

  return children
}
