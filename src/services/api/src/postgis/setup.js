import query from './query.js'

export default async () => {
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
      create extension if not exists pgcrypto;`,
  })

  // TODO - this needs to be done manually on server startup. Look into this

  // await query({
  //   text: `set postgis.gdal_enabled_drivers to 'ENABLE_ALL';`,
  // })

  // await query({
  //   text: `alter system set postgis.enable_outdb_rasters='on';`,
  // })

  // await query({
  //   text: `select pg_reload_conf();`,
  // })
}
