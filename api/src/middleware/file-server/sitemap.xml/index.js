import { API_ADDRESS } from '../../../config/index.js'
import { SitemapStream } from 'sitemap'

export default async ctx => {
  const { Lists } = await ctx.mongo.collections

  const listsCursor = Lists.find({
    $and: [
      { disableSEO: { $nin: [true] } },
      { title: { $nin: [null, ''] } },
      { description: { $nin: [null, ''] } },
    ],
  })

  const stream = new SitemapStream({
    hostname: API_ADDRESS,
    lastmodDateOnly: false,
    xmlns: {
      news: false,
      xhtml: true,
      image: false,
      video: false,
    },
  })

  for await (const list of listsCursor) {
    const id = list._id.toString()
    stream.write({ url: `/list/records?search=${id}`, changefreq: 'daily', priority: 1 })
  }

  stream.end()
  ctx.body = stream
}
