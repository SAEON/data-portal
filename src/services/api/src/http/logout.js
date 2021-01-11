import { CATALOGUE_API_ADDRESS } from '../config.js'

export default async ctx => {
  const { redirect = CATALOGUE_API_ADDRESS } = ctx.request.query
  ctx.session = null
  ctx.redirect(redirect)
}
