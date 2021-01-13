import fetch from 'request'
import { parse } from 'url'
import { CATALOGUE_CURATOR_CONTACT } from '../config.js'

export default async ctx => {
  const { uri } = ctx.request.query
  const { hostname } = parse(uri)
  if (hostname !== 'media.dirisa.org') {
    ctx.body = `The hostname ${hostname} is potentially insecure. If you would like to download the resource anyway, navigate to ${uri} in a new tab. If you think this message is in error, please contact the SAEON curation team to whitelist this URL at ${CATALOGUE_CURATOR_CONTACT}`
  } else {
    ctx.body = fetch(uri)
  }
}
