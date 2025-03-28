import Elysia, { t } from 'elysia'
import { CategoriesService } from '../service'

export const CategoriesController = new Elysia({
  prefix: '/categories',
  tags: ['category'],
})
  .model({
    queryCategories: t.Object({
      timelapse: t.String(),
    }),
  })
  .guard({
    query: 'queryCategories',
  })
  .get('/', ({ query: { timelapse }, error }) => {
    if (!timelapse) {
      return error(400, { success: false, message: 'Bad request' })
    }

    return CategoriesService.getAll({ timelapse })
  })
