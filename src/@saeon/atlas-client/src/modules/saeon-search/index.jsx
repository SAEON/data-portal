import React, { PureComponent } from 'react'
import { TextField, Grid } from '@material-ui/core'
import { Form } from '../../components'
import { Search as SearchIcon } from '@material-ui/icons'
// import { debounceGlobal } from '../../../../fns-lib'
// import npmUrl from 'url'
// import { VirtualList } from '../../components'
// import { Alert } from '@material-ui/lab'
// import { createLayer, LayerTypes } from '../../lib/ol'
// import LegendMenu from './_legend-menu'
import { ElasticCatalogue } from '@saeon/catalogue-search'

const DSL_PROXY = `${
  process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'
}/proxy/saeon-elk/_search`

export default class extends PureComponent {
  catalog = new ElasticCatalogue({
    dslAddress: DSL_PROXY,
  })

  render() {
    const { catalog } = this
    catalog.query()

    return (
      <Form search="">
        {({ updateForm, search }) => (
          <Grid container spacing={3}>
            {/* Search controls */}
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <SearchIcon />
                </Grid>
                <Grid item>
                  <TextField
                    id="saeon-ckan-search"
                    label="Search"
                    autoComplete="off"
                    value={search}
                    onChange={({ target }) => updateForm({ search: target.value })}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Search results */}
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>TODO</Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Form>
    )
  }
}
