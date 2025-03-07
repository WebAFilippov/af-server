import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { opentelemetry } from '@elysiajs/opentelemetry'

import { PrismaClient } from '@prisma/client'
import cron, { Patterns } from '@elysiajs/cron'

const app = new Elysia({ prefix: '/api' })
  .use(opentelemetry())
  .use(swagger())
  .decorate('prisma', new PrismaClient())
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return 'Not Found :('

    console.error(error)
  })
  .use(
    cron({
      name: 'fetchNews',
      pattern: Patterns.everyMinutes(2),
      run: async () => {
        const response = await fetch(
          'https://lenta.ru/rss/google-newsstand/main/',
        )
        if (!response.ok) throw new Error('Network not ok')

        const xml = await response.text()
        console.log(xml)
      },
    }),
  )
  .listen(Bun.env.PORT || 3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
