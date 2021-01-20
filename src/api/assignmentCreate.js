import request from '@/utils/request'

//发布任务
export function getAddAssignment(data) {
    return request({
        url: '/sys/task/add/richtxt/',
        method: 'post',
        data
    })
}

//结束任务
export function getAssignmentFinish(data) {
    return request({
        url: '/sys/task/state/finish/',
        method: 'put',
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
