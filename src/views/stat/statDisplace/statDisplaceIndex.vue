<!--置换-->
<template>
    <div>
        <div style="position: relative">
            <div style="margin: 0 auto" class="mainContainer">
                <div class="newsparent" style="">
                    <div style="display: flex;flex-flow: column;" class="chartParent">
                        <div style="border-radius: 4px;border: 1px solid #DCDFE6;">
                            <div class="chartTitle" style="display: flex;justify-content: space-between;">
                                <span>{{companyYear}}换购后车型份额</span>
                                <span style="margin-right: 20px;">单位：%</span>
                            </div>
                            <v-chart :options="polarAge" class="chartHeight"/>
                        </div>
                        <div style="border-radius: 4px;border: 1px solid #DCDFE6;margin-top: 20px">
                            <div class="chartTitle" style="display: flex;justify-content: space-between;">
                                <span>{{companyYear}}置换车型流向分析</span>
                                <span style="margin-right: 20px;">单位：%</span>
                            </div>
                            <v-chart :options="polarCompany" class="chartHeight chartHeight1"/>
                        </div>
                    </div>
                    <div style="border-radius: 6px;border: 1px solid #DCDFE6;"
                         class="baseItemWidth baseMargin">
                        <div style="width: 100%;display: flex;justify-content: space-between;padding-left: 16px;padding-right: 16px"
                             class="hotTitle">
                            <div style="display: flex">
                                <div class="cardTitleLine hotTitleMargin" style=""></div>
                                <div class="cardTitle hotTitle" style="">
                                    数据解读
                                </div>
                            </div>
                            <router-link to="/unscramble">
                                <div class="cardTitleMore hotTitle" style="">
                                    查看更多<i
                                        class="iconfont iconxingzhuangbeifen"
                                        style="font-size: 12px;margin-left: 6px"></i></div>
                            </router-link>
                        </div>
                        <div style="height: 1px;width: 100%;background-color:#DCDFE6;"></div>
                        <div v-for="(item,i) in hotArray" :key="i" style="padding-left: 16px;padding-right: 16px">
                            <div class="hotNewsTitle" :title="item.title ? item.title :''" @click="goDetail(item.id)"
                                 style="cursor: pointer">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconcar-app-thirteen"></use>
                                </svg>
                                {{item.title ? item.title :''}}
                            </div>
                            <div style="height: 1px;width: 100%;background-color:#DCDFE6;"
                                 :class="{lineMargin:(i==hotArray.size-1)}"></div>
                        </div>
                    </div>
                </div>
            </div>
            <carouselBottom/>
        </div>
    </div>
</template>

