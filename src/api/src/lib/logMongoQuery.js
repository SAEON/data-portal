export default (query, name = 'Mongo query') => {
  console.info('\n\n# Mongo query ::', name.toUpperCase(), JSON.stringify(query, null, 2))
}
