import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/sysLogin',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: `/login?token=${token}`,
        method: 'post'
    })
}

export function logout() {
    return request({
        url: '/sysLogout',
        method: 'get'
    })
}

//用户列表
export function getList(query) {
    return request({
        url: '/sys/user/page',
        method: 'get',
        params: query
    })
}

//用户审核
export function verify(data) {
    return request({
        url: '/sys/user/user/verify',
        method: 'post',
        data
    })
}

//获取用户详情
export function getUserDetail(query) {
    return request({
        url: '/sys/user/' + query,
        method: 'get',
    })
}
