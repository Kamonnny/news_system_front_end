import request from '@/lib/requests'

export function getUsers() {
  return request.get('/users')
}
