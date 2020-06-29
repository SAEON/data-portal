import { GITHUB_ACCESS_TOKEN } from '../config.js'
export { default as commits } from './_commits.js'

export default client => async ({ variables, query }) =>
  await client.query({
    query,
    context: {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    },
    variables,
  })
