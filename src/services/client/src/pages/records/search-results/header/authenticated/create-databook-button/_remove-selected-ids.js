export default obj =>
  Object.fromEntries(
    Object.entries(
      obj.selectedIds?.length ? Object.assign({ ...obj }, { ids: obj.selectedIds }) : obj
    ).filter(([key]) => key !== 'selectedIds')
  )
