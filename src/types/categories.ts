export interface Category {
  slug: string
  title: string
  count: number
}

export interface ResponseCategories {
  success: boolean
  data?: Category[]
  message?: string
}
