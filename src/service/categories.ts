import { delay } from '../lib/fakeDelay'
import { formatCategories } from '../lib/formattedCategories'
import { prismaClient } from '../prisma/prisma-clients'
import { ResponseCategories } from '../types/categories'

export abstract class CategoriesService {
  static prisma = prismaClient

  static getAll = async (): Promise<ResponseCategories> => {
    try {
      const categories = await CategoriesService.prisma.category.findMany({
        select: {
          title: true,
          _count: {
            select: {
              news: true,
            },
          },
        },
      })

      const formattedCategories = formatCategories(categories)

      await delay(Math.round((Math.random() + 1) * 1000))

      return {
        success: true,
        data: formattedCategories,
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
