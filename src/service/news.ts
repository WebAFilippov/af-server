import { ResponseNews, RSSItem } from '../types/news'
import { prismaClient } from '../prisma/prisma-clients'

export abstract class NewsService {
  static prisma = prismaClient

  static getAll = async (query: {
    cursor?: string
    category: string | null
    timelapse: string
  }): Promise<ResponseNews> => {
    try {
      const news = await NewsService.prisma.news.findMany({
        where: {
          ...(query.category &&
            query.category !== 'Все' && {
              category: { title: query.category },
            }),
          pubDate: {
            lte: new Date(Number(query.timelapse)),
          },
        },
        take: 25 + 1,
        ...(query.cursor && {
          skip: 1,
          cursor: { slug: query.cursor },
        }),
        orderBy: [{ pubDate: 'desc' }],
        select: {
          id: true,
          title: true,
          slug: true,
          link: true,
          pubDate: true,
          content: true,
          category: {
            select: {
              title: true,
            },
          },
          creator: {
            select: {
              name: true,
            },
          },
          media: {
            select: {
              contentUrl: true,
              thumbnailUrl: true,
              credit: true,
              title: true,
              text: true,
            },
          },
        },
      })

      const hasNextPage = news.length > 25
      if (hasNextPage) {
        news.pop()
      }

      const nextCursor = news.length > 0 ? news[news.length - 1].slug : null

      return {
        success: true,
        data: news,
        hasNextPage,
        nextCursor,
      }
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Произошла неизвестная ошибка при получении новостей',
      }
    }
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
            content: item.content,
            category: item.category
              ? {
                  connectOrCreate: {
                    where: { title: item.category },
                    create: {
                      title: item.category,
                    },
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
                    create: {
                      title: item.category,
                    },
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

        if (!existingNews) {
          console.log(`New: ${upsertedNews.slug}`)
        }
      })

      const results = await Promise.allSettled(operations)

      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Не удалось обработать элемент ${data[index].slug}`)
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
