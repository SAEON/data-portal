import parse from 'date-fns/parse/index.js'
import { REPOSITORY_NAME, REPOSITORY_OWNER, REPOSITORY_BRANCH, SINCE } from '../config.js'

const objectValueFromPathString = (str, obj) => str.split('.').reduce((o, k) => o[k], obj)

export default async function iterate({ dataPath, pageInfoPath, executor, query, after = null }) {
  const { data } = await executor({
    variables: Object.assign(
      {
        owner: REPOSITORY_OWNER,
        name: REPOSITORY_NAME,
        since: parse(SINCE, 'yyyy/MM/dd', new Date()),
        qualifiedName: REPOSITORY_BRANCH,
      },
      { after }
    ),
    query,
  })

  return {
    next: async () => {
      return iterate({
        dataPath,
        pageInfoPath,
        executor,
        query,
        after: objectValueFromPathString(`${pageInfoPath}.endCursor`, data),
      })
    },
    data: objectValueFromPathString(dataPath, data),
    done: !objectValueFromPathString(dataPath, data).length,
  }
}
