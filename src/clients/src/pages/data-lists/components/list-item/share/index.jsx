import CardContent from '@mui/material/CardContent'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Q from '@saeon/quick-form'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../../../config'
import Collapse from '../../../../../components/collapse'

export default ({ id, url }) => {
  return (
    <Collapse title="Link sharing and embedding" subheader="Create and share links to this link">
      <Q referrer={''} disableSidebar={false} showSearchBar={false}>
        {(update, { disableSidebar, showSearchBar, referrer }) => {
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
                  variant="standard"
                  margin="normal"
                  helperText="Who should be the referrer for this link"
                  onChange={({ target: { value: referrer } }) => update({ referrer })}
                />
              </FormGroup>
              <div>
                <pre style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>{`
// Current
${CLIENTS_PUBLIC_ADDRESS}/list/records?search=${id}&referrer=${referrer}&showSearchBar=${showSearchBar}&disableSidebar=${disableSidebar}
  
// Legacy
${url.replace('/list/', '/render/')}`}</pre>
              </div>
            </CardContent>
          )
        }}
      </Q>
    </Collapse>
  )
}
