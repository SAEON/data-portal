import { API_PUBLIC_ADDRESS } from '../config.js'

export default async ctx => {
  const { redirect = API_PUBLIC_ADDRESS } = ctx.request.query
  ctx.session = null
  ctx.redirect(redirect)
}
