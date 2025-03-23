import Elysia, { t } from 'elysia'

import { NewsService } from '../service/news'

export const NewsController = new Elysia({ prefix: '/news', tags: ['news'] })
  .model({
    query: t.Object({
      cursor: t.Optional(t.String()),
      take: t.String(),
      qs: t.Optional(t.String()),
      category: t.String(),
      sortBy: t.Enum({
        pubDate: 'pubDate',
        liked: 'liked',
        views: 'views',
      }),
      sortOrder: t.Enum({ desc: 'desc', asc: 'asc' }, { default: 'desc' }),
      lastTime: t.String(),
    }),
  })
  .guard({
    query: 'query',
  })
  .get(
    '/',
    ({
      query: { cursor, take, qs, category, sortBy, sortOrder, lastTime },
    }) => {
      const data = NewsService.getAll({
        cursor,
        take,
        qs,
        category,
        sortBy,
        sortOrder,
        lastTime,
      })

      return data
    },
  )
