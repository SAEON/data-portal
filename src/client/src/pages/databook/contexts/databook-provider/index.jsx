import { createContext } from 'react'
import CheckStatus from './_check-status'
import Typography from '@material-ui/core/Typography'
import { CATALOGUE_TECHNICAL_CONTACT } from '../../../../config'
import useTheme from '@material-ui/core/styles/useTheme'
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
              style={{ padding: theme.spacing(2), backgroundColor: theme.backgroundColor }}
            >
              <Typography>
                Error preparing data. Please send the message below to a system administrator (
                {CATALOGUE_TECHNICAL_CONTACT})
              </Typography>
              <pre className={clsx(classes.pre)}>
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
