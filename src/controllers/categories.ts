import Elysia from 'elysia'
import { CategoriesService } from '../service'

export const CategoriesController = new Elysia({
  prefix: '/categories',
  tags: ['category'],
}).get('/', () => {
  return CategoriesService.getAll()
})
