import request from '@/utils/request'

//获取顶部轮播图
export function getTopPicList(data) {
    return request({
        url: '/business/websiteImage/list',
        method: 'post',
        data
    })
}

//获取底部轮播图
export function getBottomPicList(data) {
    return request({
        url: '/business/websiteImage/list',
        method: 'post',
        data
    })
}

//获取资讯列表
export function getInformation(data) {
    return request({
        url: '/business/information/page',
        method: 'post',
        data
    })
}

//首页获取保有量
export function getStatStockList(query) {
    return request({
        url: '/business/statStock/listStatStock',
        method: 'get',
        params: query
    })
}

//首页获取销量
export function getStatSaleList(query) {
    return request({
        url: '/business/statSales/listStatSales',
        method: 'get',
        params: query
    })
}

//首页获取产量
export function getStatYieldList(query) {
    return request({
        url: '/business/statYield/listStatYield',
        method: 'get',
        params: query
    })
}

//首页获取新能源
export function getStatNewEnergyList(query) {
    return request({
        url: '/business/statNewEnergy/pieChart',
        method: 'get',
        params: query
    })
}

//首页获取二手车
export function getStatUsedCarList(query) {
    return request({
        url: '/business/statUsedCarVolume/barChart',
        method: 'get',
        params: query
    })
}

//首页获取置换
export function getStatDisplaceList(query) {
    return request({
        url: '/business/statDisplace/pieChart',
        method: 'get',
        params: query
    })
}

//获取首页调查问卷
export function getQuestion(query) {
    return request({
        url: '/business/questionnaire/getQuestionnaire',
        method: 'get',
        params: query
    })
}

//获取首页调查问卷详情
export function getQuestionDetail(query) {
    return request({
        url: '/business/questionnaire/getDetail?id=' + query,
        method: 'get'
    })
}

//首页调查问卷下载
export function getQuestionDownload(query) {
    return request({
        url: '/download/questionnaireFile/' + query,
        method: 'get'
    })
}

//根据文件地址删除文件
export function fileDelete(data){
    return request({
        url: "/upload/delFile",
        method: 'delete',
        data
    })
}

//调查问卷提交
export function getCommitAnswer(data) {
    return request({
        url: '/business/questionnaireReply',
        method: 'post',
        data
    })
}

//获取首页课程列表
export function getCourseList(data) {
    return request({
        url: '/business/train/list',
        method: 'post',
        data
    })
}