import React from 'react'
import { Typography, Tabs, Tab, Button, Dialog, Grid } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Citations from './citations'
import useStyles from './style'

function TabPanel(props) {
  const { children, label } = props
  var isCode = label === 'BibTeX' || label === 'RIS' ? true : false
  return (
    <div style={{ height: '100%' }}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <div style={{ padding: 20 }}>
            {isCode ? (
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
              navigator.clipboard.writeText(children) // TODO - this threw a lint error since citations is not defined at this point.
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

function TabsDialog(props) {
  const { onClose, open, json } = props

  const citations = Citations(json)
  const citationLabels = ['APA', 'BibTeX', 'Chicago', 'Harvard', 'IEEE', 'MLA', 'RIS', 'Vancouver']

  const [citation, setCitation] = React.useState(citations.APA)
  const [tabValue, setTabValue] = React.useState(0)

  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth={true}>
      {/* <Grow in={clicked} timeout={1}> */}
      <Grid container className={classes.dialogGrid}>
        <Grid item xs={12}>
          <Tabs
            scrollButtons="auto"
            variant="scrollable"
            value={tabValue}
            orientation="horizontal"
            onChange={(event, newValue) => {
              setTabValue(newValue)
              setCitation(citations[citationLabels[newValue]])
            }}
            indicatorColor="primary"
            textColor="primary"
            style={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Tab className={classes.tab} label={citationLabels[0]} />
            <Tab className={classes.tab} label={citationLabels[1]} />
            <Tab className={classes.tab} label={citationLabels[2]} />
            <Tab className={classes.tab} label={citationLabels[3]} />
            <Tab className={classes.tab} label={citationLabels[4]} />
            <Tab className={classes.tab} label={citationLabels[5]} />
            <Tab className={classes.tab} label={citationLabels[6]} />
            <Tab className={classes.tab} label={citationLabels[7]} />
          </Tabs>
        </Grid>
        <Grid item xs>
          <TabPanel value={tabValue} label={citationLabels[tabValue]} json={json}>
            {citation}
          </TabPanel>
        </Grid>
      </Grid>
      {/* </Grow> */}
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
