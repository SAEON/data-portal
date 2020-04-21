import { ACCESS_TOKEN } from '../config'
export { default as commits } from './_commits'

export default (client) => async ({ variables, query }) =>
  await client.query({
    query,
    context: {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
    variables,
  })
