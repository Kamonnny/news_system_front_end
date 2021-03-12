import request from '@/lib/requests'

export function getNews(config) {
  return request.get('/news', config)
}

export function getNew(newsId) {
  return request.get(`/news/${newsId}`)
}

export function getNewsComments(newsId, params) {
  return request.get(`/news/${newsId}/comments`, { params })
}

export function postNewsComments(newsId, data) {
  return request.post(`/news/${newsId}/comments`, { data })
}
