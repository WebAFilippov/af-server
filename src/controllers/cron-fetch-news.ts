import cron, { Patterns } from '@elysiajs/cron'
import { fetchNews } from '../shared/api'
import { FETCH_NEWS_URL } from '../shared/config'
import { parseRSS } from '../lib/parseRSS'
import { NewsService } from '../service/news'

export const cronFetchNews = cron({
  name: 'fetchNews',
  pattern: Patterns.everyMinute(),
  run: async () => {
    try {
      const startFetch = performance.now()
      const response = await fetchNews(FETCH_NEWS_URL)
      if (!response.ok) throw new Error('Network is bad')

      const xml = await response.text()

      const news = await parseRSS(xml)

      const startUpsert = performance.now()
      await NewsService.upsertNews(news)
      const endUpsert = performance.now()
      console.log(
        `Время сохранения: ${(endUpsert - startUpsert).toFixed(2)} мс`,
      )
      console.log(`Общее время: ${(endUpsert - startFetch).toFixed(2)} мс`)
    } catch (error) {
      console.log(`Error cron_fetch_news: ${error}`)
    }
  },
})
