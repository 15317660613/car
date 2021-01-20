import request from '@/utils/request'

//获取任务详情
export function getAssignmentDetail(data) {
    return request({
        url: '/sys/task/detail/' + data,
        method: 'get',
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
//结束接包
export function getAssignmentAcceptFinish(data) {
    return request({
        url: '/sys/task/accept/finish/',
        method: 'put',
        data
    })
}
//接包
export function accept(data) {
    return request({
        url: '/sys/task/accept/',
        method: 'post',
        data
    })
}
//个人用户完善注册信息
export function register(data) {
    return request({
        url: '/sys/user/reregister',
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
//我是雇主
//根据任务id查询当前任务的任务接包人
export function getAcceptAssignmentUser(query) {
    return request({
        url: '/sys/taskidUserid',
        method: 'get',
        params: query
    })
}
//选取接包人并发送富文本
export function postAssignmentUser(data) {
    return request({
        url: '/sys/taskidUserid/choose/richtxt',
        method: 'post',
        data
    })
}
//选取中标对象并发送富文本
export function postWintenderAssignmentUser(data) {
    return request({
        url: '/sys/taskidUserid/wintender/richtxt',
        method: 'post',
        data
    })
}
//任务评价
export function getAssignmentComment(data) {
    return request({
        url: '/sys/task/state/comment/richtxt',
        method: 'put',
        data
    })
}

//我是技术
//上传招标文件
export function postInvitetendersFile(data) {
    return request({
        url: '/sys/invitetendersFile',
        method: 'post',
        data
    })
}