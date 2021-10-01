import configureCatalogueTemplate from './catalogue/index.js'
import configureMetadataTemplate from './metadata/index.js'

export default async client => [
  await configureCatalogueTemplate(client),
  await configureMetadataTemplate(client),
]
