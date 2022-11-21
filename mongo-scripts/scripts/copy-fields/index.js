import getLists from './_get-lists.js'
import updateList from './_update-list.js'

export default async () => {
  const lists = await getLists()

  for (const list of lists) {
    const result = await updateList(list)
    console.log('Updated doc', result)
  }

  process.exit(0)
}
