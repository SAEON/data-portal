export default (obj, selectedIds = undefined) => {
  const ids = selectedIds || obj.selectedIds

  if (ids) {
    return { ids }
  }

  return Object.assign(
    { ...obj },
    { terms: obj.terms?.map(({ filterId, ...props }) => ({ ...props })) }
  )
}
