import request from '@/utils/request'

//列表
export function getList(data) {
    return request({
        url: '/business/train/list',
        method: 'post',
        data
    })
}

//详情
export function getCourseDetail(id) {
    return request({
        url: `/business/train/portal/${id}`,
        method: 'get'
    })
}

//点赞
export function dianzan(data) {
    return request({
        url: `/business/trainPraise`,
        method: 'post',
        data
    })
}

//取消点赞
export function canceldianzan(data) {
    return request({
        url: `/business/trainPraise`,
        method: 'delete',
        params: data
    })
}

//评论
export function makeComment(data) {
    return request({
        url: `/business/trainComment`,
        method: 'post',
        data
    })
}

//收藏
export function collection(data) {
    return request({
        url: `/business/trainCollection`,
        method: 'post',
        data
    })
}

//取消收藏
export function cancelcollection(data) {
    return request({
        url: `/business/trainCollection`,
        method: 'delete',
        params: data
    })
}


