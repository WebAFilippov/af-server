declare module 'bun' {
  interface Env {
    PORT?: string
    POSTGRES_PRISMA_URL?: string
    POSTGRES_URL_NON_POOLING?: string
    GEOAPIFY_API_KEY?: string
  }
}
