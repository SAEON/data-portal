import { useContext, useState, memo } from 'react'
import RegisterEventLog from '../application-logger/register-event-log'
import packageJson from '../../../package.json'
import { useTheme } from '@mui/material/styles'
import { context as referrerContext } from '../../contexts/referrer'
import { gql, useMutation } from '@apollo/client'
import Button from '@mui/material/Button'

export default memo(
  ({ formFields, id, doi, setOpen, downloadURL, resourceDescription, form, disabled }) => {
    const [ref, setRef] = useState(null)
    const { referrer } = useContext(referrerContext)
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
                  Object.entries(form.current)
                    .map(([field, value]) => [
                      field,
                      value === ''
                        ? null
                        : field === 'student'
                        ? value === 'NA'
                          ? null
                          : value === 'Yes'
                          ? true
                          : false
                        : field === 'ageGroup'
                        ? value === 'None'
                          ? null
                          : value
                        : value,
                    ])
                    .filter(([, value]) => value !== null)
                ),
              }

              const shouldSubmit = Object.entries(formFields).reduce((a, [field]) => {
                if (field === 'recordId') {
                  return a
                }

                if (field === 'ageGroup' && _form[field] === 'None') {
                  return a
                }

                if (field === 'student') {
                  if (_form[field] === true || _form[field] === false) {
                    return true
                  }
                }

                return a || Boolean(_form[field])
              }, false)

              if (shouldSubmit) {
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
              download={resourceDescription || downloadURL || 'Unknown resource'}
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
  }
)
