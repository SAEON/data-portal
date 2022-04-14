import { ODP_FILTER } from '../../../../config/index.js'

export default async items => {
  const fn = await ODP_FILTER
  if (fn) {
    return items.filter(fn)
  } else {
    return items
  }
}
