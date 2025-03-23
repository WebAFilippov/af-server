export const formatCategories = (
  categories: {
    id: string
    title: string
    _count: {
      news: number
    }
  }[],
) => {
  return categories.map((category) => {
    return {
      id: category.id,
      title: category.title,
      count: category._count.news,
    }
  })
}
