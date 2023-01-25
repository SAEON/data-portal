import deleteFieldFromCollection from '../../../../src/mongo/scripts/delete-field-from-collection/index.js'

export default async ({ collection, field }) => {
  await deleteFieldFromCollection({ collection, field })
}
