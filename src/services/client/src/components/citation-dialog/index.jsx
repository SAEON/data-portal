import React, { useState } from 'react'
import { Tabs, Tab, Button, Dialog, Grid } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Citations from './citations'
import useStyles from './style'

function TabPanel({ children, copied, setCopied }) {
  return (
    <div style={{ height: '100%' }}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <div style={{ padding: 20 }}>
            <pre
              style={{
                textAlign: 'left',
                whiteSpace: 'break-spaces',
                wordBreak: 'break-word',
              }}
            >
              <code>{children}</code>
            </pre>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{ float: 'right' }}
            onClick={() => {
              navigator.clipboard.writeText(children)
              setCopied(true)
            }}
            startIcon={<AssignmentIcon />}
          >
            {copied ? 'Copied!' : 'Copy to cliboard'}
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

const TAB_LABELS = ['APA', 'BibTeX', 'Chicago', 'Harvard', 'IEEE', 'MLA', 'RIS', 'Vancouver']

function TabsDialog(props) {
  const { onClose, open, json } = props
  const [copied, setCopied] = useState(false)
  const citations = Citations(json)
  const [citation, setCitation] = React.useState(citations.APA)
  const [tabValue, setTabValue] = React.useState(0)
  const classes = useStyles()

  return (
    <Dialog onClose={() => onClose()} open={open} maxWidth="sm" fullWidth={true}>
      <Grid container className={classes.dialogGrid}>
        <Grid item xs={12}>
          <Tabs
            scrollButtons="auto"
            variant="scrollable"
            value={tabValue}
            orientation="horizontal"
            onChange={(event, newValue) => {
              setTabValue(newValue)
              setCitation(citations[TAB_LABELS[newValue]])
              setCopied(false)
            }}
            indicatorColor="primary"
            textColor="primary"
            style={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Tab className={classes.tab} label={TAB_LABELS[0]} />
            <Tab className={classes.tab} label={TAB_LABELS[1]} />
            <Tab className={classes.tab} label={TAB_LABELS[2]} />
            <Tab className={classes.tab} label={TAB_LABELS[3]} />
            <Tab className={classes.tab} label={TAB_LABELS[4]} />
            <Tab className={classes.tab} label={TAB_LABELS[5]} />
            <Tab className={classes.tab} label={TAB_LABELS[6]} />
            <Tab className={classes.tab} label={TAB_LABELS[7]} />
          </Tabs>
        </Grid>
        <Grid item xs>
          <TabPanel
            copied={copied}
            setCopied={setCopied}
            value={tabValue}
            label={TAB_LABELS[tabValue]}
            json={json}
          >
            {citation}
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
