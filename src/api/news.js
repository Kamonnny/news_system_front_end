import request from '@/lib/requests'

export function getNews(config) {
  return request.get('/news', config)
}

export function getNew(newsId) {
  return request.get(`/news/${newsId}`)
}
