// import { load, CheerioAPI, Cheerio } from 'cheerio'
// import { ContentNode, ParsedNewsItem, RSSItem } from './types'

// export const parseNews = async (data: RSSItem[]): Promise<ParsedNewsItem[]> => {
//   const parsedNews = data.map((item: RSSItem): ParsedNewsItem => {
//     const $: CheerioAPI = load(item['content:encoded']?.[0] || '')
//     const content: ContentNode[] = []

//     $('body > *').each((_, elem) => {
//       content.push(parseNode(elem, true))
//     })

//     function parseNode(node: any, root = false): ContentNode {
//       const $node: Cheerio<any> = $(node)

//       return {
//         root,
//         tag: node.tagName || 'text',
//         text: $node.text() || '',
//         attributes: node.attribs || {},
//         children: $node.children().length
//           ? $node
//               .contents()
//               .map((_, child) => parseNode(child))
//               .get()
//           : [],
//       }
//     }

//     return {
//       title: item.title,
//       slug: item.slug,
//       pubDate: item.pubDate,
//       link: item.link?.[0] || '',
//       description: item.description?.[0] || '',
//       category: item.category?.[0] || '',
//       creator: item['dc:creator']?.[0] || '',
//       media: {
//         contentUrl: item['media:content']?.[0]?.$?.url || '',
//         thumbnailUrl:
//           item['media:content']?.[0]?.['media:thumbnail']?.[0]?.$?.url || '',
//         credit: item['media:content']?.[0]?.['media:credit']?.[0] || '',
//         title: item['media:content']?.[0]?.['media:title']?.[0] || '',
//         text: item['media:content']?.[0]?.['media:text']?.[0] || '',
//       },
//       content,
//     }
//   })

//   return parsedNews
// }
