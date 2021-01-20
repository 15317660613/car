<template>
    <div class="mainBody">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>热点跟踪</el-breadcrumb-item>
            <el-breadcrumb-item>正文</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div>
            <p class="detailTitle">{{form.title}}</p> 
            <div class="" style="font-size: 12px;color: #606266;line-height: 40px;">
               <span>{{form.createdTime}}</span>
                <span style="margin-left: 20px;"><i class="iconfont iconcar-app-eleven"></i></span>
                <span style="margin-left: 5px;">{{form.likesNumber}}</span>
                <span style="margin-left: 10px;"><i class="iconfont iconcar-app-ten"></i></span>
                <span style="margin-left: 5px;">{{form.conmmentNumber}}</span>
                <span style="margin-left: 10px;"><i class="iconfont iconcar-app-eight"></i></span>
                <span style="margin-left: 5px;">{{form.collectionNumber}}</span> 
            </div>
        </div> 
        <div v-html="form.content"></div> 
        <el-divider v-if="informationFileList.length!=0" content-position="left">相关附件</el-divider>   
        <div v-if="informationFileList.length!=0">
            <p v-for="item in informationFileList">
                <el-link type="primary" @click="downloadFunc(item.id)">{{item.name}}</el-link>
                <!-- <span class="des-word " @click="downloadFunc(item.id)" style="color: #409EFF;">{{item.name}}</span> -->
            </p>
        </div>
        <!-- 底部广告区 -->
        <carouselBottom />
        <!-- 点赞评论区 -->
        <likeAndComment 
            id="comments"
            @publishCommment="publishCommment"
            @replyCommentFunc="replyCommentFunc"
            @publishFunc="publishFunc"
            @thumbsupFunc="thumbsupFunc"
            @collectionAction="collectionAction"
            @gotoComments="gotoComments"
            @backTop="backTop"
            :detailAllData='detailAllData'>
        </likeAndComment>
    </div>
</template>

<script>
    import {
        shareDetail,
        informationPraisePost,
        informationPraiseDelete,
        informationCollectionPost,
        informationCollectionDelete,
        informationComment} from '@/api/share';
    import carouselBottom from '@/views/layout/carouselTel.vue';
    import likeAndComment from '@/components/likeAndComment/index.vue';
    const axios = require('axios');
    export default {
        name: 'hotSpotDetail',
        data() {

            return {
                form:{
                    title:'',
                    createdTime:'',
                    likesNumber:'',
                    conmmentNumber:'',
                    collectionNumber:'',
                    content:'',
                },
                informationFileList:[],
                detailAllData:'',
                thismyid:'',
            }
        },
        props: { },
        components: {carouselBottom,likeAndComment},
        mounted() {
            let id=this.$route.query.id;
            this.thismyid = id;
            this.getDetailData(id);
        },
        methods: {
            // 默认执行的请求表格方法
            getDetailData(data){
                shareDetail(data).then((res) => {
                    for(let attr in this.form){
                        this.form[attr] = res.data[attr]
                    };
                    this.detailAllData = res.data;
                    if(res.data.informationFileList.length!=0){
                        res.data.informationFileList.forEach(item=>{
                            this.informationFileList.push({
                                name:item.fileName,
                                id:item.id
                            })
                        })
                    }
                })
            },
            // 下载附件
            downloadFunc(data){
                var thismyform = document.createElement("form");
                document.getElementsByTagName('body')[0].appendChild(thismyform);
                thismyform.setAttribute('style','display:none');
                thismyform.setAttribute('class','myForm');
                thismyform.setAttribute('target','_blank');
                thismyform.setAttribute('method','get');
                thismyform.setAttribute('action','/auto-appstore/industry-knowledge/api/download/informationFile/'+ data);

                var input1 = document.createElement('input');
                input1.setAttribute('type','hidden');
                input1.setAttribute('name','ids');
                input1.setAttribute('value','');
                thismyform.appendChild(input1);

                thismyform.submit();
                document.getElementsByTagName('body')[0].removeChild(thismyform);
            },
            // 发表评论
            publishCommment(data){
                console.log(data);
                console.log(data);
                informationComment(data).then((res) => {

                })
                this.getDetailData(this.thismyid);
            },
            // 回复
            replyCommentFunc(data){
                console.log(data);
            },
            // 发布
            publishFunc(data){
                console.log(data);
            },
            // 点赞
            thumbsupFunc(data){
                let requireform = {
                    informationId:data
                };
                if(this.detailAllData.userLikeIt){
                    informationPraiseDelete(requireform).then((res) => {

                    })
                }else{
                    informationPraisePost(requireform).then((res) => {

                    })
                }
                this.getDetailData(this.thismyid);
            },
            // 收藏
            collectionAction(data){
                let requireform = {
                    informationId:data
                };
                if(this.detailAllData.userCollectionIt){
                    informationCollectionDelete(requireform).then((res) => {

                    })
                }else{
                    informationCollectionPost(requireform).then((res) => {

                    })
                }
                this.getDetailData(this.thismyid);
            },
            // 定位评论
            gotoComments(){
                document.getElementById("comments").scrollIntoView()
            },
            // 点击图片回到顶部方法，加计时器是为了过渡顺滑
            backTop() {
                document.documentElement.scrollTop = 0;
            },
        }
    }
</script>
<style scoped>
    .mainBody{
        min-height: calc(100vh - 288px)!important;
    }
    .detailTitle{
        font-size: 24px;
    }
    .iconcar-app-eleven:before {
        color: #8F9399;
        font-size: 12px;
    }
    .iconcar-app-ten:before {
        color: #8F9399;
        font-size: 12px;
    }
    .iconcar-app-eight:before {
        color: #8F9399;
        font-size: 12px;
    }
    /deep/ .ql-align-center{
        text-align: center!important;
    }
    /deep/ p{
      line-height: 28px;
      color:#303133;
      font-size:14px;
    }
    /deep/ img{
        max-width: 100%;
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
