import request from '@/utils/request'

// 收藏的资讯
export function informationCollectionpage(data) {
    return request({
        url: '/business/informationCollection/page',
        method: 'post',
        data
    })
}

// 评论的资讯
export function informationCommentpage(data) {
    return request({
        url: '/business/informationComment/page',
        method: 'post',
        data
    })
}

// 收藏的课程
export function trainpageTrainCollection(data) {
    return request({
        url: '/business/train/pageTrainCollection',
        method: 'get',
        params: data
    })
}

// 评论的课程
export function trainpageTrainComment(data) {
    return request({
        url: '/business/train/pageTrainComment',
        method: 'get',
        params: data
    })
}

// 消息列表  分页查询
export function noticepage(data) {
    return request({
        url: '/business/notice/page',
        method: 'post',
        data
    })
}

//在线反馈
export function feedback(data) {
    return request({
        url: '/business/feedback',
        method: 'post',
        data
    })
}

//修改密码
export function staffupdatePsw(data) {
    return request({
        url: '/sys/staff/updatePsw',
        method: 'post',
        data
    })
}

// 修改消息状态
export function notice(data) {
    return request({
        url: "/business/notice/update",
        method: "put",
        params:data
    })
}