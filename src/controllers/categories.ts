import Elysia, { t } from 'elysia'
import { CategoriesService } from '../service'

export const CategoriesController = new Elysia({
  prefix: '/categories',
  tags: ['category'],
})
  .model({
    query: t.Object({
      timelapse: t.String(),
    }),
  })
  .guard({
    query: 'query',
  })
  .get('/', ({ query: { timelapse } }) => {
    return CategoriesService.getAll({ timelapse })
  })
