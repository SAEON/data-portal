export default async ctx => {
  ctx.session = null
  ctx.redirect('http://localhost:3001')
}
