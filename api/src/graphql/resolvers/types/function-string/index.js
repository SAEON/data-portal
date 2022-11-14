import { GraphQLScalarType, GraphQLError, Kind } from 'graphql'

// A custom type for Strings that represent JavaScript Functions
//STEVEN: Probably best to test if injection is possible here

//allowed function structures:
//()=>{console.log('hello world')}
//function sample(){console.log('hello world')}
const isFunctionString = someString => {
  if (typeof someString !== 'string' && !(someString instanceof String)) {
    console.log('Supplied parameter is not a String!')
    return false
  }
  try {
    let someFunction = new Function('return ' + someString)() //creating a function without calling it
    return true
  } catch (error) {
    console.log('Supplied String is not a function!')
    console.error(error)
  }
  return false
}
export default new GraphQLScalarType({
  name: 'FunctionString',
  description: 'Custom type for representing stringified JavaScript functions',
  parseValue(value) {
    //called via client
    console.log('parseValue value')
    console.log(value)
    //confirm string is valid javascript
    if (!isFunctionString(value)) {
      throw new GraphQLError(
        'GraphQl scalar type (FunctionString) error: Your value either is not a String or does not represent a Function'
      )
    }
    return value
  },
  serialize(value) {
    //verifying value type
    console.log('serialize value')
    console.log(value)
    if (!isFunctionString(value)) {
      throw new GraphQLError(
        'GraphQl scalar type (FunctionString) error: Your value either is not a String or does not represent a Function'
      )
    }
    return value
  },
  parseLiteral(ast) {
    //called via Graphiql
    console.log('parseLiteral ast')
    console.log(ast)

    if (!isFunctionString(ast.value)) {
      throw new GraphQLError(
        'GraphQl scalar type (FunctionString) error: Your value either is not a String or does not represent a Function'
      )
    }
    return ast.value
  },
})
