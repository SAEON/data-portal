import { useContext } from 'react'
import { context as listContext } from '../_context'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Collapse from '../../../../../components/collapse'

export default () => {
  const { update, title, description, createdBy } = useContext(listContext)

  return (
    <Collapse title="Details" subheader="Configure general list details here" defaultExpanded>
      <CardContent>
        {/* TITLE */}
        <TextField
          value={title}
          name="title"
          variant="outlined"
          fullWidth
          placeholder={title}
          margin="normal"
          helperText="What is the title of this curated list?"
          onChange={({ target: { value: title } }) => update({ title })}
        />

        {/* DESCRIPTION */}
        <TextField
          value={description}
          name="description"
          variant="outlined"
          multiline
          minRows={4}
          fullWidth
          placeholder={description}
          margin="normal"
          helperText="What is the description of this curated list?"
          onChange={({ target: { value: description } }) => update({ description })}
        />

        {/* CREATED BY */}
        <TextField
          value={createdBy}
          name="createdBy"
          variant="outlined"
          fullWidth
          placeholder={createdBy}
          margin="normal"
          helperText="Who created / is the owner of this list?"
          onChange={({ target: { value: createdBy } }) => update({ createdBy })}
        />
      </CardContent>
    </Collapse>
  )
}
