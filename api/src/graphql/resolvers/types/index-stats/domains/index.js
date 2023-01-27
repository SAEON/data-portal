import cache from '../../../../../cache/index.js'

export default async (_, args, ctx) => {
  return cache.domains
}
