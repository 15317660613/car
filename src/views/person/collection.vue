<template>
    <div class="mainBody">
        <el-tabs class="toptabs" v-model="activeItem" @tab-click="handleClick">
            <el-tab-pane label="我的收藏" name="collection">
                <el-tabs v-model="activeItemCollection" @tab-click="handleClickChild">
                    <el-tab-pane label="我收藏的资讯" name="CollectionInformation">
                        <div v-if="realTimeInfoList.length!=0" class="listItem" v-for="item in realTimeInfoList">
                            <p class="listTitle" >
                                <span @click="goDataDetail(item)" style="cursor: pointer;">{{item.information.title}}</span>
                                <span class="listDetail " @click="goDataDetail(item)" style="cursor: pointer;">查看详情 <i class="iconfont iconcar-app-four" style="font-size: 12px;"></i></span>
                            </p>
                            <p class="listTime">
                                <span style="margin-right: 20px;">收藏时间：{{item.informationCollection.createdTime.substring(0,10)}}</span>
                                <span v-if="item.information.type==1">资讯类型：专题分享</span>
                                <span v-if="item.information.type==2">资讯类型：每日资讯</span>
                                <span v-if="item.information.type==3">资讯类型：热点观察</span>
                                <span v-if="item.information.type==4">资讯类型：政策跟踪</span>
                                <span v-if="item.information.type==5">资讯类型：数据解读</span>
                            </p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我收藏的课程" name="CollectionCurriculum">
                        <el-row :gutter="10">
                            <el-col :span="6" v-for="item in CollectionCurriculumList" :key="item.id" >
                                <el-card :body-style="{ padding: '10px' }" style="margin-top: 10px;cursor: pointer;">
                                    <div @click="gocurriculumDetail(item)">
                                        <img :src='baseUrl + item.picPath' class="image" style="height: 156px;">
                                        <div style="padding: 14px;">
                                            <p class="overflowTwo" style="color: #303133;font-size: 14px;">{{item.title}}</p>
                                            <div class="bottom clearfix">
                                                <p style="color: #8F9399;font-size: 12px;">
                                                    <i class="el-icon-time"><span style="margin-left: 10px;">{{item.videoDuration}}分钟</span></i>
                                                    <span style="float: right;margin-top: 0px;">收藏时间：{{item.createdTime.substring(0,10)}}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="我的评论" name="comment">
                <el-tabs v-model="activeItemComment" @tab-click="handleClickChild">
                    <el-tab-pane label="我评论的资讯" name="CommentRealTimeInfo">
                        <div v-if="CommentRealTimeInfoList.length!=0" class="listItem" v-for="item in CommentRealTimeInfoList">
                            <p class="listTitle">
                                {{item.information.title}}
                                <span class="listDetail" @click="goDataDetail(item)" style="cursor: pointer;">查看详情 <i class="iconfont iconcar-app-four" style="font-size: 12px;"></i></span>
                            </p>
                            <p class="listContent">
                                <span @click="goDataDetail(item)" style="cursor: pointer;word-break: break-all;white-space: pre-wrap;">评论内容：{{item.informationComment.content}}</span>
                            </p>
                            <p class="listTime">
                                <span style="margin-right: 20px;">评论时间：{{item.informationComment.createdTime.substring(0,10)}}</span>
                                <span v-if="item.information.type==1">资讯类型：专题分享</span>
                                <span v-if="item.information.type==2">资讯类型：每日资讯</span>
                                <span v-if="item.information.type==3">资讯类型：热点观察</span>
                                <span v-if="item.information.type==4">资讯类型：政策跟踪</span>
                                <span v-if="item.information.type==5">资讯类型：数据解读</span>
                            </p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我评论的课程" name="CommentCurriculum">
                        <div v-if="CommentCurriculumList.length!=0" class="listItem" v-for="item in CommentCurriculumList" >
                            <p class="listTitle">
                                <span @click="gocurriculumDetail(item)" style="cursor: pointer;">{{item.title}}</span>
                                <span class="listDetail" style="cursor: pointer;"  @click="gocurriculumDetail(item)">查看详情 <i class="iconfont iconcar-app-four" style="font-size: 12px;"></i></span>
                            </p>
                            <p class="listContent">
                                <span style="word-break: break-all;white-space: pre-wrap;">评论内容：{{item.commentContent}}</span>
                            </p>
                            <p class="listTime">
                                <span style="margin-right: 20px;">评论时间：{{item.createdTime.substring(0,10)}}</span>
                            </p>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>
        <pagination v-show="total>0" :total="total" :layout="'prev, pager, next'" :page.sync="page.current" :limit.sync="page.size"
            @pagination="getListData()" style="text-align: center"/>
    </div>
