/**
 * Seems like these queries don't work parameterized
 * But there is no possibility of SQL injection in this case
 *
 * username => created by API
 * password => created by API
 * schema => created by API
 */
export default async (ctx, databook) => {
  const { _id: schema, authentication } = databook
  const { username, password: encryptedPassword } = authentication
  const { decrypt } = ctx.crypto
  const { query } = ctx.postgis
  const password = decrypt(encryptedPassword)

  console.log(schema, 'Creating schema')

  await query({
    text: `
      begin;
        -- Setup user and schema
        create user "${username}" with encrypted password '${password}';
        create schema "${schema}" authorization "${username}";

        -- Setup odp / postgres table map
        create table "${schema}".odp_map (
          id serial,
          odp_record_id varchar not null,
          table_name varchar not null,
          file_location varchar null,
          constraint odp_map_primary_key primary key (id),
          constraint odp_map_unique_col_1 unique (odp_record_id),
          constraint odp_map_unique_col_2 unique (table_name)
        );

        -- Update search path to include "public" schema
        alter role "${username}" set search_path = "${schema}", public, tiger;
        
        -- Setup SELECT ONLY for public tables
        grant usage on schema public to "${username}";
        grant select on all tables in schema public to "${username}";
        grant select on all sequences in schema public to "${username}";
        grant insert on public.spatial_ref_sys to "${username}";

        -- Grant user access to the new table in their new schema
        grant select, update, insert on "${schema}".odp_map to "${username}";
        grant usage, select on all sequences in schema "${schema}" to "${username}";
        alter default privileges in schema "${schema}" grant usage, select on sequences to "${username}";

      commit;`,
  })

  /**
   * Return a function for cleaning up permissions
   * ogr2ogr requires write access to public.spatial_ref_sys
   * which needs to be revoked
   */
  return async () => {
    console.log(schema, 'Cleaning up permissions')
    await query({
      text: `
      begin;
        revoke insert on public.spatial_ref_sys from "${username}";
      commit;`,
    })
  }
}
