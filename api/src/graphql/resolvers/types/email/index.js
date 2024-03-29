import { GraphQLScalarType, GraphQLError, Kind } from 'graphql'
import { EMAIL_REGEX } from '../../../../config/index.js'

const isEmail = value => EMAIL_REGEX.test(value)

const GraphQLEmail = new GraphQLScalarType({
  name: 'Email',
  description:
    'The `Email` scalar type represents an email address as specified by [RFC822](https://www.w3.org/Protocols/rfc822/).',
  serialize: value => {
    if (!isEmail(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`)
    }

    return value
  },
  parseValue: value => {
    if (!isEmail(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`)
    }

    return value
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as email addresses but recieved: ${ast.kind}`
      )
    }

    if (!isEmail(ast.value)) {
      throw new TypeError(`Value is not a valid email address: ${ast.value}`)
    }

    return ast.value
  },
})

export default GraphQLEmail
