import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { DEFAULT_NOTICES } from '../../config'

const notices = DEFAULT_NOTICES.split(';')
  .filter(_ => _)
  .map(str => {
    const [msg, variant] = str.split(',').map(s => s.trim())
    return {
      msg,
      variant,
    }
  })

/**
 * Example of a notice:
 * DEFAULT_NOTICES=Some message,warning
 */
export default ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const _ = async () => {
      for (const { msg, variant } of notices) {
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
