// import { prisma } from '../prisma/prisma-clients'
// import { RSSItem } from '../types/news.types'

// export const upsertNews = async (data: RSSItem[]) => {
//   try {
//     const operations = data.map(async (item) => {
//       const existingNews = await prisma.news.findUnique({
//         where: { slug: item.slug },
//       })

//       const hasMediaContent =
//         item.media &&
//         (item.media.contentUrl ||
//           item.media.thumbnailUrl ||
//           item.media.credit ||
//           item.media.title ||
//           item.media.text)

//       const upsertedNews = await prisma.news.upsert({
//         where: { slug: item.slug },
//         create: {
//           title: item.title,
//           slug: item.slug,
//           link: item.link,
//           pubDate: new Date(item.pubDate),
//           category: item.category
//             ? {
//                 connectOrCreate: {
//                   where: { title: item.category },
//                   create: { title: item.category },
//                 },
//               }
//             : undefined,
//           creator: item.creator
//             ? {
//                 connectOrCreate: {
//                   where: { name: item.creator },
//                   create: { name: item.creator },
//                 },
//               }
//             : undefined,
//           content: item.content,
//           media: hasMediaContent
//             ? {
//                 create: {
//                   contentUrl: item.media!.contentUrl,
//                   thumbnailUrl: item.media!.thumbnailUrl,
//                   credit: item.media!.credit,
//                   title: item.media!.title,
//                   text: item.media!.text,
//                 },
//               }
//             : undefined,
//         },
//         update: {
//           title: item.title,
//           link: item.link,
//           pubDate: new Date(item.pubDate),
//           category: item.category
//             ? {
//                 connectOrCreate: {
//                   where: { title: item.category },
//                   create: { title: item.category },
//                 },
//               }
//             : undefined,
//           creator: item.creator
//             ? {
//                 connectOrCreate: {
//                   where: { name: item.creator },
//                   create: { name: item.creator },
//                 },
//               }
//             : undefined,
//           content: item.content,
//           media: hasMediaContent
//             ? {
//                 upsert: {
//                   create: {
//                     contentUrl: item.media!.contentUrl,
//                     thumbnailUrl: item.media!.thumbnailUrl,
//                     credit: item.media!.credit,
//                     title: item.media!.title,
//                     text: item.media!.text,
//                   },
//                   update: {
//                     contentUrl: item.media!.contentUrl,
//                     thumbnailUrl: item.media!.thumbnailUrl,
//                     credit: item.media!.credit,
//                     title: item.media!.title,
//                     text: item.media!.text,
//                   },
//                 },
//               }
//             : undefined,
//         },
//       })

//       if (!existingNews) console.log(`New: ${upsertedNews.slug}`)
//     })

//     const results = await Promise.allSettled(operations)

//     results.forEach((result, index) => {
//       if (result.status === 'rejected') {
//         console.error(
//           `Не удалось обработать элемент ${data[index].slug}: ${result.reason}`,
//         )
//       }
//     })
//     console.log('Получение RSS завершено')
//   } catch (error) {
//     console.error('Ошибка при сохранении RSS-данных в базу данных:', error)
//     throw error
//   } finally {
//     await prisma.$disconnect()
//   }
// }
