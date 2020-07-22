import React, { useState } from 'react'
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
import { Feedback as FeedbackIcon, Done as DoneIcon, Error as ErrorIcon } from '@material-ui/icons'

export default () => {
  const [feedbackDialogueOpen, setFeedbackDialogueOpen] = useState(false)
  return (
    <>
      <Tooltip title="Send us anonymous feedback on the site">
        <IconButton
          style={{ marginRight: 10 }}
          aria-label="Provide anonymous feedback"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => setFeedbackDialogueOpen(!feedbackDialogueOpen)}
          color="inherit"
          size="small"
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
          {({ updateForm, text, rating }) => {
            const [submitFeedback, { error, loading, data }] = useMutation(gql`
              mutation submitFeedback($text: String!, $rating: Int!, $pathname: String!) {
                submitFeedback(text: $text, rating: $rating, pathname: $pathname)
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
                      updateForm({ rating: parseInt(target.value, 10) })
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
                    onChange={({ target }) => updateForm({ text: target.value })}
                    rowsMax={10}
                    variant="outlined"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : data ? (
                    <DoneIcon color="secondary" />
                  ) : error ? (
                    <Tooltip title={error.message}>
                      <ErrorIcon color="error" />
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
                          variables: { text, rating, pathname: window.location.pathname },
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
    </>
  )
}
