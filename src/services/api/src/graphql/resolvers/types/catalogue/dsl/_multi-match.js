const fields = [
  'titles.title',
  'descriptions.description',
  'creators.name',
  'subtitle',
  'contributors.name',
  'subjects.subject',
  'creators.name',
  'identifier.identifier',
]

export default txt => ({
  multi_match: {
    query: txt,
    fields: fields,
    type: 'best_fields',
    fuzziness: 'AUTO',
  },
})
