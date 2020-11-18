import query from '../../../../../../../postgis/query.js'

/**
 * Seems like these queries don't work parameterized
 * But there is no possibility of SQL injection in this case
 *
 * username => created by API
 * password => created by API
 * schema => created by API
 */
export default async databook => {
  const { _id: schema, authentication } = databook
  const { username, password } = authentication

  console.log(schema, 'Creating schema')

  try {
    await query({
      text: `
        create user "${username}" with encrypted password '${password}';
        create schema "${schema}" authorization "${username}";
        alter user "${username}" set search_path = public,"${schema}";`,
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
