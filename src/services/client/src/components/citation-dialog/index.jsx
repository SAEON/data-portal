import React from 'react'
import { Typography, Tabs, Tab, Box, Button, Dialog } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Citations from './citations'

function TabPanel(props) {
  const { children, value, index } = props

  return (
    <div hidden={value !== index} style={{ alignSelf: 'center' }}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
          <Button
            style={{ position: 'absolute', right: '5px', bottom: '5px' }}
            onClick={() => {
              // navigator.clipboard.writeText(citations[index]) // TODO - this threw a lint error since citations is not defined at this point.
            }}
            startIcon={<AssignmentIcon />}
          >
            Copy to clipboard
          </Button>
        </Box>
      )}
    </div>
  )
}

function TabsDialog(props) {
  const { onClose, open, json } = props
  const [tabValue, setTabValue] = React.useState(0)
  const handleClose = () => {
    onClose()
  }
  const citations = Citations(json)
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl" fullWidth={true}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Tabs
          value={tabValue}
          orientation="vertical"
          variant="scrollable"
          onChange={(event, newValue) => {
            setTabValue(newValue)
          }}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="APA" />
          <Tab label="Harvard" />
          <Tab label="MLA" />
          <Tab label="Vancouver" />
          <Tab label="Chicago" />
          <Tab label="IEEE" />
          <Tab label="BibTeX" />
          <Tab label="RIS" />
        </Tabs>
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
        <TabPanel value={tabValue} index={6} json={json}>
          {citations.BibTeX}
        </TabPanel>
        <TabPanel value={tabValue} index={7} json={json}>
          {citations.RIS}
        </TabPanel>
      </div>
    </Dialog>
  )
}

export default props => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        size={props.size || 'medium'}
        color="primary"
        onClick={() => {
          setOpen(true)
        }}
      >
        “ Cite
      </Button>
      <TabsDialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        json={props.json}
      />
    </>
  )
}
