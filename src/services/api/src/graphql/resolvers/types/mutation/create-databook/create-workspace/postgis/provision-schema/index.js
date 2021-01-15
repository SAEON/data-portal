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
  console.log(username, password)

  console.log(schema, 'Creating schema')

  await query({
    text: `
      begin;
        -- Setup user, schema, and permissions 
        create user "${username}" with encrypted password '${password}';
        create schema "${schema}" authorization "${username}";
        grant usage on schema public to "${username}";
        alter role "${username}" set search_path = "${schema}", public;
        grant select on all tables in schema public to "${username}";

        -- Setup odp / postgres table map
        create table "${schema}".odp_map (
          id serial,
          odp_id varchar not null,
          table_name varchar not null,
          constraint odp_map_primary_key primary key (id),
          constraint odp_map_unique_cols unique (odp_id, table_name)
        );

        -- Grant user access to the new table
        grant all privileges on "${schema}".odp_map to "${username}";
        grant all privileges on all sequences in schema "${schema}" to "${username}";
        alter default privileges in schema "${schema}" grant all privileges on sequences to "${username}";
      commit;`,
  })
}
