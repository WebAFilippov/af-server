import { prismaClient } from '../prisma/prisma-clients'
import { ResponseCategories } from '../types/categories'

export abstract class CategoriesService {
  static prisma = prismaClient

  static getAll = async (): Promise<ResponseCategories> => {
    try {
      const categories = await CategoriesService.prisma.category.findMany({
        select: {
          title: true,
        },
      })

      return {
        success: true,
        data: categories,
      }
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Произошла неизвестная ошибка при получении категорий',
      }
    }
  }
}
