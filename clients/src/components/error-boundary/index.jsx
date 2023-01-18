import { Component } from 'react'
import DialogContentText from '@mui/material/DialogContentText'
import Link from '@mui/material/Link'
import MessageDialogue from '../../components/message-dialogue'
import { TECHNICAL_CONTACT } from '../../config'
import { styled } from '@mui/material/styles'

const Pre = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[200]}`,
  whiteSpace: 'pre-wrap',
  padding: theme.spacing(1),
  wordBreak: 'break-word',
}))

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: undefined }
  }

  static getDerivedStateFromError(error) {
    return { error: error.message }
  }

  render() {
    const { props, state } = this
    const { children } = props
    const { error } = state

    // NO APP ERROR
    if (!error) {
      return children
    }

    // APP ERROR
    return (
      <MessageDialogue
        permanent
        hideIcon
        defaultOpen
        title="Application Error"
        text={
          <>
            <DialogContentText variant="body2" gutterBottom>
              If this error persists, or if assistance is required, please contact{' '}
              {
                <Link variant="body1" href={`mailto:${TECHNICAL_CONTACT}`}>
                  {TECHNICAL_CONTACT}
                </Link>
              }{' '}
              with a screenshot of this page so that we may resolve the issue speedily
            </DialogContentText>
            <DialogContentText
              component={({ children }) => (
                <Pre>
                  <code>{children}</code>
                </Pre>
              )}
              gutterBottom
              sx={{ mb: 4 }}
            >
              {error}
            </DialogContentText>
          </>
        }
      />
    )
  }
}
