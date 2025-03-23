import { createSlug } from '../utils/createSlug'

export const formatCategories = (
  categories: {
    title: string
    _count: {
      news: number
    }
  }[],
) => {
  return categories.map((category) => {
    return {
      slug: createSlug(category.title),
      title: category.title,
      count: category._count.news,
    }
  })
}
