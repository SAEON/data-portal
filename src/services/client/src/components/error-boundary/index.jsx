import { Link, DialogContentText } from '@material-ui/core'
import { Component } from 'react'
import MessageDialogue from '../../components/message-dialogue'
import { CATALOGUE_TECHNICAL_CONTACT } from '../../config'

export default class extends Component {
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
    return error ? (
      <MessageDialogue
        permanent
        hideIcon
        defaultOpen
        title="Application Error"
        text={
          <>
            <DialogContentText variant="body2" gutterBottom style={{ marginBottom: 16 }}>
              {error}
            </DialogContentText>
            <DialogContentText variant="body2" gutterBottom>
              Please try refreshing this page in a few minutes. If the error persists, or if
              assistance is required, please contact{' '}
              {
                <Link variant="body1" href={`mailto:${CATALOGUE_TECHNICAL_CONTACT}`}>
                  {CATALOGUE_TECHNICAL_CONTACT}
                </Link>
              }{' '}
              with a screenshot of this page so that we may resolve the issue speedily
            </DialogContentText>
          </>
        }
      />
    ) : (
      <>{children}</>
    )
  }
}