<script>
    import {
        getInformation,
        getStatDisplaceBarChartList,
        getStatDisplaceVehicleFlowTo,
    } from '@/api/stat'
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/polar'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/graphic'

    import carouselBottom from '@/views/layout/carouselTel.vue'

    export default {
        name: "Home",
        components: {
            carouselBottom,
        },
        data() {
            return {
                hotArray: [],
                lastYear: '',
                ageYear: '',
                companyYear: '',
                daliyArray: [],//每日资讯数据
                polarAge: {
                    color: ['#8FB9FC', '#4FD7CF', '#675bba'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        },
                        formatter: function (params) {
                            let returnToolTip = '';
                            params.forEach(item=>{
                                if(item.data == 'NaN'){
                                    item.data = '--'
                                }
                               returnToolTip = returnToolTip + item.seriesName + ':' + item.data + '%' + '<br>';
                            })
                            return returnToolTip;
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '3%',
                        top: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#D8E5EE',
                                width: 1,
                            }
                        },
                        axisLabel: {
                            formatter: '{value}',
                            show: true,
                            textStyle: {
                                color: '#606266',  //更改坐标轴文字颜色
                                fontSize: 12      //更改坐标轴文字大小
                            }
                        },
                        data: ['换购前结构', '换购后结构']
                    },
                    yAxis: [{
                        yAxisIndex: 0,
                        show: true,
                        type: 'value',
                        splitLine: {    //网格线
                            lineStyle: {
                                type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                            },
                            show: true //隐藏或显示
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#D8E5EE',
                                width: 1,
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#606266',  //更改坐标轴文字颜色
                                fontSize: 12      //更改坐标轴文字大小
                            }
                        },
                    }
                    ],
                    series: []
                },
                polarCompany: {
                    dataset: {
                        source: [,]
                    },
                    color: ['#409EFF', '#30CEE6', '#409EFF', '#30CEE6'],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {d}%'
                    },
                    legend: {
                        // orient: 'vertical',
                        // left: 10,
                    },
                    graphic: [{
                        type: "text",
                        left: '23.8%',
                        top: '29%',
                        style: {
                            text: '轿车',
                            textAlign: "center",
                            fill: "#000",
                            width: 30,
                            height: 30,
                            fontSize: 12
                        }
                    }, {
                        type: "text",
                        left: '73.5%',
                        top: '28%',
                        style: {
                            text: 'SUV',
                            textAlign: "center",
                            fill: "#000",
                            width: 30,
                            height: 30,
                            fontSize: 12
                        }
                    }, {
                        type: "text",
                        left: '23.5%',
                        top: '79%',
                        style: {
                            text: 'MPV',
                            textAlign: "center",
                            fill: "#000",
                            width: 30,
                            height: 30,
                            fontSize: 12
                        }
                    }, {
                        type: "text",
                        left: '73%',
                        top: '79%',
                        style: {
                            text: '交叉型',
                            textAlign: "center",
                            fill: "#000",
                            width: 30,
                            height: 30,
                            fontSize: 12
                        }
                    }],
                    series: [
                        {
                            type: 'pie',
                            radius: [30, 40],
                            center: ['25%', '30%'],
                            encode: {
                                itemName: 'product',
                                value: 'car'
                            }
                            // No encode specified, by default, it is '2012'.
                        }, {
                            type: 'pie',
                            radius: [30, 40],
                            center: ['75%', '30%'],
                            encode: {
                                itemName: 'product',
                                value: 'suv'
                            }
                        }, {
                            type: 'pie',
                            radius: [30, 40],
                            center: ['25%', '80%'],
                            encode: {
                                itemName: 'product',
                                value: 'mpv'
                            }
                        }, {
                            type: 'pie',
                            radius: [30, 40],
                            center: ['75%', '80%'],
                            encode: {
                                itemName: 'product',
                                value: 'chiasmatypy'
                            }
                        }
                    ]
                },
            }
        },
        created() {
            this.getInformation();
            this.getStatDisplaceBarChartList()
            this.getStatDisplaceVehicleFlowTo()
        },
        mounted() {

        },
        computed: {},
        methods: {
            // 跳转详情
            goDetail(data) {
                this.$router.push({
                    path: "/unscrambleDetail",
                    query: {
                        id: data,
                        type:5,
                    }
                });
            },
            //每日资讯列表
            getInformation() {
                //1：专题分享；2：每日资讯；3：热点观察；4：政策跟踪；5：数据解读
                var queryInfo = {
                    current: 1,
                    size: 10,
                    type: 5,
                    frontOrBack: 'front'
                }
                getInformation(queryInfo).then(response => {
                    this.hotArray = response.data.data.records
                })
            },
            //保有量车龄分布
            getStatDisplaceBarChartList() {
                getStatDisplaceBarChartList({}).then(response => {
                    this.ageYear = response.data.year
                    let _this = this
                    this.polarAge.series = []
                    if (response.data.share && response.data.share.length != 0) {
                        response.data.share.forEach(function (item) {
                            var index = {
                                barWidth: '20px',
                                name: item.type,
                                type: 'bar',
                                stack: '总量',
                                data: [parseFloat(item.before), parseFloat(item.last)]
                            }
                            _this.polarAge.series.push(index)
                        });
                    }
                })
            },
            //产量企业
            getStatDisplaceVehicleFlowTo() {
                getStatDisplaceVehicleFlowTo({}).then(response => {
                    console.log(response);
                    // ['product', 'car', 'suv', 'mpv', 'chiasmatypy'],
                    //     ['car', 46.1, 30.4, 65.1, 53.3],
                    //     ['suv', 86.5, 92.1, 85.7, 83.1],
                    //     ['mpv', 24.1, 67.2, 79.5, 86.4],
                    //     ['chiasmatypy', 55.2, 67.1, 69.2]

                    var car = ['轿车']
                    var suv = ['SUV']
                    var mpv = ['MPV']
                    var chiasmatypy = ['交叉型']

                    this.companyYear = response.data.year;
                    let ageMaps = []
                    var x = ['product', 'car', 'suv', 'mpv', 'chiasmatypy']
                    if (response.data.car && response.data.car.length != 0) {
                        response.data.car.forEach(function (item) {
                            if (item.LAST_VEHICLE_MODEL == '轿车') {
                                car.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == 'SUV') {
                                suv.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == 'MPV') {
                                mpv.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == '交叉型') {
                                chiasmatypy.push(item.NUMBERS)
                            }
                        });
                    }
                    if (response.data.suv && response.data.suv.length != 0) {
                        response.data.suv.forEach(function (item) {
                            if (item.LAST_VEHICLE_MODEL == '轿车') {
                                car.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == 'SUV') {
                                suv.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == 'MPV') {
                                mpv.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == '交叉型') {
                                chiasmatypy.push(item.NUMBERS)
                            }
                        });
                    }
                    if (response.data.mpv && response.data.mpv.length != 0) {
                        response.data.mpv.forEach(function (item) {
                            if (item.LAST_VEHICLE_MODEL == '轿车') {
                                car.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == 'SUV') {
                                suv.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == 'MPV') {
                                mpv.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == '交叉型') {
                                chiasmatypy.push(item.NUMBERS)
                            }
                        });
                    }
                    if (response.data.chiasmatypy && response.data.chiasmatypy.length != 0) {
                        response.data.chiasmatypy.forEach(function (item) {
                            if (item.LAST_VEHICLE_MODEL == '轿车') {
                                car.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == 'SUV') {
                                suv.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == 'MPV') {
                                mpv.push(item.NUMBERS)
                            } else if (item.LAST_VEHICLE_MODEL == '交叉型') {
                                chiasmatypy.push(item.NUMBERS)
                            }
                        });
                    }
                    ageMaps.push(x)
                    ageMaps.push(car)
                    ageMaps.push(suv)
                    ageMaps.push(mpv)
                    ageMaps.push(chiasmatypy)
                    this.polarCompany.dataset.source = ageMaps
                })
            },
        }
    }
