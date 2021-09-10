import CardContent from '@material-ui/core/CardContent'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Q from '@saeon/quick-form'
import { CATALOGUE_CLIENT_ADDRESS } from '../../../../../config'
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
${CATALOGUE_CLIENT_ADDRESS}/list/records?search=${id}&referrer=${referrer}&showSearchBar=${showSearchBar}&disableSidebar=${disableSidebar}
  
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
