import savePublicList from './_save-public-list.js'
import saveCuratedList from './_save-curated-list.js'

export default async (self, args, ctx) => {
  const { type = 'public' } = args

  if (type === 'public') {
    return await savePublicList(self, args, ctx)
  }

  if (type === 'curated') {
    return await saveCuratedList(self, args, ctx)
  }
}
