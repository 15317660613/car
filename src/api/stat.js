import request from '@/utils/request'

//获取资讯列表
export function getInformation(data) {
    return request({
        url: '/business/information/page',
        method: 'post',
        data
    })
}

//销量
export function getStatSalesList(query) {
    return request({
        url: '/business/statSales/listPassengerSales',
        method: 'get',
        params: query
    })
}

//保有量车龄分布
export function getStatStockAgeList(query) {
    return request({
        url: '/business/statStock/listVehicleAge',
        method: 'get',
        params: query
    })
}

//保有量企业
export function getStatStockCompanyList(query) {
    return request({
        url: '/business/statStock/listEnterpriseStock',
        method: 'get',
        params: query
    })
}

//产量月度表现
export function getStatMonthYieldList(query) {
    return request({
        url: '/business/statYield/listMonthYield',
        method: 'get',
        params: query
    })
}

//产量企业
export function getStatEnterpriseYieldList(query) {
    return request({
        url: '/business/statYield/listEnterpriseYield',
        method: 'get',
        params: query
    })
}

//二手车销量走势
export function getStatUsedCarSaleList(query) {
    return request({
        url: '/business/statUsedCarVolume/usedCarTrendChart',
        method: 'get',
        params: query
    })
}

//二手车省份
export function getStatUsedCarProvinceList(query) {
    return request({
        url: '/business/statUsedCarVolume/companyChart',
        method: 'get',
        params: query
    })
}
//新能源市场月度销量
export function getStatNewEnergyMonthList(query) {
    return request({
        url: '/business/statNewEnergy/salesVolume',
        method: 'get',
        params: query
    })
}
//新能源市场月度销量
export function getStatNewEnergyCompanyList(query) {
    return request({
        url: '/business/statNewEnergy/companyChart',
        method: 'get',
        params: query
    })
}
//换购后车型份额
export function getStatDisplaceBarChartList(query) {
    return request({
        url: '/business/statDisplace/barChart',
        method: 'get',
        params: query
    })
}
//换购后车型流向分析
export function getStatDisplaceVehicleFlowTo(query) {
    return request({
        url: '/business/statDisplace/vehicleFlowTo',
        method: 'get',
        params: query
    })
}