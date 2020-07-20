import React from 'react'
import { Typography, Tabs, Tab, Button, Dialog, Grid } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Citations from './citations'

function TabPanel(props) {
  const { children, value, index, isCode = false } = props

  return (
    <div style={{ height: '100%' }} hidden={value !== index}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <div style={{ padding: 20 }}>
            {value === index && isCode ? (
              <pre
                style={{
                  textAlign: 'left',
                  whiteSpace: 'break-spaces',
                  wordBreak: 'break-word',
                }}
              >
                <code>{children}</code>
              </pre>
            ) : (
              <Typography variant="body1">{children}</Typography>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{ float: 'right' }}
            onClick={() => {
              // navigator.clipboard.writeText(citations[index]) // TODO - this threw a lint error since citations is not defined at this point.
            }}
            startIcon={<AssignmentIcon />}
          >
            Copy to clipboard
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

const TAB_WIDTH = 100
function TabsDialog(props) {
  const { onClose, open, json } = props
  const [tabValue, setTabValue] = React.useState(0)
  const handleClose = () => {
    onClose()
  }
  const citations = Citations(json)
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
      <Grid container>
        <Grid item xs={12}>
          <Tabs
            scrollButtons="auto"
            variant="scrollable"
            value={tabValue}
            orientation="horizontal"
            onChange={(event, newValue) => {
              setTabValue(newValue)
            }}
            indicatorColor="primary"
            textColor="primary"
            style={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Tab style={{ minWidth: TAB_WIDTH }} label="APA" />
            <Tab style={{ minWidth: TAB_WIDTH }} label="Harvard" />
            <Tab style={{ minWidth: TAB_WIDTH }} label="MLA" />
            <Tab style={{ minWidth: TAB_WIDTH }} label="Vancouver" />
            <Tab style={{ minWidth: TAB_WIDTH }} label="Chicago" />
            <Tab style={{ minWidth: TAB_WIDTH }} label="IEEE" />
            <Tab style={{ minWidth: TAB_WIDTH }} label="BibTeX" />
            <Tab style={{ minWidth: TAB_WIDTH }} label="RIS" />
          </Tabs>
        </Grid>
        <Grid item xs>
          <TabPanel value={tabValue} index={0} json={json}>
            {citations.APA}
          </TabPanel>
          <TabPanel value={tabValue} index={1} json={json}>
            {citations.Harvard}
          </TabPanel>
          <TabPanel value={tabValue} index={2} json={json}>
            {citations.MLA}
          </TabPanel>
          <TabPanel value={tabValue} index={3} json={json}>
            {citations.Vancouver}
          </TabPanel>
          <TabPanel value={tabValue} index={4} json={json}>
            {citations.Chicago}
          </TabPanel>
          <TabPanel value={tabValue} index={5} json={json}>
            {citations.IEEE}
          </TabPanel>
          <TabPanel value={tabValue} index={6} json={json} isCode>
            {citations.BibTeX}
          </TabPanel>
          <TabPanel value={tabValue} index={7} json={json} isCode>
            {citations.RIS}
          </TabPanel>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default ({ json, ...props }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        onClick={() => {
          setOpen(true)
        }}
        {...props}
      >
        “ Cite
      </Button>
      <TabsDialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        json={json}
      />
    </>
  )
}
