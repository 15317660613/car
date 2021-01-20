import request from '@/utils/request'

//列表
export function sharePage(data) {
  return request({
    url: "/business/information/page",
    method: "post",
    data
  })
};

//详情
export function shareDetail(data) {
  return request({
    url: `/business/information/${data}`,
    method: "get",
  })
};

//资讯点赞
export function informationPraisePost(data) {
  return request({
    url: "/business/informationPraise",
    method: "post",
    data
  })
};

//资讯点赞删除
export function informationPraiseDelete(data) {
    return request({
        url: `/business/informationPraise`,
        method: 'delete',
        params: data
    })
};

//资讯评论
export function informationComment(data) {
  return request({
    url: "/business/informationComment",
    method: "post",
    data
  })
};

//资讯收藏
export function informationCollectionPost(data) {
  return request({
    url: "/business/informationCollection",
    method: "post",
    data
  })
};

//资讯收藏删除
export function informationCollectionDelete(data) {
    return request({
        url: `/business/informationCollection`,
        method: 'delete',
        params: data
    })
}