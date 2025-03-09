import { parseStringPromise } from 'xml2js'
import { createSlug } from '../utils/createSlug'
import { RSSItem } from '../types/news.types'

export const parseRSS = async (data: string): Promise<RSSItem[]> => {
  const parsedData = await parseStringPromise(data)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const news = parsedData.rss.channel[0].item

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slugNews = news.map((item: any): RSSItem => {
    const title = item.title?.[0] || 'untitled'
    const pubDate = item.pubDate?.[0] || new Date().toISOString()
    const makeSlug =
      createSlug(new URL(item.link?.[0]).pathname) ||
      createSlug(new URL(item.guid?.[0]).pathname)

    const mediaData = {
      contentUrl: item['media:content']?.[0]?.$?.url || null,
      thumbnailUrl:
        item['media:content']?.[0]?.['media:thumbnail']?.[0]?.$?.url || null,
      credit: item['media:content']?.[0]?.['media:credit']?.[0] || null,
      title: item['media:content']?.[0]?.['media:title']?.[0] || null,
      text: item['media:content']?.[0]?.['media:text']?.[0] || null,
    }

    return {
      title: title,
      slug: makeSlug,
      link: item.link?.[0] || item.guid?.[0] || null,
      pubDate: new Date(pubDate),
      category: item.category?.[0] || null,
      creator: item['dc:creator']?.[0] || null,
      media: mediaData,
      content: item['content:encoded']?.[0] || null,
    }
  })

  return slugNews
}
