import Elysia, { t } from 'elysia'

import { NewsService } from '../service/news.service'

export const NewsController = new Elysia({ prefix: '/news' })

  .model({
    query: t.Object({
      q: t.Optional(t.String()),
      category: t.Optional(t.String()),
      sort: t.Enum({ desc: 'desc', asc: 'asc' }, { default: 'desc' }),
      page: t.Number({ minimum: 1, default: 1 }),
      limit: t.Number({ minimum: 1, default: 10 }),
    }),
  })
  .get(
    '/',
    async ({ query: { q, category, sort, page, limit } }) => {
      NewsService.getAll({ q, category, sort, page, limit })
    },
    {
      query: 'query',
    },
  )
