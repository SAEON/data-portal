import { config } from 'dotenv'
config()

/**
 * Elasticsearch
 */
export const ELASTICSEARCH_ADDRESS = process.env.ELASTICSEARCH_ADDRESS || `http://localhost:9200`

export const ELASTICSEARCH_CATALOGUE_TEMPLATE = 'saeon-odp-catalogue'
export const ELASTICSEARCH_CATALOGUE_INDEX = `${ELASTICSEARCH_CATALOGUE_TEMPLATE}-search`

export const ELASTICSEARCH_METADATA_TEMPLATE = 'saeon-odp-metadata'
export const ELASTICSEARCH_METADATA_INDEX = `${ELASTICSEARCH_METADATA_TEMPLATE}-search`
