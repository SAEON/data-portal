import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, CardHeader, CardContent, Typography, Button } from '@material-ui/core'
import {
  Visibility as ViewIcon,
  GetApp as DownloadIcon,
  BarChart as PreviewIcon,
} from '@material-ui/icons'
import { Link } from '../../components'

export default ({ doc }) => {
  const history = useHistory()
  return (
    <Card style={{ marginBottom: 20 }} variant="outlined">
      <CardHeader
        title={<Typography variant="h6">{doc.titles?.[0]?.title || 'Title missing'}</Typography>}
        subheader={
          <Typography variant="overline">
            {doc.contributors?.[0]?.name || 'Contributor info missing'}
          </Typography>
        }
      />
      <CardContent>{doc.descriptions?.[0]?.description || 'No description'}</CardContent>
      <CardContent>
        <Button
          startIcon={<ViewIcon />}
          color="primary"
          size="small"
          onClick={() =>
            history.push(
              `/catalogue/${
                doc.alternateIdentifiers.find(
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
        <Link uri={`https://doi.org/${doc.identifier.identifier}`} />
      </CardContent>
    </Card>
  )
}
