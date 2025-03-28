import Elysia, { t } from 'elysia'

import { NewsService } from '../service/news'

export const NewsController = new Elysia({ prefix: '/news', tags: ['news'] })
  .model({
    queryNews: t.Object({
      cursor: t.Optional(t.String()),
      category: t.String(),
      timelapse: t.String(),
    }),
  })
  .guard({
    query: 'queryNews',
  })
  .get('/', ({ query: { cursor, category, timelapse }, error }) => {
    if (!category || !timelapse) {
      return error(400, { success: false, message: 'Bad request' })
    }

    const data = NewsService.getAll({
      cursor,
      category,
      timelapse,
    })

    return data
  })
