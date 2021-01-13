import fetch from 'request'
import { parse } from 'url'

export default async ctx => {
  const { uri } = ctx.request.query
  const { hostname } = parse(uri)
  if (hostname !== 'media.dirisa.org') {
    ctx.body = `The hostname ${hostname} is potentially insecure. If you would like to download the resource anyway, navigate to ${uri} in a new tab`
  } else {
    ctx.body = fetch(uri)
  }
}
