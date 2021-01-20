<!--二手车-->
<template>
    <div>
        <div style="position: relative">
            <div style="margin: 0 auto" class="mainContainer">
                <div class="newsparent" style="">
                    <div style="display: flex;flex-flow: column;" class="chartParent">
                        <div style="border-radius: 4px;border: 1px solid #DCDFE6;">
                            <div class="chartTitle" style="display: flex;justify-content: space-between;">
                                <span>{{ageYear}}乘用车市场表现</span>
                                <span style="margin-right: 20px;">单位：辆</span>
                            </div>
                            <v-chart :options="polarAge" class="chartHeight"/>
                        </div>
                        <div style="border-radius: 4px;border: 1px solid #DCDFE6;margin-top: 20px">
                            <div class="chartTitle" style="display: flex;justify-content: space-between;">
                                <span>{{provinceYear}}商用车市场表现</span>
                                <span style="margin-right: 20px;">单位：辆</span>
                            </div>
                            <v-chart :options="polarType2" class="chartHeight"/>
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
        getStatSalesList,
    } from '@/api/stat'
    import {getTopPicList,} from '@/api/home'
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/polar'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'

    import carouselBottom from '@/views/layout/carouselTel.vue'

    export default {
        name: "Home",
        components: {
            carouselBottom,
        },
        data() {
            return {
                hotArray: [],
                ageYear: '',
                provinceYear: '',
                daliyArray: [],//每日资讯数据
                polarAge: {
                    color: '#66B7FF',
                    legend:{
                        data:['销量','同比'],
                        top:'-2%'
                    },
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
                                if(item.seriesName=='同比'){
                                    item.data += '%';
                                }
                               returnToolTip = returnToolTip + item.seriesName + ':' + item.data + '<br>';
                            })
                            return returnToolTip;
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '3%',
                        top: '8%',
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
                            show: true,
                            textStyle: {
                                color: '#606266',  //更改坐标轴文字颜色
                                fontSize: 12      //更改坐标轴文字大小
                            }
                        },
                        data: []
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
                    },
                        {
                            yAxisIndex: 1,
                            show: true,
                            type: 'value',
                            splitLine: {    //网格线
                                lineStyle: {
                                    type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                                },
                                show: false //隐藏或显示
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#D8E5EE',
                                    width: 1,
                                }
                            },
                            axisLabel: {
                                formatter: '{value} %',
                                show: true,
                                textStyle: {
                                    color: '#606266',
                                    fontSize: 12
                                }
                            },
                        }
                    ],
                    series: [{
                        name:'销量',
                        barWidth: '20px',
                        data: [],
                        type: 'bar'
                    },{
                        name:'同比',
                        yAxisIndex: 1,
                        data: [],
                        type: 'line'
                    }]
                },
                polarType2: {

                    color: '#66B7FF',
                    legend:{
                        data:['销量','同比'],
                        top:'-2%'
                    },
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
                                if(item.seriesName=='同比'){
                                    item.data += '%';
                                }
                               returnToolTip = returnToolTip + item.seriesName + ':' + item.data + '<br>';
                            })
                            return returnToolTip;
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '3%',
                        top: '8%',
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
                            show: true,
                            textStyle: {
                                color: '#606266',  //更改坐标轴文字颜色
                                fontSize: 12      //更改坐标轴文字大小
                            }
                        },
                        data: []
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
                    },
                        {
                            yAxisIndex: 1,
                            show: true,
                            type: 'value',
                            splitLine: {    //网格线
                                lineStyle: {
                                    type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                                },
                                show: false //隐藏或显示
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#D8E5EE',
                                    width: 1,
                                }
                            },
                            axisLabel: {
                                formatter: '{value} %',
                                show: true,
                                textStyle: {
                                    color: '#606266',
                                    fontSize: 12
                                }
                            },
                        }
                    ],
                    series: [{
                        name:'销量',
                        barWidth: '20px',
                        data: [],
                        type: 'bar'
                    },{
                        name:'同比',
                        yAxisIndex: 1,
                        data: [],
                        type: 'line'
                    }]
                }
            }
        },
        created() {
            this.getInformation();
            this.getStatSalesList1()
            this.getStatSalesList2()
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
            //乘用车销量走势
            getStatSalesList1() {
                var queryInfo = {
                    vehicleType: '乘用车'
                }
                getStatSalesList(queryInfo).then(response => {
                    let _this = this
                    _this.polarAge.series[1].data = []
                    if (response.data) {
                        _this.ageYear = response.data.year + '年' + response.data.map.monthData[0]
                        _this.polarAge.xAxis.data = response.data.map.monthData
                        _this.polarAge.series[0].data = response.data.map.curr

                        response.data.map.compara.forEach(function (item) {
                            _this.polarAge.series[1].data.push(item.replace('%', ''))
                        });
                    }
                })
            },
            //商用车
            getStatSalesList2() {
                var queryInfo = {
                    vehicleType: '商用车'
                }
                getStatSalesList(queryInfo).then(response => {
                    let _this = this
                    _this.polarType2.series[1].data = []
                    if (response.data) {
                        _this.provinceYear = response.data.year + '年' + response.data.map.monthData[0]
                        _this.polarType2.xAxis.data = response.data.map.monthData
                        _this.polarType2.series[0].data = response.data.map.curr

                        response.data.map.compara.forEach(function (item) {
                            _this.polarType2.series[1].data.push(item.replace('%', ''))
                        });
                    }
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
