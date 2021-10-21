export default async (self, { schema }) => {
  try {
    return await import(`./schemas/${schema}.json`).then(({ default: json }) => json)
  } catch {
    throw new Error('Unknown schema')
  }
}
