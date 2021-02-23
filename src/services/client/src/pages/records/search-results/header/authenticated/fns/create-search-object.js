export default obj =>
  Object.fromEntries(
    Object.entries(
      obj.selectedIds?.length
        ? Object.assign(
            { ...obj },
            {
              ids: obj.selectedIds,
              // eslint-disable-next-line
              terms: obj.terms.map(({ filterId, ...props }) => ({ ...props })),
            }
          )
        : obj
    ).filter(([key]) => key !== 'selectedIds')
  )
