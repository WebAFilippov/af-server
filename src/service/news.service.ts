import { RSSItem } from '../types/news.types'
import { prismaClient } from '../prisma/prisma-clients'

export abstract class NewsService {
  static prisma = prismaClient

  static getAll = async (query: {
    q?: string
    category?: string
    sort: 'desc' | 'asc'
    page: number
    limit: number
  }): Promise<void> => {
    console.log(query)
  }

  static upsertNews = async (data: RSSItem[]): Promise<void> => {
    try {
      const operations = data.map(async (item) => {
        const existingNews = await NewsService.prisma.news.findUnique({
          where: { slug: item.slug },
        })

        const hasMediaContent =
          item.media &&
          (item.media.contentUrl ||
            item.media.thumbnailUrl ||
            item.media.credit ||
            item.media.title ||
            item.media.text)

        const upsertedNews = await NewsService.prisma.news.upsert({
          where: { slug: item.slug },
          create: {
            title: item.title,
            slug: item.slug,
            link: item.link,
            pubDate: new Date(item.pubDate),
            category: item.category
              ? {
                  connectOrCreate: {
                    where: { title: item.category },
                    create: { title: item.category },
                  },
                }
              : undefined,
            creator: item.creator
              ? {
                  connectOrCreate: {
                    where: { name: item.creator },
                    create: { name: item.creator },
                  },
                }
              : undefined,
            content: item.content,
            media: hasMediaContent
              ? {
                  create: {
                    contentUrl: item.media!.contentUrl,
                    thumbnailUrl: item.media!.thumbnailUrl,
                    credit: item.media!.credit,
                    title: item.media!.title,
                    text: item.media!.text,
                  },
                }
              : undefined,
          },
          update: {
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate),
            category: item.category
              ? {
                  connectOrCreate: {
                    where: { title: item.category },
                    create: { title: item.category },
                  },
                }
              : undefined,
            creator: item.creator
              ? {
                  connectOrCreate: {
                    where: { name: item.creator },
                    create: { name: item.creator },
                  },
                }
              : undefined,
            content: item.content,
            media: hasMediaContent
              ? {
                  upsert: {
                    create: {
                      contentUrl: item.media!.contentUrl,
                      thumbnailUrl: item.media!.thumbnailUrl,
                      credit: item.media!.credit,
                      title: item.media!.title,
                      text: item.media!.text,
                    },
                    update: {
                      contentUrl: item.media!.contentUrl,
                      thumbnailUrl: item.media!.thumbnailUrl,
                      credit: item.media!.credit,
                      title: item.media!.title,
                      text: item.media!.text,
                    },
                  },
                }
              : undefined,
          },
        })

        if (!existingNews) console.log(`New: ${upsertedNews.slug}`)
      })

      const results = await Promise.allSettled(operations)

      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(
            `Не удалось обработать элемент ${data[index].slug}: ${result.reason}`,
          )
        }
      })
      console.log('Получение RSS завершено')
    } catch (error) {
      console.error('Ошибка при сохранении RSS-данных в базу данных:', error)
      throw error
    } finally {
      await NewsService.prisma.$disconnect()
    }
  }
}
