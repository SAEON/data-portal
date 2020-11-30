export default [
  { title: 'Keywords', field: 'subjects.subject.raw', sortOrder: 'desc', sortBy: 'doc_count' },
  { title: 'Publication Year', field: 'publicationYear', sortOrder: 'desc', sortBy: undefined },
  { title: 'Publisher', field: 'publisher.raw', sortOrder: undefined, sortBy: undefined },
  { title: 'Creators', field: 'creators.name.raw', sortOrder: undefined, sortBy: undefined },
]
