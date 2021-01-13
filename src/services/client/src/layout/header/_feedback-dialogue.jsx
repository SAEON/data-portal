import { useState } from 'react'
import QuickForm from '@saeon/quick-form'
import { gql, useMutation } from '@apollo/client'
import { Rating } from '@material-ui/lab'
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CircularProgress,
  Tooltip,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { CATALOGUE_LATEST_COMMIT } from '../../config'
import ErrorIcon from 'mdi-react/ErrorIcon'
import FeedbackIcon from 'mdi-react/FeedbackIcon'
import DoneIcon from 'mdi-react/CheckIcon'

export default () => {
  const theme = useTheme()
  const [feedbackDialogueOpen, setFeedbackDialogueOpen] = useState(false)
  return (
    <span>
      <Tooltip placement="left" title="Feedback? Feature requests? We'd love to hear it!">
        <IconButton
          aria-label="Provide anonymous feedback"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => setFeedbackDialogueOpen(!feedbackDialogueOpen)}
          color="inherit"
        >
          <FeedbackIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={feedbackDialogueOpen}
        onClose={() => setFeedbackDialogueOpen(false)}
        aria-labelledby="Feedback Dialogue"
        aria-describedby="Provide anonymous feedback"
      >
        <QuickForm text="" rating={0}>
          {(update, { text, rating }) => {
            const [submitFeedback, { error, loading, data }] = useMutation(gql`
              mutation submitFeedback($input: FeedbackInput!) {
                submitFeedback(input: $input)
              }
            `)
            return (
              <>
                <DialogTitle>Feedback</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Feedback collected here is anonymous - we appreciate your effort in helping us
                    build a service that better works and better suits your need
                  </DialogContentText>
                  <Rating
                    size="small"
                    max={5}
                    name="simple-controlled"
                    value={parseInt(rating, 10)}
                    onChange={({ target }) => {
                      update({ rating: parseInt(target.value, 10) })
                    }}
                  />
                  <TextField
                    error={text.length >= 10 ? false : true}
                    helperText={
                      text.length >= 10 ? '' : `${10 - text.length} more characters required...`
                    }
                    autoFocus
                    margin="dense"
                    multiline
                    rows={4}
                    value={text}
                    onChange={({ target }) => update({ text: target.value })}
                    rowsMax={10}
                    variant="outlined"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : data ? (
                    <DoneIcon style={{ color: theme.palette.success.main }} />
                  ) : error ? (
                    <Tooltip title={error.message}>
                      <ErrorIcon style={{ color: theme.palette.error.main }} />
                    </Tooltip>
                  ) : undefined}

                  {data || error ? (
                    <Button
                      disabled={false}
                      color="primary"
                      onClick={() => {
                        setFeedbackDialogueOpen(false)
                      }}
                      autoFocus
                    >
                      Close
                    </Button>
                  ) : (
                    <Button
                      disabled={loading || text.length >= 10 ? false : true}
                      color="primary"
                      onClick={() => {
                        submitFeedback({
                          variables: {
                            input: {
                              text,
                              rating,
                              pathname: window.location.pathname,
                              commitHash: CATALOGUE_LATEST_COMMIT,
                            },
                          },
                        })
                      }}
                      autoFocus
                    >
                      Send
                    </Button>
                  )}
                </DialogActions>
              </>
            )
          }}
        </QuickForm>
      </Dialog>
    </span>
  )
}
