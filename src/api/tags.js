import request from '@/lib/requests'

export function getTags(config) {
  return request.get('/news/tags', config)
}
