import { config } from 'dotenv'
config()

/**
 * PostGIS
 *
 * Local development: API isn't dockerized,
 * so PostGIS is via local. However the ogr2ogr
 * commands still require addressing PostGIS via
 * the Docker network
 */
export const POSTGIS_HOST_DEV = process.env.POSTGIS_HOST_DEV || 'localhost'
export const POSTGIS_DB = process.env.POSTGIS_DB || 'sdp_local_dev'
export const POSTGIS_HOST = process.env.POSTGIS_HOST || 'postgis'
export const POSTGIS_PORT = process.env.POSTGIS_PORT || 5432
export const POSTGIS_USERNAME = process.env.POSTGIS_USERNAME || 'admin'
export const POSTGIS_PASSWORD = process.env.POSTGIS_PASSWORD || 'password'
export const POSTGIS_IMAGE_NAME = process.env.POSTGIS_IMAGE_NAME || 'postgis'
export const POSTGIS_CONTAINER_NAME = process.env.POSTGIS_CONTAINER_NAME || 'postgis'
export const POSTGIS_USERNAME_PUBLIC = process.env.POSTGIS_USERNAME_PUBLIC || 'public_user'
export const POSTGIS_PASSWORD_PUBLIC = process.env.POSTGIS_PASSWORD_PUBLIC || 'password'
