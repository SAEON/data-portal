export default client => async ({ variables, query }) =>
  await client.query({
    query,
    context: {
      headers: {},
    },
    variables,
  })
