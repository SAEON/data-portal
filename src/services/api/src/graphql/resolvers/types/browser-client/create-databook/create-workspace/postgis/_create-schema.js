import { query } from '../../../../../../../postgis/index.js'

export default async databook => {
  const { _id: schema, authentication } = databook
  const { username, password } = authentication

  console.log(schema, 'Creating schema')

  return query({
    text: `
      create user "${username}" with encrypted password '${password}';
      create schema "${schema}" authorization "${username}";`,
  }).catch(error => {
    console.error(error)
    throw error
  })
}
