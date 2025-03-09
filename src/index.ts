import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { opentelemetry } from '@elysiajs/opentelemetry'

import { NewsController } from './controllers/news'
import { cronFetchNews } from './lib/cronFetchNews'

const app = new Elysia()
  .use(opentelemetry())
  .use(swagger())
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return 'Not Found :('

    console.error(error)
  })
  .use(cronFetchNews)
  .use(NewsController)
  .listen(Bun.env.PORT || 3000)

console.log(`🦊 Elysia запущена на ${app.server?.hostname}:${app.server?.port}`)
