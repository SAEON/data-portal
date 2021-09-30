import { config } from 'dotenv'
config()

/**
 * Elasticsearch
 */
export const ELASTICSEARCH_ADDRESS = process.env.ELASTICSEARCH_ADDRESS || `http://localhost:9200`
export const ELASTICSEARCH_TEMPLATE = process.env.ELASTICSEARCH_TEMPLATE || 'saeon-odp'
export const ELASTICSEARCH_INDEX =
  process.env.ELASTICSEARCH_INDEX || `${ELASTICSEARCH_TEMPLATE}-catalogue-search`
