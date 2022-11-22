import { API_ADDRESS } from '../../config/index.js'
import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'fs'

export default path => {
  const file = createWriteStream(path, { flags: 'w' })

  const sitemap = new SitemapStream({
    hostname: API_ADDRESS,
    lastmodDateOnly: false,
    xmlns: {
      news: false,
      xhtml: true,
      image: false,
      video: false,
    },
  })

  sitemap.pipe(file)
  return { sitemap, file }
}
