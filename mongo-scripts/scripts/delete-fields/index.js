import getLists from './_get-lists.js'
import deleteFields from './_delete-fields.js'

export default async () => {
  const lists = await getLists()

  for (const list of lists) {
    const result = await deleteFields(list)
    console.log('Updated doc', result)
  }

  process.exit(0)
}
