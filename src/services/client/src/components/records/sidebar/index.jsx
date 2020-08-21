import React from 'react'
import { Grid, Fade } from '@material-ui/core'
import TagFilter from './items/tag-filter'
import ExtentFilter from './items/extent-filter'
import ResultContextSummary from './items/result-context-summary'

export default ({ catalogue }) => {
  return (
    <Fade in={Boolean(catalogue)}>
      <Grid container item xs={12}>
        {/* Result summary */}
        <ResultContextSummary title="Preview Basket" />

        {/* Area filter */}
        <ExtentFilter title="Filter by Extent" />

        {/* Data tags */}
        <TagFilter
          title="Tags"
          results={
            catalogue?.summary.find(obj =>
              Object.entries(obj).find(([key]) => key === 'subjects.subject.raw')
            )['subjects.subject.raw']
          }
        />

        {/* Publisher */}
        <TagFilter
          title="Publisher"
          results={
            catalogue?.summary.find(obj =>
              Object.entries(obj).find(([key]) => key === 'publisher.raw')
            )['publisher.raw']
          }
        />

        {/* Publication year */}
        <TagFilter
          title="Publication Year"
          results={
            catalogue?.summary.find(obj =>
              Object.entries(obj).find(([key]) => key === 'publicationYear')
            )['publicationYear']
          }
        />

        {/* Creators */}
        <TagFilter
          title="Creators"
          results={
            catalogue?.summary.find(obj =>
              Object.entries(obj).find(([key]) => key === 'creators.name.raw')
            )['creators.name.raw']
          }
        />
      </Grid>
    </Fade>
  )
}
