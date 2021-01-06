import { useState } from 'react'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink, WithGqlQuery } from '../../hooks'
import { getUriState } from '../../lib/fns'
import Loading from '../../components/loading'
import Footer from '../../components/footer'
import { gql } from '@apollo/client'
import Chart from './chart'
import {
  AppBar,
  Grid,
  Toolbar,
  Menu,
  MenuItem,
  Icon,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  Input,
  InputLabel,
  ListItemText,
} from '@material-ui/core'
import { ExpandLess } from '@material-ui/icons'
import Layout from './layout'
import useStyles from './style'
import clsx from 'clsx'

const POLLING_INTERVAL = 500

export default ({ id }) => {
  const classes = useStyles()
  const { poll } = getUriState()
  const [anchorEl, setAnchorEl] = useState(null)
  const [filterYears, setFilterYears] = useState([])
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const years = ['2015', '2016', '2017', '2018', '2019', '2020']
  const handleChange = event => {
    setFilterYears(event.target.value)
    console.log('filterYears', filterYears)
  }
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
                    <Button
                      onClick={handleClick}
                      className={clsx(classes.button)}
                      endIcon={<ExpandLess />}
                    >
                      REGION
                    </Button>

                    <FormControl className={clsx(classes.formControl)}>
                      <InputLabel
                        variant="filled"
                        style={{ color: 'white' }}
                        classes={{ icon: { color: 'white', fontcolor: 'white' } }}
                      >
                        YEAR
                      </InputLabel>
                      <Select
                        multiple
                        value={filterYears}
                        renderValue={selected => selected.join(', ')}
                        onChange={handleChange}
                        input={<Input />}
                        MenuProps={MenuProps}
                        className={clsx(classes.select)}
                        classes={{
                          icon: classes.icon,
                        }}
                      >
                        {years.map(year => (
                          <MenuItem key={year} value={year}>
                            <Checkbox checked={filterYears.indexOf(year) > -1} />
                            <ListItemText primary={year} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
