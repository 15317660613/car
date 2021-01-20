import request from '@/utils/request'
//获取列表
export function getQuestionList(query) {
    return request({
        url: '/common/article',
        method: 'get',
        params: query
    })
}
//新增问题
export function createQuestion(data) {
    return request({
        url: '/common/article/add/richtxt',
        method: 'post',
        data
    })
}
//查询问题详情
export function getQuestionDetail(id) {
    return request({
        url: `/common/article/${id}`,
        method: 'get'
    })
}
//写回答
export function createAnswer(data) {
    return request({
        url: '/common/answer/add/richtxt',
        method: 'post',
        data
    })
}
//评论
export function comment(data) {
    return request({
        url: '/common/comment/add/richtxt',
        method: 'post',
        data
    })
}
//登录
export function login(data) {
    return request({
        url: '/login/login',
        method: 'post',
        data
    })
}
//注册
export function register(data) {
    return request({
        url: '/sys/user/register',
        method: 'post',
        data
    })
}
