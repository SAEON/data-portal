import React from 'react'
import Layout from './_layout'
import { CatalogueContext } from '../../modules/provider-catalogue'

export default () => (
  <CatalogueContext.Consumer>
    {({ themes }) => <Layout themes={themes} />}
  </CatalogueContext.Consumer>
)
