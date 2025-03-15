import { Category } from '@prisma/client'

export interface ResponseCategories {
  success: boolean
  data?: Omit<Category, 'id'>[]
  message?: string
}
