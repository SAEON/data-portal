export default ({ client, variables, query, httpHeaders = {} }) => ({ after = undefined }) =>
  client.query({
    query,
    context: {
      headers: httpHeaders,
    },
    variables: Object.assign({ ...variables }, { after }),
  })
