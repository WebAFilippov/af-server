import Elysia, { t } from 'elysia'

import { NewsService } from '../service/news'

export const NewsController = new Elysia({ prefix: '/news', tags: ['news'] })
  .model({
    query: t.Object({
      cursor: t.Optional(t.String()),
      take: t.Number({ minimum: 10 }),
      q: t.Optional(t.String()),
      category: t.Optional(t.String()),
      sort: t.Enum({ desc: 'desc', asc: 'asc' }, { default: 'desc' }),
    }),
  })
  .guard({
    query: 'query',
  })
  .get('/', ({ query: { cursor, take, q, category, sort } }) => {
    return NewsService.getAll({ cursor, take, q, category, sort })
  })
