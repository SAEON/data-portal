/**
 * This is hopefully a temporary solution to get
 * around the problem of many of the dataset downloads
 * being hosted on HTTP sites instead of HTTPS
 *
 * Google doesn't allow linking to an HTTP download
 * from an HTTPS site. Since I cannot tell if a resource
 * is a download or a link, if a user clicks on a resource
 * that is NOT HTTP then, I have to proxy the download to the
 * user
 */

import fetch from 'node-fetch'
import { URL } from 'url'
import { CURATOR_CONTACT } from '../../config/index.js'
import htmlTemplate from './html.js'

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
    ctx.set('Content-type', 'text/html')
    ctx.body = htmlTemplate
      .replace('$hostname', hostname)
      .replace('$uri', uri)
      .replace('$CURATOR_CONTACT', CURATOR_CONTACT.replace('@', ' [ at ] '))
  }
}
