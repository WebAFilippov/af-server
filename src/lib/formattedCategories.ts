import { v4 as uuidv4 } from 'uuid'

export const formatCategories = (
  categories: {
    id: string
    title: string
    _count: {
      news: number
    }
  }[],
) => {
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

  const sortedCategories = categoriesFormatted.sort((a, b) => b.count - a.count)

  return sortedCategories
}
