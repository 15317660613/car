<template>
    <div class="mainBody">
        <el-tabs class="toptabs" v-model="activeItem" @tab-click="handleClick">
            <el-tab-pane label="每日资讯" name="DailyNews">
                <div v-for="item in DailyNewsList">
                    <div class="mywrapper" @click="goDetail(item.id)">
                        <div class="myleft">
                            <img v-if="item.thumbnail" style="width: 100%;height: 100%;" :src='baseUrl + item.thumbnail.filePath' />
                            <img v-if="!item.thumbnail" style="width: 100%;height: 100%;" src="../assets/navbar/DailyNews-icon.png" />
                        </div>
                        <div class="myright">
                            <p>
                                <span class="listTitle">{{item.title}}</span>
                                <span class="listTime">{{item.createdTime}}</span>
                                <span class="listDetail ">查看详情 <i class="iconfont iconcar-app-four" style="font-size: 12px;"></i></span>
                            </p>
                            <p class="listIntroduce">{{item.outline}}</p>
                        </div>
                    </div>
                    <el-divider></el-divider>
                </div>
            </el-tab-pane>
            <el-tab-pane label="热点观察" name="HotSpotObservation">
                <div v-for="item in HotSpotObservationList">
                    <div class="mywrapper" @click="goDetail(item.id)">
                        <div class="myleft">
                            <img v-if="item.thumbnail" style="width: 100%;height: 100%;" :src='baseUrl + item.thumbnail.filePath' />
                            <img v-if="!item.thumbnail" style="width: 100%;height: 100%;" src="../assets/navbar/HotSpotObservation-icon.png">
                        </div>
                        <div class="myright">
                            <p>
                                <span class="listTitle">{{item.title}}</span>
                                <span class="listTime">{{item.createdTime}}</span>
                                <span class="listDetail ">查看详情 <i class="iconfont iconcar-app-four" style="font-size: 12px;"></i></span>
                            </p>
                            <p class="listIntroduce">{{item.outline}}</p>
                        </div>
                    </div>
                    <el-divider></el-divider>
                </div>
            </el-tab-pane>
            <el-tab-pane label="政策跟踪" name="PolicyTracking">
                <div v-for="item in PolicyTrackingList">
                    <div class="mywrapper" @click="goDetail(item.id)">
                        <div class="myleft">
                            <img v-if="item.thumbnail" style="width: 100%;height: 100%;" :src='baseUrl + item.thumbnail.filePath' />
                            <img v-if="!item.thumbnail" style="width: 100%;height: 100%;" src="../assets/navbar/PolicyTracking-icon.png">
                        </div>
                        <div class="myright">
                            <p>
                                <span class="listTitle">{{item.title}}</span>
                                <span class="listTime">{{item.createdTime}}</span>
                                <span class="listDetail ">查看详情 <i class="iconfont iconcar-app-four" style="font-size: 12px;"></i></span>
                            </p>
                            <p class="listIntroduce">{{item.outline}}</p>
                        </div>
                    </div>
                    <el-divider></el-divider>
                </div>
            </el-tab-pane>
        </el-tabs>
        <pagination v-show="total>0" :total="total" :layout="'prev, pager, next'" :page.sync="page.current" :limit.sync="page.size"
            @pagination="getListData()" style="text-align: center"/>
        <!-- 底部广告区 -->
        <carouselBottom />
    </div>
</template>

<script>
    import {sharePage} from '@/api/share'
    import Pagination from '@/components/Pagination'
    import carouselBottom from '@/views/layout/carouselTel.vue'
    export default {
        name: 'hotSpot',
        data() {

            return {
                activeItem:'DailyNews',
                page: {
                    current: 1,
                    size: 5,
                    type:2,
                    status:4,
                    frontOrBack:'front',
                },
                DailyNewsList:[],
                HotSpotObservationList:[],
                PolicyTrackingList:[],
                total:0,
                baseUrl:'/auto-appstore/industry-knowledge/file',
            }
        },
        props: { },
        components: {Pagination,carouselBottom},
        mounted() {
            let thistype = this.$route.query.type;
            if(thistype){
                this.page.type = thistype;
                if(thistype == 2){
                    this.activeItem = 'DailyNews';
                };
                if(thistype == 3){
                    this.activeItem = 'HotSpotObservation';
                };
                if(thistype == 4){
                    this.activeItem = 'PolicyTracking';
                };
            }
            this.getListData();
        },
        methods: {
            // 默认执行的请求表格方法
            getListData(){
                sharePage(this.page).then((res) => {
                    if(this.page.type==2){
                        this.DailyNewsList = res.data.data.records;
                    }else if(this.page.type==3){
                        this.HotSpotObservationList = res.data.data.records;
                    }else if(this.page.type==4){
                        this.PolicyTrackingList = res.data.data.records;
                    }
                    
                    this.total = res.data.data.total;
                })
            },
            // 主tabs切换
            handleClick(tab, event) {
                // 每日资讯
                if(tab.name=='DailyNews'){
                    this.page.type=2;
                    this.getListData();
                }
                // 热点观察
                else if(tab.name=='HotSpotObservation'){
                    this.page.type=3;
                    this.getListData();
                }
                // 政策跟踪
                else if(tab.name=='PolicyTracking'){
                    this.page.type=4;
                    this.getListData();
                }
                this.page.current = 1;
            },
            // 跳转详情
            goDetail(data){
                this.$router.push({
                    path: "/unscrambleDetail", 
                    query: {
                        id: data,
                        type:2
                    }
                });
            },
            // 上一页
            paginationPrev(a,b){
                console.log(a,b);
            },
            // 下一页
            paginationNext(a,b){
                console.log(a,b);
            },
            // currentPage 改变时会触发
            paginationCurrent(a,b){
                console.log(a,b);
            },
        }
    }
</script>
<style scoped>
    .mywrapper {
      display: flex;
      cursor: pointer;
    }
    .myleft {
      flex: 0 0 10%;
      width: 25%;
      border-radius: 5px;
      height: 80px;
      color: #ccc;
    }
    .myright {
      flex: 1;
      height: 80px;
      padding-left: 15px;
      padding-top: 10px;
    }
    .listTitle{
        font-size: 16px;
        color: #000;
    }
    .listTime{
       font-size: 12px;
       color: #8F9399;
       margin-left: 30px; 
    }
    .listDetail{
        float: right;
        margin-top: 5px;
        color: #8F9399;
        font-size: 12px;
        margin-right: 5px;
    }
    .listDetail:hover{
        color: #409EFF;
    }
    .listDetail:hover .iconcar-app-four:before {
        color: #409EFF;
    }
    .listIntroduce{
        margin-top: 10px;
        line-height: 20px;
        font-size: 12px;
        color: #606266;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    /deep/ @media screen and (max-width: 1367px) {
        .carouselBottomHeight{
            height:130px;
        }
    }
    /deep/ .el-carousel__container{
        height: 100%;
    }
</style>
