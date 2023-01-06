import { useContext } from 'react'
import { context as listContext } from '../_context'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Collapse from '../../../../../components/collapse'
import Q from '../../../../../components/quick-form'
import debounce from '../../../../../lib/fns/debounce'

export default () => {
  const { update, title, description, createdBy } = useContext(listContext)

  return (
    <Collapse title="Details" subheader="Configure general list details here" defaultExpanded>
      <CardContent>
        {/* TITLE */}
        <Q
          effects={[
            debounce(({ value }) => {
              if (title !== value) {
                update({ title: value })
              }
            }, 500),
          ]}
          value={title}
        >
          {(update, { value }) => {
            return (
              <TextField
                value={value}
                name="title"
                variant="outlined"
                fullWidth
                placeholder={value}
                margin="normal"
                helperText="What is the title of this curated list?"
                onChange={({ target: { value } }) => update({ value })}
              />
            )
          }}
        </Q>

        {/* DESCRIPTION */}
        <Q
          effects={[
            debounce(({ value }) => {
              if (description !== value) {
                update({ description: value })
              }
            }, 500),
          ]}
          value={description}
        >
          {(update, { value }) => {
            return (
              <TextField
                value={value}
                name="description"
                variant="outlined"
                multiline
                minRows={4}
                fullWidth
                placeholder={value}
                margin="normal"
                helperText="What is the description of this curated list?"
                onChange={({ target: { value } }) => update({ value })}
              />
            )
          }}
        </Q>

        {/* CREATED BY */}
        <Q
          effects={[
            debounce(({ value }) => {
              if (createdBy !== value) {
                update({ createdBy: value })
              }
            }, 500),
          ]}
          value={createdBy}
        >
          {(update, { value }) => {
            return (
              <TextField
                value={value}
                name="createdBy"
                variant="outlined"
                fullWidth
                placeholder={value}
                margin="normal"
                helperText="Who created / is the owner of this list?"
                onChange={({ target: { value } }) => update({ value })}
              />
            )
          }}
        </Q>
      </CardContent>
    </Collapse>
  )
}
