export interface ParsedNode {
  root: boolean
  tag: string
  text: string
  attributes: Record<string, string>
  parentNode: string | null
  children: ParsedNode[]
}

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

export interface News {
  id: string
  title: string
  slug: string
  link: string | null
  pubDate: Date
  content: string | null
  category: { title: string } | null
  creator: { name: string } | null
  media: {
    contentUrl: string | null
    thumbnailUrl: string | null
    credit: string | null
    title: string | null
    text: string | null
  } | null
}

export interface ResponseNews {
  success: boolean
  data?: News[]
  hasNextPage?: boolean
  nextCursor?: string | null
  message?: string
}

// type News = {
//   id: string;
//   title: string;
//   slug: string;
//   link: string | null;
//   pubDate: Date;
//   categoryId: string | null;
//   creatorId: string | null;
//   content: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// }

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
