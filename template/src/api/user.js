import request from './request'

export function getUserList (params) {
  return request.get('/user/list.do', params)
}
