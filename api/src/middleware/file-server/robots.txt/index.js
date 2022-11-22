import { API_ADDRESS } from '../../../config/index.js'

const body = `
Sitemap:${API_ADDRESS}/sitemap.xml

User-agent: *

Disallow: /about
Disallow: /login
Disallow: /privacy-policy
Disallow: /terms-of-use
Disallow: /disclaimer
Disallow: /http
Disallow: /graphql

Allow: /`

export default async ctx => {
  ctx.body = body.replace('\nSitemap', 'Sitemap').replace(/\n+/g, '\n')
}
