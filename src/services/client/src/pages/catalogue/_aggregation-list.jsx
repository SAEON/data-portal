import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'

const getTitleFromField = field => (
  <Typography variant="h5">{field.replace('.raw', '').replace(/.*\./, '')}</Typography>
)

export default ({ results }) => (
  <>
    {results
      .map(aggregationSummary =>
        Object.entries(aggregationSummary).map(([field, data]) => (
          <Card key={field} style={{ margin: '0px 16px 20px 0px', padding: 20 }} variant="outlined">
            <CardHeader title={getTitleFromField(field)} />
            <CardContent>
              {data.map(({ key, doc_count }) => (
                <div key={key}>
                  <Typography variant="overline">
                    {key}: {doc_count}
                  </Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      )
      .flat()}
  </>
)
