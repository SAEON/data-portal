import { useContext } from 'react'
import { context as listContext } from '../_context'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Collapse from '../../../../../components/collapse'
import Q from '../../../../../components/quick-form'
import debounce from '../../../../../lib/fns/debounce'
import Typography from '@mui/material/Typography'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../../../config'
import Link from '@mui/material/Link'

export default () => {
  const { id, update, title, description, createdBy } = useContext(listContext)

  const sitemapAddress = `${CLIENTS_PUBLIC_ADDRESS}/sitemap_collection_records-${id}.xml`

  return (
    <Collapse
      title={`Details (ID: ${id})`}
      subheader="Configure general list details here"
      defaultExpanded
    >
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
        <Typography sx={{ mt: 2 }} variant="body1">
          SITEMAP:{' '}
          {title && description ? (
            <Link target="_blank" rel="noopener noreferrer" href={sitemapAddress}>
              {sitemapAddress}
            </Link>
          ) : (
            'Sitemaps only generated for lists with a title and description'
          )}
        </Typography>
        {title && description && (
          <Typography variant="caption">
            (Please allow for up to 24 hours for generating/updating sitemaps)
          </Typography>
        )}
      </CardContent>
    </Collapse>
  )
}
