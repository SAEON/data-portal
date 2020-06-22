import React from 'react'
import { Grid, Card, CardHeader, CardContent, Fade, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useStyles from './style'
import clsx from 'clsx'
import { gql, useSubscription } from '@apollo/client'

const SUB = gql`
  subscription {
    onFilterChange
  }
`

export default () => {
  const { data, loading, error } = useSubscription(SUB)
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Fade in={true}>
      <Grid
        container
        spacing={2}
        style={{ position: 'absolute', top: 100, zIndex: 1 }}
        alignItems="stretch"
        item
        className={clsx({
          [classes.mobile]: !matches,
          [classes.notMobile]: matches,
        })}
        xs={12}
        md={6}
      >
        {/* Header */}
        <Grid item xs={12}>
          <Card variant="outlined" style={{ textAlign: 'center', opacity: 0.8 }}>
            <CardHeader title="Search results" />
          </Card>
        </Grid>

        {/* Content */}
        <Grid item xs={12}>
          <Card variant="outlined" style={{ textAlign: 'center', opacity: 0.8 }}>
            <CardContent>
              {error
                ? 'ERROR'
                : loading
                ? 'Loading / waiting ...'
                : JSON.stringify(data.onFilterChange.data)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  )
}
