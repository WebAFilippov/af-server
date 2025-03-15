import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { opentelemetry } from '@elysiajs/opentelemetry'

import { NewsController } from './controllers/news'
import { cronFetchNews } from './lib/cronFetchNews'
import { CategoriesController } from './controllers/categories'
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(opentelemetry())
  .use(swagger())
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return 'Not Found :('

    console.error(error)
  })
  .onTransform(({ body, params, query, path, request: { method } }) => {
    console.log(`${method} ${path}`, {
      body,
      query,
      params,
    })
  })
  .use(cors())
  .use(cronFetchNews)
  .use(CategoriesController)
  .use(NewsController)

app.listen(process.env.PORT || 3000, () =>
  console.log(`🦊 Server started at ${app.server?.url.origin}`),
)
