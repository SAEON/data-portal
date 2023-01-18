import { forwardRef } from 'react'
import CookieConsent from 'react-cookie-consent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default ({ children }) => {
  return (
    <>
      <CookieConsent
        overlay={false}
        style={{ zIndex: 2500 }}
        ariaAcceptLabel="Allow cookies"
        ButtonComponent={forwardRef(({ style, ...props }, ref) => {
          return (
            <Button
              color="primary"
              variant="contained"
              disableElevation
              sx={{ mr: 1, ...style }}
              ref={ref}
              {...props}
            >
              Okay
            </Button>
          )
        })}
        location="bottom"
      >
        <Typography variant="h6">
          This website uses cookies to enhance the user experience. Without cookies, this website
          will not work as expected
        </Typography>
      </CookieConsent>
      {children}
    </>
  )
}
