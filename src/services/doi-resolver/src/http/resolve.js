import { REDIRECT_TARGET } from '../config.js'

export default async ctx => {
  ctx.redirect(`${REDIRECT_TARGET}${ctx.params?.id}`)
}
