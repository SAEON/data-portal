import { createContext } from 'react'
import CheckStatus from './_check-status'
import Typography from '@mui/material/Typography'
import { TECHNICAL_CONTACT } from '../../../../config'
import { alpha, styled } from '@mui/material/styles'

const Layout = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.9),
}))

const Pre = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[200]}`,
  whiteSpace: 'pre-wrap',
  padding: theme.spacing(1),
  wordBreak: 'break-word',
}))

export const context = createContext()

export default ({ children, id }) => {
  return (
    <CheckStatus id={id}>
      {({ errors, databook }) => {
        if (errors.length) {
          return (
            <Layout>
              <Typography>
                Error preparing data. Please send the message below to a system administrator (
                {TECHNICAL_CONTACT})
              </Typography>
              <Pre>
                {JSON.stringify(
                  {
                    message: 'Error creating databook',
                    uri: window.location,
                    errors,
                  },
                  null,
                  2
                )}
              </Pre>
            </Layout>
          )
        }

        return <context.Provider value={databook}>{children}</context.Provider>
      }}
    </CheckStatus>
  )
}
