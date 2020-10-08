import React from 'react'
import { Grid, Fade } from '@material-ui/core'
import TagFilter from './items/tag-filter'
import ExtentFilter from './items/extent-filter'

export default ({ catalogue }) => {
  return (
    <Fade in={Boolean(catalogue)}>
      <Grid container item xs={12} spacing={0}>
        {/* Area filter */}
        <Grid item xs={12}>
          <ExtentFilter title="Extent Filter" />
        </Grid>

        {/* Keywords */}
        <Grid item xs={12}>
          <TagFilter
            sortBy="doc_count"
            sortOrder="desc"
            field="subjects.subject.raw"
            title="Keywords"
            results={
              catalogue?.summary.find(obj =>
                Object.entries(obj).find(([key]) => key === 'subjects.subject.raw')
              )['subjects.subject.raw']
            }
          />
        </Grid>

        {/* Publisher */}
        <Grid item xs={12}>
          <TagFilter
            field="publisher.raw"
            title="Publisher"
            results={
              catalogue?.summary.find(obj =>
                Object.entries(obj).find(([key]) => key === 'publisher.raw')
              )['publisher.raw']
            }
          />
        </Grid>

        {/* Publication year */}
        <Grid item xs={12}>
          <TagFilter
            sortOrder="desc"
            field="publicationYear"
            title="Publication Year"
            results={
              catalogue?.summary.find(obj =>
                Object.entries(obj).find(([key]) => key === 'publicationYear')
              )['publicationYear']
            }
          />
        </Grid>

        {/* Creators */}
        <Grid item xs={12}>
          <TagFilter
            field="creators.name.raw"
            title="Creators"
            results={
              catalogue?.summary.find(obj =>
                Object.entries(obj).find(([key]) => key === 'creators.name.raw')
              )['creators.name.raw']
            }
          />
        </Grid>
      </Grid>
    </Fade>
  )
}
