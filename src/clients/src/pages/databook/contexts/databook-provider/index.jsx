import { createContext } from 'react'
import CheckStatus from './_check-status'
import Typography from '@mui/material/Typography'
import { TECHNICAL_CONTACT } from '../../../../config'
import { useTheme, alpha } from '@mui/material/styles'
import clsx from 'clsx'
import useStyles from '../../style'

export const context = createContext()

export default ({ children, id }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <CheckStatus id={id}>
      {({ errors, databook }) => {
        if (errors.length) {
          return (
            <div
              className={clsx(classes.layout)}
              style={{
                padding: theme.spacing(2),
                backgroundColor: alpha(theme.palette.common.white, 0.9),
              }}
            >
              <Typography>
                Error preparing data. Please send the message below to a system administrator (
                {TECHNICAL_CONTACT})
              </Typography>
              <pre
                style={{
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid ${theme.palette.grey[200]}`,
                  whiteSpace: 'pre-wrap',
                  padding: theme.spacing(1),
                  wordBreak: 'break-word',
                }}
              >
                {JSON.stringify(
                  {
                    message: 'Error creating databook',
                    uri: window.location,
                    errors,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )
        }

        return <context.Provider value={databook}>{children}</context.Provider>
      }}
    </CheckStatus>
  )
}
