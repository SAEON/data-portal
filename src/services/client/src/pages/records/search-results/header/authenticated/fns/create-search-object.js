export default (obj, selectedIds = undefined) =>
  Object.fromEntries(
    Object.entries(
      obj.selectedIds?.length
        ? Object.assign(
            { ...obj },
            {
              ids: selectedIds || obj.selectedIds,
              // eslint-disable-next-line
              terms: obj.terms?.map(({ filterId, ...props }) => ({ ...props })),
            }
          )
        : obj
    ).filter(([key]) => key !== 'selectedIds')
  )
