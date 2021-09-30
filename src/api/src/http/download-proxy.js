import fetch from 'node-fetch'
import { URL } from 'url'
import { CURATOR_CONTACT } from '../config/index.js'

const HOSTNAME_WHITELIST = ['media.dirisa.org', 'dap.saeon.ac.za']

export default async ctx => {
  const { uri } = ctx.request.query
  const { hostname } = new URL(uri)

  if (HOSTNAME_WHITELIST.includes(hostname)) {
    const res = await fetch(uri)
    ctx.set('Content-type', res.headers.get('last-modified'))
    ctx.set('Content-type', res.headers.get('content-length'))
    ctx.set('Content-type', res.headers.get('content-type'))
    ctx.set('content-disposition', res.headers.get('content-disposition'))
    ctx.body = res.body
  } else {
    ctx.body = `The hostname ${hostname} is potentially insecure. If you would like to download the resource anyway, navigate to ${uri} in a new tab. If you think this message is in error, please contact the SAEON curation team to whitelist this URL at ${CURATOR_CONTACT}`
  }
}
