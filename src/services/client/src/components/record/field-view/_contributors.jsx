import React from 'react'
import Row from '../_row'
import { Typography } from '@material-ui/core'

export default ({ contributors }) => (
  <Row title="Contributors">
    {contributors.map((contributor, i) => (
      <div key={i}>
        <Typography variant="body2">
          <b>
            {contributor.contributorType
              .replace(/([A-Z])/g, ' $1')
              .trim()
              .toUpperCase()}{' '}
          </b>{' '}
          {contributor.name}, {contributor.affiliations.map(aff => aff.affiliation)}
        </Typography>
      </div>
    ))}
  </Row>
)
