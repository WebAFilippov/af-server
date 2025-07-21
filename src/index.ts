import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { opentelemetry } from '@elysiajs/opentelemetry'
import { readFileSync } from 'fs'

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
  .get('/updates/latest.yml', () => {
    const file = readFileSync('./src/updates/latest.yml', 'utf-8')
    return new Response(file, {
      headers: { 'Content-Type': 'text/yaml' },
    })
  })
  .get(
    '/updates/:filename',
    ({ params: { filename }, error }) => {
      const file = readFileSync(`./src/updates/${filename}`)
      if (!file) return error(404)
      return new Response(file, {
        headers: { 'Content-Type': 'application/octet-stream' },
      })
    },
    {
      params: t.Object({
        filename: t.String(),
      }),
    },
  )

app.listen(process.env.PORT || 4000, () =>
  console.log(`🦊 Server started at ${app.server?.url.origin}`),
)
