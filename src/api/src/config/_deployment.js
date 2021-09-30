import { config } from 'dotenv'
config()

/**
 * Deployment config
 */
export const DOCKER_NETWORK = process.env.DOCKER_NETWORK || 'catalogue'
export const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV || 'development'
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const DOCKER_TMP_VOLUME = process.env.DOCKER_TMP_VOLUME || '/tmp/catalogue-api'
export const DOCKER_DATA_VOLUME = process.env.DOCKER_DATA_VOLUME || '/var/lib/catalogue-api'
