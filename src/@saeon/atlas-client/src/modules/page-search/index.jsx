import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Fade,
  useMediaQuery,
  Typography,
} from '@material-ui/core'
import { ATLAS_API_ADDRESS } from '../../config'
import { useHttpDataQuery } from '../../components'
import SearchControls from '../search-controls'
import useStyles from './style'
import clsx from 'clsx'
import { useQuery, gql } from '@apollo/client'

const DSL_INDEX = `saeon-odp-4-2`
const DSL_PROXY = `${ATLAS_API_ADDRESS}/proxy/saeon-elk`

export default () => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const { error, loading, data } = useHttpDataQuery({
    uri: `${DSL_PROXY}/${DSL_INDEX}`,
    method: 'POST',
    body: {
      aggs: {
        subjects: {
          terms: { field: 'metadata_json.subjects.subject.raw', size: 1000 },
        },
      },
    },
  })
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
        <Grid item xs={12}>
          <Card variant="outlined" style={{ textAlign: 'center', opacity: 0.8 }}>
            <CardHeader title="Search" />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined" style={{ textAlign: 'center', opacity: 0.8 }}>
            <CardContent>
              {error ? (
                'ERROR'
              ) : loading ? (
                'Loading ...'
              ) : (
                <SearchControls type={'GQL'} data={data}>
                  {({ query }) => {
                    const DSL = gql`
                      query($dsl: JSON!) {
                        search(dsl: $dsl)
                      }
                    `
                    const { error, loading, data } = useQuery(DSL, {
                      variables: { dsl: query },
                    })
                    console.log(error, loading, data)
                    return (
                      <Typography>
                        {error
                          ? 'ERROR'
                          : loading
                          ? 'Loading ...'
                          : `${data.search.data.length} results`}
                      </Typography>
                    )
                  }}
                </SearchControls>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  )
}
