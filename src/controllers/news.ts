import Elysia, { t } from 'elysia'

import { NewsService } from '../service/news'

export const NewsController = new Elysia({ prefix: '/news', tags: ['news'] })
  .model({
    query: t.Object({
      cursor: t.Optional(t.String()),
      qs: t.Optional(t.String()),
      category: t.String(),
    }),
  })
  .guard({
    query: 'query',
  })
  .get('/', ({ query: { cursor, qs, category } }) => {
    const data = NewsService.getAll({
      cursor,
      qs,
      category,
    })

    return data
  })
