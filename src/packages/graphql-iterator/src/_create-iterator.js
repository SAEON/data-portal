const objectValueFromPathString = (str, obj) => str.split('.').reduce((o, k) => o[k], obj)

export default async function iterate({ dataPath, pageInfoPath, executor, query, after = null }) {
  const { data } = await executor({ after })

  return {
    next: () => {
      return iterate({
        dataPath,
        pageInfoPath,
        executor,
        query,
        after: objectValueFromPathString(`${pageInfoPath}.endCursor`, data)
      })
    },
    data: objectValueFromPathString(dataPath, data),
    done: !objectValueFromPathString(dataPath, data).length
  }
}
