import graphql from 'graphql/index.js'

const { GraphQLScalarType, Kind } = graphql

export default new GraphQLScalarType({
  name: 'DateTime',
  description: 'Custom scalar type for datetime objects',
  parseValue(value) {
    const parsed = new Date(value)
    if (isNaN(parsed.getTime()))
      throw new Error('GraphQL scalar type (Date) error: Cannot parse value')
    return parsed.toISOString()
  },
  serialize(value) {
    try {
      return value
    } catch (error) {
      console.error('Failed to parse MongoDB date field. This should not occur', error)
    }
    return null
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) return new Date(ast.value)
    return null
  },
})
