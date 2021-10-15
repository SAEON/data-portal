import { useState } from 'react'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { useTheme } from '@mui/material/styles';
import Fade from '@mui/material/Fade'
import TextField from '@mui/material/TextField'
import { gql, useMutation } from '@apollo/client'
import LoadingDialogueButton from '../../../../../../components/loading-dialogue-button'

export default ({
  closeDialogue,
  id,
  title: _title,
  subtitle: _subtitle,
  description: _description,
}) => {
  const theme = useTheme()
  const [title, setTitle] = useState(_title)
  const [subtitle, setSubtitle] = useState(_subtitle)
  const [description, setDescription] = useState(_description)

  const [updateDashboard, { loading, error }] = useMutation(gql`
    mutation ($id: ID!, $title: String, $subtitle: String, $description: String) {
      updateDashboard(id: $id, title: $title, subtitle: $subtitle, description: $description) {
        id
        title
        subtitle
        description
      }
    }
  `)

  if (error) {
    throw error
  }

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
            onClick={() => {
              updateDashboard({
                variables: {
                  id,
                  title,
                  subtitle,
                  description,
                },
              })
              closeDialogue()
            }}
          >
            Save Changes
          </Button>
        </Fade>
      </DialogActions>
    </>
  )
}
