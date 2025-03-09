interface MediaContent {
  contentUrl: string | null
  thumbnailUrl: string | null
  credit: string | null
  title: string | null
  text: string | null
}

export interface RSSItem {
  title: string
  slug: string
  link: string | null
  pubDate: Date
  category: string | null
  creator: string | null
  media: MediaContent
  content: string | null
}

// export interface ContentNode {
//   root: boolean
//   tag: string
//   text: string
//   attributes: Record<string, string>
//   children: ContentNode[]
// }

// export interface ParsedNewsItem {
//   title: string
//   slug: string
//   pubDate: string
//   link: string
//   description: string
//   category: string
//   creator: string
//   media: {
//     contentUrl: string
//     thumbnailUrl: string
//     credit: string
//     title: string
//     text: string
//   }
//   content: ContentNode[]
// }
