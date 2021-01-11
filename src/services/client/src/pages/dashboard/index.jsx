import { useState } from 'react'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink, WithGqlQuery } from '../../hooks'
import { getUriState } from '../../lib/fns'
import Loading from '../../components/loading'
import Footer from '../../components/footer'
import AutoComplete from '../../components/autocomplete'
import { gql } from '@apollo/client'
import { AppBar, Grid, Toolbar } from '@material-ui/core'
import Layout from './layout'
import useStyles from './style'
import clsx from 'clsx'
import QuickForm from '@saeon/quick-form'

const POLLING_INTERVAL = 500
//STEVEN TO-DO: Accidentally removed charts from dashboard. To recover previous version which had charts
export default ({ id }) => {
  const classes = useStyles()
  const { poll } = getUriState()
  const [filterYears, setFilterYears] = useState(['2015', '2016', '2017', '2018', '2019', '2020'])
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/dashboard?id=${id}`,
    params: false,
  })

  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          dashboard(id: $id) {
            id
            layout
          }
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data, startPolling }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw error
        }

        if (poll) {
          startPolling(POLLING_INTERVAL)
        }

        const { layout } = data.dashboard
        console.log('.../dashboard/ layout', layout)
        const MenuProps = {
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }
        return (
          <Grid container justify="center">
            <Grid item xs={12}>
              <AppBar
                style={window.location.pathname.includes('/render') ? {} : { marginTop: 48 }}
                variant="elevation"
              >
                <Toolbar variant="dense">This is the page toolbar</Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12} style={{ margin: '36px 0' }} />
            <Grid justify="space-evenly" container item xs={12} sm={10} md={8}>
              <Grid item xs={12}>
                <div className={clsx(classes.layout)}>
                  <Toolbar variant="dense">
                    {/*** */}
                    {/* Filters go here */}
                    {/* TO-DO: fix dashboard query then map returned filters here */}
                    <QuickForm value={''}>
                      {(update, { value }) => {
                        return (
                          <AutoComplete
                            id="region-filter"
                            options={['Cape Town', 'Joburg', 'Pretoria', 'Durban']}
                            selectedOptions={value}
                            setOption={newVal => {
                              update({ value: newVal })
                            }}
                            label="REGION"
                          />
                        )
                      }}
                    </QuickForm>
                    <QuickForm value={''}>
                      {(update, { value }) => {
                        return (
                          <AutoComplete
                            id="indicator-filter"
                            options={[]}
                            selectedOptions={value}
                            setOption={newVal => {
                              update({ value: newVal })
                            }}
                            label="INDICATOR"
                          />
                        )
                      }}
                    </QuickForm>
                  </Toolbar>
                </div>
              </Grid>
              <div style={{ position: 'relative', width: '100%' }}>
                <Layout items={layout} />
              </div>
            </Grid>
            <Grid item xs={12} style={{ margin: '16px 0' }} />
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        )
      }}
    </WithGqlQuery>
  )
}
