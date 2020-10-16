import { lazy, Suspense } from 'react'
import { Grid, Fade } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import TagFilter from './items/tag-filter'
import { Loading } from '../../../../components'
import useStyles from './style'
import clsx from 'clsx'

const ExtentFilter = lazy(() => import('./items/extent-filter'))

export default ({ catalogue }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Fade in={Boolean(catalogue)}>
      <Grid
        className={clsx(classes.sideBar)}
        style={{ position: 'sticky', top: 65 }}
        container
        item
        xs={12}
        spacing={0}
      >
        {/* Area filter */}
        <Grid item xs={12}>
          <Suspense fallback={<Loading />}>
            <ExtentFilter title="Extent Filter" />
          </Suspense>
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
            style={{
              borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
            }}
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
