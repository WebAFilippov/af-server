export interface Category {
  id: string
  title: string
  count: number
}

export interface ResponseCategories {
  success: boolean
  data?: Category[]
  message?: string
}
