import summary from '../../../../elasticsearch/query-builder/facets.js'

/**
 * NOTE
 *
 * This maximum value that can be returned with
 * this function is 10 000
 */
export default async ({ ctx, id, field }) => {
  const result = await summary({
    ctx,
    args: {
      limit: 10000,
      fields: [
        {
          id,
          field,
        },
      ],
    },
  })
  return result?.[0]?.[id]?.length || Nan
}
