export default async self => {
  const { id, databook } = self
  return databook.authentication.public?.includes(id) || false
}
