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

import fetch from 'make-fetch-happen'
import { URL } from 'url'
import { CURATOR_CONTACT, TECHNICAL_CONTACT } from '../../config/index.js'
import htmlTemplate from './html.js'

const HOSTNAME_WHITELIST = ['media.dirisa.org', 'dap.saeon.ac.za']

export default async ctx => {
  const { uri } = ctx.request.query
  const { hostname } = new URL(uri)

  if (HOSTNAME_WHITELIST.includes(hostname)) {
    const res = await fetch(uri)
    ctx.set('Last-modified', res.headers.get('last-modified'))
    ctx.set('Content-length', res.headers.get('Content-length'))
    ctx.set('Content-type', res.headers.get('Content-type'))

    /**
     * If the content type suggests that the destination is
     * an HTML document, then redirect users there. Otherwise
     * Stream the destination content back to the user as a
     * download.
     */
    if (res.headers.get('Content-type').includes('text/html')) {
      ctx.redirect(uri)
    } else {
      ctx.set('Content-disposition', res.headers.get('Content-disposition'))
    }

    ctx.body = res.body
  } else {
    ctx.set('Content-type', 'text/html;charset=UTF-8')
    ctx.body = htmlTemplate
      .replace(/\$hostname/g, hostname)
      .replace(/\$uri/g, uri)
      .replace(/\$CURATOR_CONTACT/g, CURATOR_CONTACT.replace('@', ' [ at ] '))
      .replace(/\$TECHNICAL_CONTACT/g, TECHNICAL_CONTACT.replace('@', ' [ at ] '))
  }
}
