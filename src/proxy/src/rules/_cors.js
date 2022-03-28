export default (requestDetail, responseDetail) => {
  Object.assign(responseDetail.response.header, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers':
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, credentials, Authorization'
  })

  if (requestDetail.requestOptions.method === 'OPTIONS') {
    return {
      response: {
        statusCode: 200
      }
    }
  }
}
