import CardContent from '@mui/material/CardContent'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Q from '../../../../../components/quick-form'
import Link from '@mui/material/Link'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../../../config'
import Collapse from '../../../../../components/collapse'
import { Div } from '../../../../../components/html-tags'

export default ({ id, url: todo }) => {
  return (
    <Collapse title="Link sharing and embedding" subheader="Create and share links to this link">
      <Q referrer={''} disableSidebar={false} showSearchBar={false}>
        {(update, { disableSidebar, showSearchBar, referrer }) => {
          const url = `${CLIENTS_PUBLIC_ADDRESS}/list/records?search=${id}&referrer=${referrer}&showSearchBar=${showSearchBar}&disableSidebar=${disableSidebar}`

          return (
            <CardContent>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={disableSidebar} name="disableSidebar" />}
                  label="Disable side filters"
                  onChange={({ target: { checked: disableSidebar } }) => update({ disableSidebar })}
                />
                <FormControlLabel
                  control={<Switch checked={showSearchBar} name="showSearchBar" color="primary" />}
                  label="Show top search bar"
                  onChange={({ target: { checked: showSearchBar } }) => update({ showSearchBar })}
                />
                <TextField
                  value={referrer}
                  name="referrer"
                  variant="outlined"
                  margin="normal"
                  helperText="Who should be the referrer for this link"
                  onChange={({ target: { value: referrer } }) => update({ referrer })}
                />
              </FormGroup>
              <Div sx={{ mt: theme => theme.spacing(2) }}>
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    whiteSpace: 'break-spaces',
                    wordBreak: 'break-all',
                  }}
                >
                  {url}
                </Link>
              </Div>
            </CardContent>
          )
        }}
      </Q>
    </Collapse>
  )
}
