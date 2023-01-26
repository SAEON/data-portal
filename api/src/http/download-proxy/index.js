/**
 * Google doesn't allow linking to an HTTP download
 * from an HTTPS site. Since I cannot tell if a resource
 * is a download or a link, if a user clicks on a resource
 * that is NOT HTTPS then, a landing page is served to the
 * user to show the link of the download.
 */

import { URL } from 'url'
import { CURATOR_CONTACT, TECHNICAL_CONTACT } from '../../config/index.js'
import htmlTemplate from './html.js'

export default async ctx => {
  const { uri } = ctx.request.query
  const { hostname } = new URL(uri)

  ctx.set('Content-type', 'text/html;charset=UTF-8')
  ctx.body = htmlTemplate
    .replace(/\$hostname/g, hostname)
    .replace(/\$uri/g, uri)
    .replace(/\$CURATOR_CONTACT/g, CURATOR_CONTACT.replace('@', ' [ at ] '))
    .replace(/\$TECHNICAL_CONTACT/g, TECHNICAL_CONTACT.replace('@', ' [ at ] '))
}
