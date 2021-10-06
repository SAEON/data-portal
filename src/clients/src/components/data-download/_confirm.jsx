import { useContext, useState, memo } from 'react'
import RegisterEventLog from '../../components/application-logger/register-event-log'
import packageJson from '../../../package.json'
import { LATEST_COMMIT } from '../../config'
import useTheme from '@material-ui/core/styles/useTheme'
import { context as globalContext } from '../../contexts/global'
import { gql, useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button'

export default memo(({ id, doi, setOpen, downloadURL, resourceDescription, form, disabled }) => {
  const [ref, setRef] = useState(null)
  const { global } = useContext(globalContext)
  const { referrer } = global
  const theme = useTheme()

  const [submitDataDownloadForm] = useMutation(
    gql`
      mutation ($input: DataDownloadFormSubmission!) {
        submitDataDownloadForm(input: $input)
      }
    `
  )

  return (
    <span ref={el => setRef(el)}>
      {ref && (
        <RegisterEventLog
          event="click"
          target={ref}
          handle={e => {
            e.stopPropagation()
            console.gql({
              clientVersion: packageJson.version,
              type: 'download',
              referrer,
              commitHash: LATEST_COMMIT,
              createdAt: new Date(),
              info: {
                pathname: window.location.pathname,
                uri: downloadURL,
                odpId: id,
                doi,
              },
            })

            const _form = {
              recordId: doi || id,
              ...Object.fromEntries(
                Object.entries(form.current).map(([field, value]) => [
                  field,
                  value === '' ? null : value,
                ])
              ),
            }
            if (_form.emailAddress || _form.organization) {
              submitDataDownloadForm({
                variables: {
                  input: { ..._form },
                },
              })
            }

            setOpen(false)
          }}
        >
          <Button
            size="small"
            variant="text"
            disabled={disabled}
            download={resourceDescription || 'Unknown resource'}
            style={{ display: 'block', float: 'right', margin: theme.spacing(2) }}
            href={downloadURL}
            aria-label="Agree to terms and download resource"
            target="_blank"
            rel="noopener noreferrer"
          >
            I AGREE TO THE TERMS OF USE
          </Button>
        </RegisterEventLog>
      )}
    </span>
  )
})
