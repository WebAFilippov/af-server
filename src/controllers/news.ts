import Elysia, { t } from 'elysia'

import { NewsService } from '../service/news'

export const NewsController = new Elysia({ prefix: '/news', tags: ['news'] })
  .model({
    query: t.Object({
      cursor: t.Optional(t.String()),
      category: t.String(),
      timelapse: t.String(),
    }),
  })
  .guard({
    query: 'query',
  })
  .get('/', ({ query: { cursor, category, timelapse } }) => {
    const data = NewsService.getAll({
      cursor,
      category,
      timelapse,
    })

    return data
  })
