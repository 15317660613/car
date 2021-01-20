<template>
    <div class="mainBody">
        <div v-for="item in shareList">
            <div class="mywrapper" @click="goDetail(item.id)">
                <div class="myleft">
                    <img v-if="item.thumbnail" style="width: 100%;height: 100%;" :src='baseUrl + item.thumbnail.filePath' />
                    <img v-if="!item.thumbnail" style="width: 100%;height: 100%;" src="../assets/navbar/shareList-icon.png" />
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
        name: 'share',
        data() {
            return {
                page: {
                    current: 1,
                    size: 5,
                    type:1,
                    status:4,
                    frontOrBack:'front',
                },
                shareList:[],
                total:0,
                baseUrl:'/auto-appstore/industry-knowledge/file',
            }
        },
        components: {Pagination,carouselBottom},
        props: { },
        mounted() {
            this.getListData();
        },
        methods: {
            // 默认执行的请求表格方法
            getListData(){
                sharePage(this.page).then((res) => {
                    this.shareList = res.data.data.records;
                    this.total = res.data.data.total;
                })
            },
            // 跳转详情
            goDetail(data){
                this.$router.push({
                    path: "/unscrambleDetail", 
                    query: {
                        id: data,
                        type:1
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
