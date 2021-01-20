import request from '@/utils/request'

//已审核分页查询
export function getAssignment(query) {
  return request({
    url: '/sys/task/checked/page',
    method: 'get',
    params: query
  })
}

//任务管理
//分页查询用户接包的所有任务
export function getAllAcceptAssignment(query) {
  return request({
    url: '/sys/taskidUserid/all/page',
    method: 'get',
    params: query
  })
}
//我是雇主
//分页查询用户接包的所有任务
export function getAllPublishAssignment(query) {
  return request({
    url: '/sys/task/all/page',
    method: 'get',
    params: query
  })
}

//我是管理员
//查询后台所有任务列表
export function getAllAssignment(query) {
  return request({
    url: '/sys/task/page',
    method: 'get',
    params: query
  })
}
//任务审核
export function verify(data) {
  return request({
    url: '/sys/task/audits',
    method: 'post',
    data
  })
}






export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
