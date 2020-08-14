import graphql from 'graphql/index.js'
import wkt from 'wkt'

const { parse } = wkt
const { GraphQLScalarType, GraphQLError } = graphql

const error = 'GraphQL scalar type (WKT_4326) error. Value must be a valid WKT string'

export default new GraphQLScalarType({
  description: 'Representation of spatial data using WKT',
  name: 'WKT_4326',
  parseLiteral: ast => {
    if (!parse(ast.value)) throw new GraphQLError(error)
    return ast.value
  },
  parseValue: value => {
    if (!parse(value)) throw new GraphQLError(error)
    return value
  },
  serialize: value => {
    if (!parse(value)) throw new GraphQLError(error)
    return value
  },
})
