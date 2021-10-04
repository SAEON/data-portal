import { useContext, useState } from 'react'
import RegisterEventLog from '../../components/application-logger/register-event-log'
import packageJson from '../../../package.json'
import { LATEST_COMMIT } from '../../config'
import useTheme from '@material-ui/core/styles/useTheme'
import { context as globalContext } from '../../contexts/global'
import Link from '@material-ui/core/Link'

export default ({ id, doi, setOpen, downloadURL, resourceDescription, form }) => {
  const [ref, setRef] = useState(null)
  const { global } = useContext(globalContext)
  const { referrer } = global
  const theme = useTheme()

  return (
    <RegisterEventLog
      event="click"
      target={ref}
      handle={e => {
        console.log(form.current)
        e.stopPropagation()
        console.gql({
          clientVersion: packageJson.version,
          type: 'download',
          referrer,
          commitHash: LATEST_COMMIT,
          createdAt: new Date(),
          info: {
            form: Object.fromEntries(
              Object.entries(form.current).map(([field, value]) => [
                field,
                value === '' ? null : value,
              ])
            ),
            pathname: window.location.pathname,
            uri: downloadURL,
            odpId: id,
            doi,
          },
        })
        setOpen(false)
      }}
    >
      <Link
        ref={el => setRef(el)}
        component={'a'}
        style={{ display: 'block', float: 'right', margin: theme.spacing(2) }}
        download={resourceDescription || 'Unknown resource'}
        href={downloadURL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agree to terms and download resource"
      >
        I AGREE
      </Link>
    </RegisterEventLog>
  )
}
