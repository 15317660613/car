<template>
    <div>
        <div style="position: relative">
            <el-carousel style="" arrow="never" class="carouselHeight">
                <el-carousel-item v-for="(item,index) in carouselPic" :key="index" style="cursor: pointer">
                    <el-image v-if="item.path" @click="jumpWeb(item.url)"
                              :src="'/auto-appstore/industry-knowledge/file'+ item.path"
                              style="width: 100%;height: 100%"
                    >
                    </el-image>
                    <el-image v-if="!item.path"
                              :src="'/auto-appstore/industry-knowledge/file'+ item.path"
                              style="width: 100%;height: 100%"
                    >
                    </el-image>
                    <!--<img :src="'/auto-appstore/industry-knowledge/file'+ item.path" style="width: 100%;height: 100%">-->
                </el-carousel-item>
            </el-carousel>
            <div style="margin: 0 auto" class="mainContainer">
                <div class="newsparent" style="">
                    <div style="display: flex;flex-flow: column;justify-content: space-between">
                        <div style="display: flex;">
                            <div class="baseItemWidth" style="">
                                <!--每日资讯-->
                                <div style="width: 100%;display: flex;justify-content: space-between">
                                    <div style="display: flex">
                                        <div class="cardTitleLine"></div>
                                        <div class="cardTitle">
                                            每日资讯
                                        </div>
                                    </div>
                                    <div class="cardTitleMore" @click="goMore(2)">
                                        查看更多<i
                                            class="iconfont iconxingzhuangbeifen"
                                            style="font-size: 12px;margin-left: 6px;"></i></div>

                                </div>
                                <!--daliyArray-->
                                <div v-for="(item,i) in daliyArray" :key="i" class="newsTitle"
                                     :title="item.title ? item.title :''" @click="goDetail(item.id,2)"
                                     style="cursor: pointer">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#iconbianzu5"></use>
                                    </svg>
                                    {{item.title ? item.title :''}}
                                </div>
                            </div>
                            <div class="baseItemWidth baseMargin" style="">
                                <!--政策跟踪-->
                                <div style="width: 100%;display: flex;justify-content: space-between">
                                    <div style="display: flex">
                                        <div class="cardTitleLine"></div>
                                        <div class="cardTitle">
                                            政策跟踪
                                        </div>
                                    </div>
                                    <div class="cardTitleMore" @click="goMore(4)">
                                        查看更多<i
                                            class="iconfont iconxingzhuangbeifen"
                                            style="font-size: 12px;margin-left: 6px;"></i></div>
                                </div>
                                <!--policyArray-->
                                <div v-for="(item,i) in policyArray" :key="i" class="newsTitle"
                                     :title="item.title ? item.title :''" @click="goDetail(item.id,2)"
                                     style="cursor: pointer">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#iconbianzu5"></use>
                                    </svg>
                                    {{item.title ? item.title :''}}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style="width: 100%;display: flex;justify-content: space-between;margin-top: 20px">
                                <div style="display: flex">
                                    <div class="cardTitleLine"></div>
                                    <div class="cardTitle">
                                        专题分享
                                    </div>
                                </div>
                                <router-link to="/share">
                                    <div class="cardTitleMore">
                                        查看更多<i
                                            class="iconfont iconxingzhuangbeifen"
                                            style="font-size: 12px;margin-left: 6px;"></i></div>
                                </router-link>
                            </div>
                            <div class="twobaseItemWidth" style="margin-top: 20px">
                                <div class="newsContainer" v-for="(item,i) in topicSharingArray" :key="i"
                                     style="width: 50%;"
                                     :class="{newsBorder1:  i  == 0,newsBorder2:  i  == 1,newsBorder3:  i  == 2,}">
                                    <!--专题分享-->
                                    <div style="display: flex;flex-wrap: wrap;cursor: pointer"
                                         @click="goDetail(item.id,1)">
                                        <el-image
                                                :lazy='true'
                                                class="newsImage"
                                                :src="item.thumbnail ? '/auto-appstore/industry-knowledge/file'+item.thumbnail.filePath : require('../../assets/navbar/shareList-icon.png')"
                                        >
                                            <!--:src="item.picPath ? item.picPath : require('../../assets/default_avatar.png')"-->
                                        </el-image>
                                        <div class="newsContent">
                                            <div class="newsContentTitle" :title="item.title ? item.title :''">
                                                {{item.title ? item.title :''}}
                                            </div>
                                            <div class="newsContentDesc">{{item.outline ? item.outline :''}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="border-radius: 6px;border: 1px solid #DCDFE6;"
                         class="baseItemWidth baseMargin">
                        <div style="width: 100%;display: flex;justify-content: space-between;padding-left: 16px;padding-right: 16px"
                             class="hotTitle">
                            <div style="display: flex">
                                <div class="cardTitleLine hotTitleMargin" style=""></div>
                                <div class="cardTitle hotTitle" style="">
                                    热点观察
                                </div>
                            </div>
                            <div class="cardTitleMore hotTitle" style="" @click="goMore(3)">
                                查看更多<i
                                    class="iconfont iconxingzhuangbeifen"
                                    style="font-size: 12px;margin-left: 6px;"></i></div>
                        </div>
                        <div style="height: 1px;width: 100%;background-color:#DCDFE6;"></div>
                        <div v-for="(item,i) in hotArray" :key="i" style="padding-left: 16px;padding-right: 16px">
                            <div class="hotNewsTitle" :title="item.title ? item.title :''" @click="goDetail(item.id,2)"
                                 style="cursor: pointer">
                                {{item.title ? item.title :''}}
                            </div>
                            <div style="" class="hotNewsDesc">
                                <div></div>
                                <div>2020-07-16</div>
                            </div>
                            <div style="height: 1px;width: 100%;background-color:#DCDFE6;"
                                 :class="{lineMargin:(i==hotArray.size-1)}"></div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;display: flex;justify-content: space-between;margin-top: 20px;margin-bottom: 17px">
                    <div style="display: flex">
                        <div class="cardTitleLine"></div>
                        <div class="cardTitle">
                            数据速览
                        </div>
                    </div>
                    <div class="cardTitleMore" @click="goMore(5)">
                        查看更多<i
                            class="iconfont iconxingzhuangbeifen"
                            style="font-size: 12px;margin-left: 6px"></i></div>
                </div>
                <div style="display: flex">
                    <div style="" class="baseItemWidth chartCard">
                        <div style="margin: 0 auto;text-align: center">
                            <div style="margin-top: 20px;" class="statCardTitle">{{this.statStock.title}}</div>
                            <div style="display: flex;justify-content: center;margin-top: 10px">
                                <div>
                                    <div class="statCardWordsNum">{{this.statStock.country}}</div>
                                    <div class="statCardsWordsDesc">全国</div>
                                </div>
                                <div style="margin-left: 40px">
                                    <div class="statCardWordsNum">{{this.statStock.type1}}</div>
                                    <div class="statCardsWordsDesc">乘用车</div>
                                </div>
                                <div style="margin-left: 40px">
                                    <div class="statCardWordsNum">{{this.statStock.type2?this.statStock.type2:'0'}}</div>
                                    <div class="statCardsWordsDesc">商用车</div>
                                </div>
                            </div>
                            <div style=";margin-top: 10px" class="chartHeight">
                                <v-chart :options="polar"/>
                            </div>
                            <router-link to="/stat/statStock">
                                <div class="statMore">
                                    查看更多
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div style="" class="baseItemWidth chartCard baseMargin">
                        <div style="margin: 0 auto;text-align: center">
                            <div style="margin-top: 20px;" class="statCardTitle">汽车销量数据</div>
                            <div style="display: flex;justify-content: center;margin-top: 10px">
                                <div style="">
                                    <div class="statCardWordsNum">{{statSale.type1}}</div>
                                    <div class="statCardsWordsDesc">当月销量</div>
                                </div>
                                <div style="margin-left: 40px">
                                    <div class="statCardWordsNum">{{statSale.compare}}</div>
                                    <div class="statCardsWordsDesc">同比</div>
                                </div>
                            </div>
                            <div style="margin-top: 10px" class="chartHeight">
                                <v-chart :options="salesPolar"/>
                            </div>
                            <router-link to="/stat/statSale">
                                <div class="statMore">
                                    查看更多
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div style="" class="baseItemWidth chartCard baseMargin">
                        <div style="margin: 0 auto;text-align: center">
                            <div style="margin-top: 20px;" class="statCardTitle">新能源汽车销量数据</div>
                            <div style="display: flex;justify-content: center;margin-top: 10px">
                                <div>
                                    <div class="statCardWordsNum">{{statNewEnergy.type1+statNewEnergy.type2}}</div>
                                    <div class="statCardsWordsDesc">全国</div>
                                </div>
                                <div style="margin-left: 40px">
                                    <div class="statCardWordsNum">{{statNewEnergy.type1}}</div>
                                    <div class="statCardsWordsDesc">乘用车</div>
                                </div>
                                <div style="margin-left: 40px">
                                    <div class="statCardWordsNum">{{statNewEnergy.type2}}</div>
                                    <div class="statCardsWordsDesc">商用车</div>
                                </div>
                            </div>
                            <div style="margin-top: 10px" class="chartHeight">
                                <v-chart :options="polarNewEnergy"/>
                            </div>
                            <router-link to="/stat/statNewEnergy">
                                <div class="statMore">
                                    查看更多
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div style="display: flex;margin-top: 20px">
                    <div style="" class="baseItemWidth chartCard">
                        <div style="margin: 0 auto;text-align: center">
                            <div style="margin-top: 20px;" class="statCardTitle">汽车产量数据</div>
                            <div style="display: flex;justify-content: center;margin-top: 10px">
                                <div style="">
                                    <div class="statCardWordsNum">{{statYield.type1}}</div>
                                    <div class="statCardsWordsDesc">当月产量</div>
                                </div>
                                <div style="margin-left: 40px">
                                    <div class="statCardWordsNum">{{statYield.compare}}</div>
                                    <div class="statCardsWordsDesc">同比</div>
                                </div>
                            </div>
                            <div style="margin-top: 10px" class="chartHeight">
                                <v-chart :options="yieldPolar"/>
                            </div>
                            <router-link to="/stat/statYield">
                                <div class="statMore">
                                    查看更多
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div style="" class="baseItemWidth chartCard baseMargin">
                        <div style="margin: 0 auto;text-align: center">
                            <div style="margin-top: 20px;" class="statCardTitle">换购来源份额</div>
                            <div style="display: flex;justify-content: center;margin-top: 10px">
                                <div>
                                    <div class="statCardWordsNum">{{statDisplace.type1}}</div>
                                    <div class="statCardsWordsDesc">10万以下</div>
                                </div>
                            </div>
                            <div style="margin-top: 10px" class="chartHeight">
                                <v-chart :options="displacePolar"/>
                            </div>
                            <router-link to="/stat/statDisplace">
                                <div class="statMore">
                                    查看更多
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div style="" class="baseItemWidth chartCard baseMargin">
                        <div style="margin: 0 auto;text-align: center">
                            <div style="margin-top: 20px;" class="statCardTitle">二手车销量数据</div>
                            <div style="display: flex;justify-content: center;margin-top: 10px">
                                <div>
                                    <div class="statCardWordsNum">{{statUsedCar.type1}}</div>
                                    <div class="statCardsWordsDesc">当月交易量</div>
                                </div>
                                <div style="margin-left: 40px">
                                    <div class="statCardWordsNum">{{statUsedCar.type2}}</div>
                                    <div class="statCardsWordsDesc">同比</div>
                                </div>
                            </div>
                            <div style="margin-top: 10px" class="chartHeight">
                                <v-chart :options="polarUsedCar"/>
                            </div>
                            <router-link to="/stat/statUsedCar">
                                <div class="statMore">
                                    查看更多
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;display: flex;justify-content: space-between;margin-top: 20px;margin-bottom: 17px">
                    <div style="display: flex">
                        <div class="cardTitleLine"></div>
                        <div class="cardTitle">
                            课程培训
                        </div>
                    </div>
                    <router-link to="/train">
                        <div class="cardTitleMore">
                            查看更多<i
                                class="iconfont iconxingzhuangbeifen"
                                style="font-size: 12px;margin-left: 6px"></i></div>
                    </router-link>
                </div>
                <div style="display: flex">
                    <!--调查问卷-->
                    <div style="" class="cousrItemWidth chartCard baseMarginRight" v-if="question">
                        <div class="questionPic" style="">
                            学习答疑<br>调查问卷
                        </div>
                        <div class="courseTitle">填写并上传调查问卷，获得专家答疑</div>
                        <div class="statMore"
                             style="margin-top: -10px;text-align: center;background: #418CEE;color: #ffffff; cursor: pointer"
                             @click="newAddFunc">
                            填写问卷
                        </div>
                    </div>
                    <!--课程列表-->
                    <div style="cursor: pointer" class="cousrItemWidth chartCard" v-for="(item,i) in courseArray"
                         @click="goTrainDetail(item.id)"
                         :class="{baseMargin:  i  != 0}">
                        <el-image
                                :lazy='true'
                                class="questionPic"
                                style="width: 100%;background: none;padding: 0"
                                :src="'/auto-appstore/industry-knowledge/file' + item.picPath"
                        >
                        </el-image>
                        <div class="courseTitle">{{item.title}}</div>
                        <div class="courseTime"><i class="el-icon-time"></i>{{item.videoDuration}}</div>
                    </div>
                </div>
                <carouselBottom/>
                <div style="margin-top: 20px;margin-bottom: 20px;font-size: 14px;color: #000;display: flex">
                    友情链接：
                    <div style="color: #606266;">中汽数据有限公司</div>
                    <div style="line-height: 15px;margin-left: 5px;margin-right: 5px">|</div>
                    <div style="color: #606266;">联盟网站</div>
                </div>
            </div>
        </div>
        <div class="component-container">
            <newAdd @refresh="refresh" ref="newAddDialog"></newAdd>
        </div>
    </div>
</template>

<script>
    import {
        getTopPicList,
        getInformation,
        getStatStockList,
        getStatSaleList,
        getStatYieldList,
        getStatNewEnergyList,
        getStatDisplaceList,
        getStatUsedCarList,
        getQuestion,
        getCourseList
    } from '@/api/home'
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/polar'
    import 'echarts/lib/component/tooltip'

    import carouselBottom from '@/views/layout/carouselTel.vue'

    // 新增页面
    import newAdd from './questionAdd';

    export default {
        name: "Home",
        components: {
            carouselBottom, newAdd
        },
        data() {
            return {
                carouselPic: [],
                daliyArray: [],//每日资讯数据
                policyArray: [],//政策跟踪数据
                hotArray: [],//热点数据
                topicSharingArray: [],//专题分享数据
                question: {},
                courseArray: [],//课程培训
                activeName: 'first',
                statStock: {
                    title: '',
                    country: '',
                    type1: '',//乘用车
                    type2: '',//商用车
                },//保有量
                statStockMaps: [],
                statSales: {
                    title: '',
                    country: '',
                    type1: '',//乘用车
                    type2: '',//商用车
                },//保有量
                statSalesMaps: [],
                statNewEnergy: {
                    title: '',
                    country: '',
                    type1: '',//乘用车
                    type2: '',//商用车
                },//新能源
                statNewEnergyMaps: [],
                statDisplace: {
                    title: '',
                    country: '',
                    type1: '',
                    type2: '',
                },//置换
                statUsedCarMaps: [],
                statUsedCar: {
                    title: '',
                    country: '',
                    type1: '',
                    type2: '',
                },//二手车
                statDisplaceMaps: [],
                statSale: {
                    title: '',
                    country: '',
                    compare: '',//同比
                    type1: '',//乘用车
                    type2: '',//商用车
                },//销量
                statYield: {
                    title: '',
                    country: '',
                    compare: '',//同比
                    type1: '',//乘用车
                    type2: '',//商用车
                },//产量
                polar: {
                    color: ['#409EFF', '#30CEE6'],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        // data: ['商用车', '乘用车']
                    },
                    series: [
                        {
                            name: '保有量',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            data: []
                        }
                    ]
                },
                salesPolar: {
                    color: '#66B7FF',
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}年: {c} '
                    },
                    grid: {
                        left: '23%',
                        right: '27%',
                        bottom: '3%',
                        top: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick:{       //y轴刻度线
                            show:false
                        },
                        // data: ['2019', '2020']
                    },
                    yAxis: {
                        show: false,
                        type: 'value'
                    },
                    series: [{
                        barWidth: '20px',
                        data: [],
                        type: 'bar'
                    }]
                },
                yieldPolar: {
                    color: '#66B7FF',
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}年: {c} '
                    },
                    grid: {
                        left: '23%',
                        right: '27%',
                        bottom: '3%',
                        top: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick:{       //y轴刻度线
                            show:false
                        },
                        // data: ['2019', '2020']
                    },
                    yAxis: {
                        show: false,
                        type: 'value'
                    },
                    series: [{
                        barWidth: '20px',
                        data: [],
                        type: 'bar'
                    }]
                },
                polarUsedCar: {
                    color: '#66B7FF',
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}年: {c} '
                    },
                    grid: {
                        left: '23%',
                        right: '27%',
                        bottom: '3%',
                        top: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick:{       //y轴刻度线
                            show:false
                        },
                        // data: ['2019', '2020']
                    },
                    yAxis: {
                        show: false,
                        type: 'value'
                    },
                    series: [{
                        barWidth: '20px',
                        data: [],
                        type: 'bar'
                    }]
                },
                polarNewEnergy: {
                    color: ['#409EFF', '#30CEE6'],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        // data: ['商用车', '乘用车']
                    },
                    series: [
                        {
                            name: '新能源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            data: []
                        }
                    ]
                },
                displacePolar: {
                    color: ['#409EFF', '#30CEE6'],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        // data: ['商用车', '乘用车']
                    },
                    series: [
                        {
                            name: '置换',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            data: []
                        }
                    ]
                },
            }
        },
        created() {
            this.getTopPicList();
            this.getTopicSharingList()
            //获取每日资讯
            this.getDaliyList()
            //获取政策跟踪
            this.getPolicyList()
            //获取政策跟踪
            this.getHotList()
            //获取保有量数据
            this.getStatStockList()
            //获取销量数据
            this.getStatSaleList()
            //获取产量数据
            this.getStatYieldList()
            //获取新能源数据
            this.getStatNewEnergyList()
            //获二手车数据
            this.getStatUsedCarList()
            //获取置换数据
            this.getStatDisplaceList()
            //获取调查问卷
            this.getQuestion()
        },
        mounted() {
            
        },
        computed: {},
        methods: {
            jumpWeb(url) {
                if(url){
                    window.open(url);
                }
                
            },
            goTrainDetail(id) {
                this.$router.push({name: "CourseDetail", params: {id: id}});
            },
            goMore(type) {
                if(type==5){
                    this.$router.push("/stat/statStock");
                }else{
                   this.$router.push({
                        path: "/hotSpot",
                        query: {
                            type: type //1每日资讯   2热点观察 3政策跟踪
                        }
                    }); 
                }
                
            },
            // 跳转详情
            goDetail(data,type) {
                this.$router.push({
                    path: "/unscrambleDetail",
                    query: {
                        id: data,
                        type:type
                    }
                });
            },
            // 新增
            newAddFunc() {
                this.$refs['newAddDialog'].defaultfunc(this.question);
            },
            refresh() {
                //获取调查问卷
                this.question = {}
                this.getQuestion()
            },
            //获取轮播图
            getTopPicList() {
                var info = {
                    entity: {
                        type: 1,
                        status: 1
                    }
                }
                getTopPicList(info).then(response => {
                    this.carouselPic = response.data
                })
            },
            //每日资讯列表
            getDaliyList() {
                //1：专题分享；2：每日资讯；3：热点观察；4：政策跟踪；5：数据解读
                var queryInfo = {
                    current: 1,
                    size: 6,
                    type: 2,
                    status: 4,
                    frontOrBack: 'front'
                }
                getInformation(queryInfo).then(response => {
                    this.daliyArray = response.data.data.records
                })
            },
            //政策跟踪列表
            getPolicyList() {
                //1：专题分享；2：每日资讯；3：热点观察；4：政策跟踪；5：数据解读
                var queryInfo = {
                    current: 1,
                    size: 6,
                    type: 4,
                    status: 4,
                    frontOrBack: 'front'
                }
                getInformation(queryInfo).then(response => {
                    this.policyArray = response.data.data.records
                })
            },
            //政策跟踪列表
            getHotList() {
                //1：专题分享；2：每日资讯；3：热点观察；4：政策跟踪；5：数据解读
                var queryInfo = {
                    current: 1,
                    size: 8,
                    type: 3,
                    status: 4,
                    frontOrBack: 'front'
                }
                getInformation(queryInfo).then(response => {
                    this.hotArray = response.data.data.records
                })
            },
            //专题分享列表
            getTopicSharingList() {
                //1：专题分享；2：每日资讯；3：热点观察；4：政策跟踪；5：数据解读
                var queryInfo = {
                    current: 1,
                    size: 4,
                    type: 1,
                    status: 4,
                    frontOrBack: 'front'
                }
                getInformation(queryInfo).then(response => {
                    this.topicSharingArray = response.data.data.records
                })
            },
            //调查问卷
            getQuestion() {
                getQuestion().then(response => {
                    this.question = response.data
                    //获取课程
                    //无调查问卷时视频查询4条数据
                    this.getCourseList(this.question ? 3 : 4)
                })
            },
            //课程培训列表
            getCourseList(size) {
                //1：专题分享；2：每日资讯；3：热点观察；4：政策跟踪；5：数据解读
                var queryInfo = {
                    current: 1,
                    size: size,
                    entity: {
                        delFlag: 0,
                        status: 4
                    },
                }
                getCourseList(queryInfo).then(response => {
                    this.courseArray = response.data.records
                })
            },
            //保有量
            getStatStockList() {
                getStatStockList({}).then(response => {
                    let _this = this
                    this.statStock.title = response.data.year + '年' + response.data.month + '月全国汽车保有量'
                    this.statStock.country = response.data.country
                    //乘用车
                    _this.statStockMaps = []
                    if (response.data.maps && response.data.maps.length != 0) {
                        response.data.maps.forEach(function (item) {
                            if (item.VEHICLETYPE === "乘用车") {
                                _this.statStock.type1 = item.SUM
                            } else if (item.VEHICLETYPE === "商用车") {
                                _this.statStock.type2 = item.SUM
                            }
                            var index = {}
                            index.name = item.VEHICLETYPE
                            index.value = item.SUM
                            _this.statStockMaps.push(index)
                        });
                        this.polar.series[0].data = _this.statStockMaps

                    }
                })
            },
            //销量
            getStatSaleList() {
                getStatSaleList({}).then(response => {
                    let _this = this
                    this.statSale.title = response.data.year + '年' + response.data.month + '月汽车销量数据'
                    this.statSale.country = response.data.country
                    this.statSale.compare = response.data.compare
                    //乘用车
                    let statSalesMaps = []
                    if (response.data.maps && response.data.maps.length != 0) {
                        response.data.maps.forEach(function (item) {
                            if (item.YEAR === response.data.year) {
                                _this.statSale.type1 = item.SUM
                            }
                            var index = {}
                            index.name = item.YEAR
                            index.value = item.SUM
                            statSalesMaps.push(index)
                        });
                        this.salesPolar.series[0].data = statSalesMaps
                        let salexAxisData = [];
                        response.data.maps.forEach(item=>{
                            salexAxisData.push(item.YEAR+'.'+response.data.month)
                        })
                        this.salesPolar.xAxis.data = salexAxisData

                    }
                })
            },
            //产量
            getStatYieldList() {
                getStatYieldList({}).then(response => {
                    let _this = this
                    this.statYield.title = response.data.year + '年' + response.data.month + '月汽车产量数据'
                    this.statYield.country = response.data.country
                    this.statYield.compare = response.data.compare
                    //乘用车
                    let statYieldMaps = []
                    if (response.data.maps && response.data.maps.length != 0) {
                        response.data.maps.forEach(function (item) {
                            if (item.YEAR === response.data.year) {
                                _this.statYield.type1 = item.SUM
                            }
                            var index = {}
                            index.name = item.YEAR
                            index.value = item.SUM
                            statYieldMaps.push(index)
                        });
                        this.yieldPolar.series[0].data = statYieldMaps

                        let YieldxAxisData = [];
                        response.data.maps.forEach(item=>{
                            YieldxAxisData.push(item.YEAR+'.'+response.data.month)
                        })
                        this.yieldPolar.xAxis.data = YieldxAxisData
                    }
                })
            },
            //新能源
            getStatNewEnergyList() {
                getStatNewEnergyList({}).then(response => {
                    let _this = this
                    // this.statNewEnergy.title = response.data.year + '年' + response.data.month + '月汽车销量数据'
                    // this.statNewEnergy.country = response.data.country
                    //乘用车
                    _this.statNewEnergyMaps = []
                    if (response.data && response.data.length != 0) {
                        response.data.forEach(function (item) {
                            if (item.VEHICLE_TYPE === "乘用车") {
                                _this.statNewEnergy.type1 = item.SUM
                            } else if (item.VEHICLE_TYPE === "商用车") {
                                _this.statNewEnergy.type2 = item.SUM
                            }
                            var index = {}
                            index.name = item.VEHICLE_TYPE
                            index.value = item.SUM
                            _this.statNewEnergyMaps.push(index)
                        });
                        this.polarNewEnergy.series[0].data = _this.statNewEnergyMaps

                    }
                })
            },
            //二手车
            getStatUsedCarList() {
                getStatUsedCarList({}).then(response => {
                    let _this = this
                    _this.statUsedCarMaps = []
                    if (response.data) {
                        _this.statUsedCar.type1 = response.data.now
                        _this.statUsedCar.type2 = response.data.volume == 'NaN' ? '-' : response.data.volume

                        response.data.map.forEach(function (item) {
                            var index = {}
                            index.name = item.year
                            index.value = item.value
                            _this.statUsedCarMaps.push(index)
                        });

                        this.polarUsedCar.series[0].data = _this.statUsedCarMaps

                        let UsedCarxAxisData = [];
                        response.data.map.forEach(item=>{
                            UsedCarxAxisData.push(item.year+'.'+item.month)
                        })
                        this.polarUsedCar.xAxis.data = UsedCarxAxisData

                    }
                })
            },
            //置换
            getStatDisplaceList() {
                getStatDisplaceList({}).then(response => {
                    let _this = this
                    _this.statDisplaceMaps = []
                    if (response.data) {
                        _this.statDisplace.type1 = response.data.wanyixia
                        var index1 = {}
                        index1.name = '10万以下'
                        index1.value = response.data.wanyixia
                        _this.statDisplaceMaps.push(index1)
                        var index2 = {}
                        index2.name = '其他'
                        index2.value = response.data.zonghe
                        _this.statDisplaceMaps.push(index2)
                        this.displacePolar.series[0].data = _this.statDisplaceMaps

                    }
                })
            },
            //分页查询
            pageQuery() {
                this.getList(this.copyQuery)
            },
            //查看任务详情
            jumpToDetail(row) {
                this.$router.push({name: "AssignmentDetail", params: {id: row.id}});
            },
            //新建任务
            createTask() {
                this.$router.push({name: "AssignmentCreate"});
            },
            drawLineStock() {
                let myChart1Div = document.getElementById('myChart1')
                let myChart1 = this.$echarts.init(myChart1Div)
            }
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

    .newsBorder1 {
        border-right: 1px solid #DCDFE6;
        border-bottom: 1px solid #DCDFE6;
    }

    .newsBorder2 {
        border-bottom: 1px solid #DCDFE6;
    }

    .newsBorder3 {
        border-right: 1px solid #DCDFE6;
    }

    .newsContainer:hover {
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
    }

    /deep/ .el-carousel__container {
        position: relative;
        height: 100%;
    }

    .lineMargin {
        margin-bottom: 10px;
    }

    .chartCard {
        border-radius: 6px;
        border: 1px solid #DCDFE6;
    }

    .chartCard:hover {
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
    }

    @media screen and (max-width: 1367px) {
        .chartHeight {
            height: 100px
        }

        .newsparent {
            display: flex;
            margin-top: 30px
        }

        .newsContainer {
            height: 100px;
        }

        .mainContainer {
            width: 854px;
        }

        .carouselHeight {
            height: 346px;
        }

        .baseItemWidth {
            width: 274px;
        }

        .twobaseItemWidth {
            margin-top: 10px;
            height: 200px;
            width: 564px;
            display: flex;
            flex-wrap: wrap;
            border-radius: 6px;
            border: 1px solid #DCDFE6;
        }

        .baseMargin {
            margin-left: 18px;
        }

        .baseMarginRight {
            margin-right: 18px;
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
            cursor: pointer;
        }

        .cardTitleLine {
            width: 3px;
            height: 15px;
            background: #3190FA;
        }

        .newsTitle {
            margin-top: 13px;
            height: 15px;
            line-height: 15px;
            font-size: 12px;
            font-weight: 500;
            color: #606266;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .newsImage {
            border-radius: 6px;
            width: 93px;
            height: 77px;
            margin: 12px;
        }

        .newsContent {
            width: calc(100% - 117px);
            padding-top: 22px;
            padding-bottom: 22px;
            padding-right: 12px;
        }

        .newsContentTitle {
            height: 15px;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #303133;
            line-height: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .newsContentDesc {
            height: 45px;
            font-size: 11px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #606266;
            line-height: 15px;
            margin-top: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }

        .hotTitle {
            height: 36px;
            line-height: 36px;
        }

        .hotTitleMargin {
            margin-top: 10px
        }

        .cousrItemWidth {
            width: 200px;
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

        .hotNewsDesc {
            display: flex;
            justify-content: space-between;
            height: 13px;
            font-size: 10px;
            font-weight: 500;
            color: #8F9399;
            line-height: 13px;
            margin-top: 7px;
            margin-bottom: 7px;
        }

        .statCardTitle {
            height: 16px;
            font-size: 12px;
            font-weight: 500;
            color: #303133;
            line-height: 16px;
        }

        .statCardWordsNum {
            height: 20px;
            font-size: 14px;
            font-weight: 600;
            color: #303133;
            line-height: 20px;
        }

        .statCardsWordsDesc {
            height: 12px;
            font-size: 10px;
            font-weight: 500;
            color: #8F9399;
            line-height: 12px;
        }

        .statMore {
            margin: 0 auto;
            width: 71px;
            height: 24px;
            margin-top: 10px;
            line-height: 24px;
            border-radius: 4px;
            border: 1px solid #418CEE;
            font-size: 10px;
            font-weight: 500;
            color: #418CEE;
            margin-bottom: 15px;
        }

        .courseTitle {
            padding-left: 10px;
            padding-right: 10px;
            height: 28px;
            font-size: 11px;
            font-weight: 500;
            color: #303133;
            line-height: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 10px;
            margin-bottom: 5px;
        }

        .courseTime {
            padding-left: 10px;
            padding-right: 10px;
            height: 14px;
            font-size: 10px;
            font-weight: 500;
            color: #8F9399;
            line-height: 14px;
        }

        .questionPic {
            width: 100%;
            height: 111px;
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
            background: url(../../assets/bg_question.png) no-repeat 10%;
            font-size: 17px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 26px;
            letter-spacing: 2px;
            text-align: center;
            padding-top: 30px;
        }
    }

    @media screen and (min-width: 1368px) {
        .chartHeight {
            height: 140px
        }

        .baseMargin {
            margin-left: 24px;
        }

        .baseMarginRight {
            margin-right: 24px;
        }

        .newsparent {
            display: flex;
            margin-top: 40px
        }

        .newsContainer {
            height: 140px;
        }

        .mainContainer {
            width: 1200px;
        }

        .carouselHeight {
            height: 486px;
        }

        .cousrItemWidth {
            width: 282px;
        }

        .baseItemWidth {
            width: 384px;
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
            cursor: pointer;
        }

        .cardTitleLine {
            width: 4px;
            height: 20px;
            background: #3190FA;
            margin-top: 3px
        }

        .newsTitle {
            margin-top: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #606266;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .hotNewsDesc {
            display: flex;
            justify-content: space-between;
            height: 17px;
            font-size: 12px;
            font-weight: 500;
            color: #8F9399;
            line-height: 17px;
            margin-top: 9px;
            margin-bottom: 9px;
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

        .twobaseItemWidth {
            margin-top: 15px;
            height: 280px;
            width: 792px;
            display: flex;
            flex-wrap: wrap;
            border-radius: 6px;
            border: 1px solid #DCDFE6;
        }

        .newsImage {
            border-radius: 6px;
            width: 130px;
            height: 108px;
            margin: 16px;
        }

        .newsContent {
            width: calc(100% - 162px);
            padding-top: 26px;
            padding-right: 16px;
            padding-top: 26px;
        }

        .newsContentTitle {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #303133;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .newsContentDesc {
            height: 60px;
            font-size: 12px;
            font-weight: 500;
            color: #606266;
            line-height: 20px;
            margin-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;

        }

        .hotTitle {
            height: 50px;
            line-height: 50px;
        }

        .hotTitleMargin {
            margin-top: 15px
        }

        .statCardTitle {
            height: 22px;
            font-size: 16px;
            font-weight: 500;
            color: #303133;
            line-height: 22px;
        }

        .statCardWordsNum {
            height: 28px;
            font-size: 20px;
            font-weight: 600;
            color: #303133;
            line-height: 28px;
        }

        .statCardsWordsDesc {
            height: 17px;
            font-size: 12px;
            font-weight: 500;
            color: #8F9399;
            line-height: 17px;
        }

        .statMore {
            margin: 0 auto;
            width: 100px;
            height: 34px;
            margin-top: 15px;
            line-height: 34px;
            border-radius: 4px;
            border: 1px solid #418CEE;
            font-size: 14px;
            font-weight: 500;
            color: #418CEE;
            margin-bottom: 20px;
        }

        .courseTitle {
            padding-left: 15px;
            padding-right: 15px;
            height: 40px;
            font-size: 14px;
            font-weight: 500;
            color: #303133;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 10px;
            margin-bottom: 5px;
        }

        .courseTime {
            padding-left: 15px;
            padding-right: 15px;
            height: 17px;
            font-size: 12px;
            font-weight: 500;
            color: #8F9399;
            line-height: 17px;
        }

        .questionPic {
            width: 100%;
            height: 156px;
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
            background: url(../../assets/bg_question.png) no-repeat 10%;
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 36px;
            letter-spacing: 2px;
            text-align: center;
            padding-top: 40px;
        }
    }
</style>
