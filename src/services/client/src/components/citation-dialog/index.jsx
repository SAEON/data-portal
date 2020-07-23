import React, { useState } from 'react'
import { Tabs, Tab, Button, Dialog, Grid } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Citation from './citation'
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

const CITATION_NOTATIONS = [
  'APA',
  'BibTeX',
  'Chicago',
  'Harvard',
  'IEEE',
  'MLA',
  'RIS',
  'Vancouver',
]

const TabsDialog = ({ onClose, open, json }) => {
  const today = new Date()
  const {
    publisher,
    publicationYear,
    resourceType,
    identifier,
    language,
    titles,
    subjects,
    rightsList,
    descriptions,
    creators,
  } = json

  const citation = new Citation({
    DOI: identifier.identifierType === 'DOI' ? identifier.identifier : undefined,
    url: '',
    authors: creators.map(({ name }) => name),
    keywords: subjects.map(sub => sub.subject),
    language,
    title: titles[0].title,
    publisher,
    publicationYear,
    copyright: rightsList[0].rights,
    resourceDescription: resourceType.resourceTypeGeneral,
    abstract: descriptions.map(desc =>
      desc.descriptionType === 'Abstract' ? desc.description : undefined
    ),
    subjects,
    publisherLocation: '',
    dateViewed: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
  })

  const [copied, setCopied] = useState(false)
  const [citationText, setCitationText] = React.useState(citation.APA)
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
              setCitationText(citation[CITATION_NOTATIONS[newValue]])
              setCopied(false)
            }}
            indicatorColor="primary"
            textColor="primary"
            style={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Tab className={classes.tab} label={CITATION_NOTATIONS[0]} />
            <Tab className={classes.tab} label={CITATION_NOTATIONS[1]} />
            <Tab className={classes.tab} label={CITATION_NOTATIONS[2]} />
            <Tab className={classes.tab} label={CITATION_NOTATIONS[3]} />
            <Tab className={classes.tab} label={CITATION_NOTATIONS[4]} />
            <Tab className={classes.tab} label={CITATION_NOTATIONS[5]} />
            <Tab className={classes.tab} label={CITATION_NOTATIONS[6]} />
            <Tab className={classes.tab} label={CITATION_NOTATIONS[7]} />
          </Tabs>
        </Grid>
        <Grid item xs>
          <TabPanel
            copied={copied}
            setCopied={setCopied}
            value={tabValue}
            label={CITATION_NOTATIONS[tabValue]}
          >
            {citationText}
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
