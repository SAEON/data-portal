import { useState, memo } from 'react'
import { RegisterEventLog, makeLog } from '../application-logger'
import { gql, useMutation } from '@apollo/client'
import Button from '@mui/material/Button'
import { Span } from '../../components/html-tags'

export default memo(
  ({ formFields, id, doi, setOpen, downloadURL, resourceDescription, form, disabled }) => {
    const [ref, setRef] = useState(null)

    const [submitDataDownloadForm] = useMutation(
      gql`
        mutation ($input: DataDownloadFormSubmission!) {
          submitDataDownloadForm(input: $input)
        }
      `
    )

    return (
      <Span ref={el => setRef(el)}>
        {ref && (
          <RegisterEventLog
            event="click"
            target={ref}
            handle={e => {
              e.stopPropagation()

              console.gql(
                makeLog('download', {
                  uri: downloadURL,
                  odpId: id,
                  doi,
                })
              )

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
              sx={{ display: 'block', float: 'right', margin: 2 }}
              href={downloadURL}
              aria-label="Agree to terms and download resource"
              target="_blank"
              rel="noopener noreferrer"
            >
              I AGREE TO THE TERMS OF USE
            </Button>
          </RegisterEventLog>
        )}
      </Span>
    )
  }
)
