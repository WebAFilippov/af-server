import { prismaClient } from '../prisma/prisma-clients'
import { ResponseCategories } from '../types/categories'
import { v4 as uuidv4 } from 'uuid'

export abstract class CategoriesService {
  static prisma = prismaClient

  static getAll = async (query: {
    timelapse: string
  }): Promise<ResponseCategories> => {
    try {
      const categories = await CategoriesService.prisma.category.findMany({
        select: {
          id: true,
          title: true,
          _count: {
            select: {
              news: {
                where: {
                  pubDate: {
                    lte: new Date(Number(query.timelapse)),
                  },
                },
              },
            },
          },
        },
        orderBy: {
          news: {
            _count: 'desc',
          },
        },
      })

      const totalCount = categories.reduce(
        (acc, category) => acc + category._count.news,
        0,
      )

      const categoriesFormatted = [
        ...categories.map((category) => ({
          id: category.id,
          title: category.title,
          count: category._count.news,
        })),
        {
          id: uuidv4(),
          title: 'Все',
          count: totalCount,
        },
      ]

      return {
        success: true,
        data: categoriesFormatted,
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
