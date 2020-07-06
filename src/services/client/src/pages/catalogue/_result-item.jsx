import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, CardHeader, CardContent, Typography, Button } from '@material-ui/core'
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
          onClick={() =>
            history.push(
              `/catalogue/${
                doc.alternateIdentifiers.find(
                  ({ alternateIdentifierType: type }) => type === 'Plone'
                ).alternateIdentifier
              }`
            )
          }
          style={{ marginRight: 20 }}
          variant="contained"
          disableElevation
        >
          View Metadata
        </Button>
        <Button
          onClick={() => alert('todo')}
          style={{ marginRight: 20 }}
          variant="contained"
          disableElevation
        >
          Preview Dataset
        </Button>
        <Button onClick={() => alert('todo')} variant="contained" disableElevation>
          Download
        </Button>
      </CardContent>
      <CardContent>
        <Link uri={`https://doi.org/${doc.identifier.identifier}`} />
      </CardContent>
    </Card>
  )
}
