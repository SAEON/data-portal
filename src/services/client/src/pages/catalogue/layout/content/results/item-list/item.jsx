import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  IconButton,
  Fade,
} from '@material-ui/core'
import {
  Visibility as ViewIcon,
  GetApp as DownloadIcon,
  BarChart as PreviewIcon,
  Code as CodeIcon,
} from '@material-ui/icons'
import { Link } from '../../../../../../components'

export default ({ doc }) => {
  const history = useHistory()
  const [codeView, toggleCodeView] = useState(false)

  return codeView ? (
    <Fade in={codeView}>
      <Card style={{ marginBottom: 20 }} variant="outlined">
        <CardHeader
          title={<Typography variant="h6">{doc.titles?.[0]?.title || 'Title missing'}</Typography>}
          subheader={
            <Typography variant="overline">
              {doc.contributors?.[0]?.name || 'Contributor info missing'}
            </Typography>
          }
          action={
            <IconButton
              onClick={() => toggleCodeView(!codeView)}
              color={codeView ? 'secondary' : 'primary'}
              aria-label="Show metadata JSON object"
            >
              <CodeIcon />
            </IconButton>
          }
        />
        <CardContent>
          <div style={{ maxHeight: 400, overflow: 'auto' }}>
            <pre style={{ whiteSpace: 'break-spaces' }}>{JSON.stringify(doc, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>
    </Fade>
  ) : (
    <Card style={{ marginBottom: 20 }} variant="outlined">
      <CardHeader
        title={<Typography variant="h6">{doc.titles?.[0]?.title || 'Title missing'}</Typography>}
        subheader={
          <Typography variant="overline">
            {doc.contributors?.[0]?.name || 'Contributor info missing'}
          </Typography>
        }
        action={
          <IconButton
            onClick={() => toggleCodeView(!codeView)}
            color={codeView ? 'secondary' : 'primary'}
            aria-label="Show metadata JSON object"
          >
            <CodeIcon />
          </IconButton>
        }
      />
      <CardContent>{doc.descriptions?.[0]?.description || 'No description'}</CardContent>
      <CardContent>
        <Button
          startIcon={<ViewIcon />}
          disabled={!doc.alternateIdentifiers}
          color="primary"
          size="small"
          onClick={() =>
            history.push(
              `/catalogue/${
                doc.alternateIdentifiers?.find(
                  ({ alternateIdentifierType: type }) => type === 'Plone'
                ).alternateIdentifier
              }`
            )
          }
          style={{ marginRight: 10 }}
          variant="contained"
          disableElevation
        >
          View Metadata
        </Button>
        <Button
          startIcon={<PreviewIcon />}
          size="small"
          color="primary"
          onClick={() => alert('What should this do Leo??')}
          style={{ marginRight: 10 }}
          variant="contained"
          disableElevation
        >
          Preview Dataset
        </Button>
        <Button
          style={{ marginRight: 10 }}
          startIcon={<DownloadIcon />}
          size="small"
          color="primary"
          onClick={() => alert('What should this do Leo??')}
          variant="contained"
          disableElevation
        >
          Download Dataset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => alert('TODO')}
          variant="contained"
          disableElevation
        >
          “ Cite
        </Button>
      </CardContent>
      <CardContent>
        {doc.identifier ? (
          <Link uri={`https://doi.org/${doc.identifier.identifier}`} />
        ) : (
          <Typography>No DOI</Typography>
        )}
      </CardContent>
    </Card>
  )
}