</template>

<script>
    import {informationCollectionpage,trainpageTrainCollection,informationCommentpage,trainpageTrainComment} from '@/api/person'
    import Pagination from '@/components/Pagination'
    export default {
        name: 'collection',
        data() {
            return {
                page: {
                    current: 1,
                    size: 6,
                },
                createdUser:JSON.parse(sessionStorage.getItem('userInfo')).id,
                total:0,
                activeItem:'',
                activeItemCollection:'CollectionInformation',
                activeItemComment:'CommentRealTimeInfo',
                realTimeInfoList:[],
                CollectionCurriculumList:[],
                CommentRealTimeInfoList:[],
                CommentCurriculumList:[],
                baseUrl:'/auto-appstore/industry-knowledge/file',
                
            }
        },
        components: {Pagination},
        props: { },
        mounted() {
            this.activeItem = this.$route.query.activeItem;
            if(this.activeItem=='collection'){
                this.activeItemCollection = 'CollectionInformation'
            };
            // 如果是从我的评论跳转过来的 默认显示我评论的资讯
            if(this.activeItem == 'comment'){
                this.activeItemComment = 'CommentRealTimeInfo'
            }
            this.getListData();
        },
        methods: {
            
            // 默认执行的请求表格方法
            getListData(){
                    // 请求的是收藏的资讯
                if(this.activeItem=='collection' && this.activeItemCollection=='CollectionInformation'){
                    let requestform = {
                        current: this.page.current,
                        size: this.page.size,
                        entity:{
                            createdUser:this.createdUser,
                        }
                    };
                    informationCollectionpage(requestform).then((res) => {
                        this.realTimeInfoList = res.data.list;
                        this.total = res.data.count;
                    })
                }else if(this.activeItem=='collection' && this.activeItemCollection=='CollectionCurriculum'){
                    // 请求的是收藏的课程
                    let requestform = {
                        current: this.page.current,
                        size: this.page.size,
                        createdUser:this.createdUser,
                    };
                    trainpageTrainCollection(requestform).then((res) => {
                        this.CollectionCurriculumList = res.data.list;
                        this.total = res.data.count;
                    })
                }else if(this.activeItem=='comment' && this.activeItemComment=='CommentRealTimeInfo'){
                    // 请求的是评论的资讯
                    let requestform = {
                        current: this.page.current,
                        size: this.page.size,
                        entity:{
                            createdUser:this.createdUser,
                        }
                    };
                    informationCommentpage(requestform).then((res) => {
                        this.CommentRealTimeInfoList = res.data.list;
                        this.total = res.data.count;
                    })
                }else if(this.activeItem=='comment' && this.activeItemComment=='CommentCurriculum'){
                    // 请求的是评论的课程
                    let requestform = {
                        current: this.page.current,
                        size: 5,
                        createdUser:this.createdUser,
                    };
                    trainpageTrainComment(requestform).then((res) => {
                        this.CommentCurriculumList = res.data.list;
                        this.total = res.data.count;
                    })
                }
                
            },
            // 主tabs切换
            handleClick(tab, event) {
                // 每次切换tab选项卡的时候当前页重置为1
                this.page.current = 1;
                // 如果当前激活的是我的收藏  那么默认显示成我收藏的资讯
                if(tab.name=='collection'){
                    this.activeItemCollection = 'CollectionInformation';
                };
                // 如果当前激活的是我的评论  那么默认显示成我评论的资讯
                if(tab.name=='comment'){
                    this.activeItemComment = 'CommentRealTimeInfo'
                }
                this.getListData();
            },
            // 子tabs切换
            handleClickChild(tab, event) {
                // 每次切换tab选项卡的时候当前页重置为1
                this.page.current = 1;
                // 当我的收藏切换到我收藏的课程的时候 设置每页条数为8 否则设置为6
                if(tab.name=='CollectionCurriculum'){
                    this.page.size = 8;
                }else{
                    this.page.size = 6;
                }
                this.getListData();
            },
            // 跳转资讯详情
            goDataDetail(data){
                console.log(data);
                // 当前的tab页为我的收藏
                if(this.activeItem=='collection'){
                    //专题分享 
                    if(data.information.type==1){
                        this.$router.push({path: "/unscrambleDetail", query: { id: data.informationCollection.informationId,type:data.information.type }});
                    }
                    // 每日资讯 热点观察 政策跟踪
                    else if(data.information.type==2||data.information.type==3||data.information.type==4){
                        this.$router.push({path: "/unscrambleDetail", query: { id: data.informationCollection.informationId,type:data.information.type }});
                    }
                    // 数据解读
                    else if(data.information.type==5){
                        this.$router.push({path: "/unscrambleDetail", query: { id: data.informationCollection.informationId,type:data.information.type }});
                    }
                    // 课程培训
                    else if(data.information.type==6){
                        this.$router.push({path: "/courseDetail", query: { id: data.id }});
                    }
                };
                // 当前tab页为我的评论
                if(this.activeItem=='comment'){
                    //专题分享 
                    if(data.information.type==1){
                        this.$router.push({path: "/unscrambleDetail", query: { id: data.informationComment.informationId,type:data.information.type }});
                    }
                    // 每日资讯 热点观察 政策跟踪
                    else if(data.information.type==2||data.information.type==3||data.information.type==4){
                        this.$router.push({path: "/unscrambleDetail", query: { id: data.informationComment.informationId,type:data.information.type }});
                    }
                    // 数据解读
                    else if(data.information.type==5){
                        this.$router.push({path: "/unscrambleDetail", query: { id: data.informationComment.informationId,type:data.information.type }});
                    }
                    // 课程培训
                    else if(data.information.type==6){
                        this.$router.push({path: "/courseDetail", query: { id: data.id }});
                    }
                };
            },
            // 跳转课程详情
            gocurriculumDetail(data){
                this.$router.push({name: "CourseDetail", params: {id: data.id}});
            }
        },
        watch: {
            $route: {
                handler() {
                    // 如果是从我的收藏跳转过来的 默认显示我收藏的资讯
                    this.activeItem = this.$route.query.activeItem;
                    if(this.activeItem=='collection'){
                        this.activeItemCollection = 'CollectionInformation'
                    };
                    // 如果是从我的评论跳转过来的 默认显示我评论的资讯
                    if(this.activeItem == 'comment'){
                        this.activeItemComment = 'CommentRealTimeInfo'
                    }
                    // this.getListData();
                    //深度监听，同时也可监听到param参数变化
                },
                deep: true,
            }
        }
    }
</script>
<style scoped>
    .listItem{
        padding:15px 5px;
    }
    .listItem p{
        padding: 5px 0px;
    }
    .listItem:hover{
        background: #F2F6FC;
    }
    .listTitle{
        font-size: 16px;
        line-height: 22px;
        color: #000;
    }
    .listDetail{
        float: right;
        color: #8F9399;
        font-size: 12px;
    }
    .listContent{
        color: #606266;
        font-size: 14px;
    }
    .listTime{
        color: #606266;
        font-size: 12px;
    }


    .time {
        font-size: 13px;
        color: #999;
    }
  
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
  
    .clearfix:after {
        clear: both
    }
</style>