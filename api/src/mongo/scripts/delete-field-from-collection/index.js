import getCollectionDocuments from './_get-collection-documents.js'
import deleteFields from './_delete-fields.js'

/**
 * NOTE
 *
 * This function gets all docs and doesn't iterate.
 * If a large collection needs to be updated in the future
 * this module needs to be updated to allow that
 */

export default async ({ field, collection }) => {
  const docs = await getCollectionDocuments({ collection, field })

  for (const doc of docs) {
    const result = await deleteFields({ doc, field, collection })
    console.log('Updated doc', result)
  }

  process.exit(0)
}