</script>

<style scoped>

    .echarts {
        width: 100%;
        height: 100%;
    }

    /deep/ .el-carousel__button {
        height: 7px;
        border: none;
        border-radius: 100%;
        width: 7px;
        background: #fff
    }

    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    /deep/ .el-carousel__container {
        position: relative;
        height: 100%;
    }

    .lineMargin {
        margin-bottom: 10px;
    }

    @media screen and (max-width: 1367px) {
        .chartParent {
            width: 894px;
        }

        .chartHeight {
            height: 195px;
            margin: 20px;
        }

        .chartHeight1 {
            height: 285px;
            margin: 20px
        }
        
        .newsparent {
            display: flex;
            margin-top: 30px
        }

        .mainContainer {
            width: 100%;
        }

        .carouselHeight {
        }

        .baseItemWidth {
            width: 282px;
        }

        .baseMargin {
            margin-left: 24px;
        }

        .cardTitle {
            height: 18px;
            line-height: 18px;
            font-weight: 600;
            font-size: 13px;
            color: #000000;
            margin-left: 10px
        }

        .cardTitleMore {
            font-size: 11px;
            color: #8F9399;
            font-weight: 600;
            height: 18px;
            line-height: 18px;
        }

        .cardTitleLine {
            width: 3px;
            height: 15px;
            background: #3190FA;
        }

        .hotTitle {
            height: 36px;
            line-height: 36px;
        }

        .hotTitleMargin {
            margin-top: 10px
        }

        .hotNewsTitle {
            height: 15px;
            font-size: 12px;
            font-weight: 500;
            color: #303133;
            line-height: 15px;
            margin-top: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 7px;
        }

        .chartTitle {
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 15px;
            border-bottom: 1px solid #DCDFE6;
            font-size: 12px;
            font-weight: 500;
            color: #303133;
        }
    }

    @media screen and (min-width: 1368px) {
        .chartParent {
            width: 894px;
        }

        .chartHeight {
            height: 235px;
            margin: 20px
        }

        .chartHeight1 {
            height: 285px;
            margin: 20px
        }

        .baseMargin {
            margin-left: 24px;
        }

        .newsparent {
            display: flex;
            margin-top: 40px
        }

        .mainContainer {
            width: 1200px;
        }

        .carouselHeight {
        }

        .baseItemWidth {
            width: 282px;
        }

        .cardTitle {
            height: 26px;
            line-height: 26px;
            font-weight: 600;
            font-size: 16px;
            color: #000000;
            margin-left: 10px
        }

        .cardTitleMore {
            font-size: 12px;
            color: #8F9399;
            font-weight: 600;
            height: 25px;
            line-height: 25px;
        }

        .cardTitleLine {
            width: 4px;
            height: 20px;
            background: #3190FA;
            margin-top: 3px
        }

        .hotNewsTitle {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #303133;
            line-height: 20px;
            margin-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 9px;
        }

        .hotTitle {
            height: 50px;
            line-height: 50px;
        }

        .hotTitleMargin {
            margin-top: 15px
        }

        .chartTitle {
            padding-top: 7px;
            padding-bottom: 7px;
            padding-left: 20px;
            border-bottom: 1px solid #DCDFE6;
            font-size: 14px;
            font-weight: 500;
            color: #303133;
        }
    }
</style>
