import request from '@/lib/requests'

export function getNews(config) {
  return request.get('/news', config)
}
