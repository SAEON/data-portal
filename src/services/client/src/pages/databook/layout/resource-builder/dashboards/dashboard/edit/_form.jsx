import { useState } from 'react'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import useTheme from '@material-ui/core/styles/useTheme'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import { gql, useMutation } from '@apollo/client'
import LoadingDialogueButton from '../../../../../components/loading-dialogue-button'

export default ({ id, title: _title, subtitle: _subtitle, description: _description }) => {
  const theme = useTheme()
  const [title, setTitle] = useState(_title)
  const [subtitle, setSubtitle] = useState(_subtitle)
  const [description, setDescription] = useState(_description)

  const [updateDashboard, { loading }] = useMutation(gql`
    mutation($id: ID!, $title: String, $subtitle: String, $description: String) {
      updateDashboard(id: $id, title: $title, subtitle: $subtitle, description: $description) {
        id
        title
        subtitle
        description
      }
    }
  `)

  return (
    <>
      <DialogContent>
        {/* TITLE */}
        <TextField
          id="title"
          fullWidth
          autoComplete="off"
          style={{ marginBottom: theme.spacing(4) }}
          label="Title"
          value={title || ''}
          onChange={e => setTitle(e.target.value || '')}
        />

        {/* SUBTITLE */}
        <TextField
          id="subtitle"
          fullWidth
          autoComplete="off"
          style={{ marginBottom: theme.spacing(4) }}
          label="Subtitle"
          value={subtitle || ''}
          onChange={e => setSubtitle(e.target.value)}
        />

        {/* DESCRIPTION */}
        <TextField
          id="description"
          fullWidth
          autoComplete="off"
          multiline
          variant="outlined"
          rows={4}
          style={{ marginBottom: theme.spacing(4) }}
          label="Description"
          value={description || ''}
          onChange={e => setDescription(e.target.value || '')}
        />

        <div style={{ marginBottom: theme.spacing(4) }} />
      </DialogContent>
      <DialogActions>
        <LoadingDialogueButton loading={loading} />
        <Fade in={!loading} key={'show-button'}>
          <Button
            size="small"
            color="primary"
            disableElevation
            variant="contained"
            onClick={() =>
              updateDashboard({
                variables: {
                  id,
                  title,
                  subtitle,
                  description,
                },
              })
            }
          >
            Save Changes
          </Button>
        </Fade>
      </DialogActions>
    </>
  )
}
