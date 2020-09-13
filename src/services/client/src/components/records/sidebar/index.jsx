import React, { useContext } from 'react'
import { Grid, Fade, Chip } from '@material-ui/core'
import TagFilter from './items/tag-filter'
import ExtentFilter from './items/extent-filter'
import { GlobalContext } from '../../../modules/provider-global'

export default ({ catalogue }) => {
  const { global, setGlobal } = useContext(GlobalContext)
  const { terms } = global

  return (
    <Fade in={Boolean(catalogue)}>
      <Grid container item xs={12}>
        {/* Area filter */}
        <ExtentFilter title="Extent Filter" />

        {/* Keywords */}
        <TagFilter
          title="Keywords"
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

        {/* Selected terms */}
        <div style={{ padding: '8px 0', position: 'relative', maxWidth: '100%' }}>
          <Grid item container spacing={1}>
            {[...new Set(terms.map(({ value }) => value))].map(term => (
              <Grid item xs={12} key={term}>
                <Chip
                  color="secondary"
                  onDelete={() =>
                    setGlobal({
                      terms: terms.filter(({ value }) => value !== term),
                    })
                  }
                  style={{ maxWidth: '100%' }}
                  label={term.toUpperCase()}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    </Fade>
  )
}
