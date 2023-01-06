import { useContext } from 'react'
import { context as authContext } from '../../../../contexts/authentication'
import { PlaylistPlus as NewListIcon } from '../../../../components/icons'
import MessageDialogue from '../../../../components/message-dialogue'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Q from '../../../../components/quick-form'
import SaveList from './_save-list'

export default () => {
  const { user } = useContext(authContext)

  return (
    <MessageDialogue
      buttonType="button"
      buttonProps={{
        children: 'New list',
        size: 'small',
        variant: 'text',
        startIcon: <NewListIcon fontSize="small" />,
      }}
      title="New list"
      tooltipProps={{
        title: 'Add new list',
      }}
    >
      {closeFn => {
        return (
          <Q title="" description="" createdBy={user?.name || user.emailAddress || ''}>
            {(update, { title, description, createdBy }) => {
              return (
                <>
                  <DialogContent>
                    <TextField
                      fullWidth
                      margin="normal"
                      value={title}
                      variant="outlined"
                      placeholder="List title"
                      helperText="What would you like to name the new list?"
                      onChange={({ target: { value: title } }) => update({ title })}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      value={description}
                      variant="outlined"
                      placeholder="Description"
                      helperText="What is the purpose of the list?"
                      multiline
                      minRows={4}
                      onChange={({ target: { value: description } }) => update({ description })}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      value={createdBy}
                      variant="outlined"
                      placeholder="List owner"
                      helperText="Who is creator/owner of this list"
                      onChange={({ target: { value: createdBy } }) => update({ createdBy })}
                    />
                  </DialogContent>
                  <DialogActions>
                    <SaveList
                      title={title}
                      description={description}
                      closeFn={closeFn}
                      createdBy={createdBy}
                    />
                  </DialogActions>
                </>
              )
            }}
          </Q>
        )
      }}
    </MessageDialogue>
  )
}
