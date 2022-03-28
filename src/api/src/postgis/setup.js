import { POSTGIS_DB, POSTGIS_USERNAME_PUBLIC, POSTGIS_PASSWORD_PUBLIC } from '../config/index.js'
import query from './query.js'

await query({
  text: `
      create extension if not exists postgis;
      create extension if not exists postgis_raster;
      create extension if not exists postgis_sfcgal;
      create extension if not exists fuzzystrmatch;
      create extension if not exists address_standardizer;
      create extension if not exists address_standardizer_data_us;
      create extension if not exists postgis_tiger_geocoder;
      create extension if not exists postgis_topology;
      create extension if not exists bloom;
      create extension if not exists btree_gin;
      create extension if not exists btree_gist;
      create extension if not exists cube;
      create extension if not exists intarray;
      create extension if not exists pg_trgm;
      create extension if not exists pgcrypto;`
})

/**
 * TODO. Look more into offline raster configuration options
 * https://postgis.net/docs/manual-dev/postgis_gdal_enabled_drivers.html
 */

await query({
  text: `alter database ${POSTGIS_DB} set postgis.enable_outdb_rasters = true;`
})

await query({
  text: `alter database ${POSTGIS_DB} set postgis.gdal_enabled_drivers = 'ENABLE_ALL';`
})

/**
 * Setup a public read user for
 * public SQL endpoints
 */
await query({
  text: `
  DO
  $do$
  BEGIN
     IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_roles
        WHERE rolname = '${POSTGIS_USERNAME_PUBLIC}'
     )
     THEN CREATE ROLE "${POSTGIS_USERNAME_PUBLIC}" LOGIN PASSWORD '${POSTGIS_PASSWORD_PUBLIC}';
     END IF;
  END
  $do$;`
}).then(() => console.info('Public database server role configured'))

/**
 * Grant public user connect to the DB
 */
await query({
  text: `grant connect on database "${POSTGIS_DB}" to "${POSTGIS_USERNAME_PUBLIC}"`
}).then(() => console.info('Public user granted connect to database'))

console.info('PostGIS extensions configured')
