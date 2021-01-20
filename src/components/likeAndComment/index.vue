<template>
  <div class="likeAndCommentClass">
    <div class="replyButton" style="text-align: center;margin: 20px 0px;position: relative;">
      <div style="position: absolute;bottom: 0px;left: 10px;">
        <span><i class="inconfont icon-car-app-ten" style="margin-right: 10px;"></i><span>{{detailAllData.conmmentNumber}}条评论</span></span>
      </div>
      <el-button class="yesthumbsupBtn" v-if="dianzanFlag" round style="margin-right: 10px;" @click="thumbsupFunc">
        <p style="line-height: 20px;"><i class="iconfont icondianzan yesthumbsup"></i></p>
        <p style="line-height: 20px;color: #418CEE;">{{detailAllData.likesNumber}}</p>
      </el-button>
      <el-button v-if="!dianzanFlag" round style="margin-right: 10px;" @click="thumbsupFunc">
        <p style="line-height: 20px;"><i class="iconfont icondianzan nothumbsup"></i></p>
        <p style="line-height: 20px;color: #8F9399;">{{detailAllData.likesNumber}}</p>
      </el-button>

      <el-button class="yesshoucangBtn" round v-if="collectionFlag" @click="collectionAction">
        <p style="line-height: 20px;"><i class="iconfont iconshoucang yesshoucang"></i></p>
        <p style="line-height: 20px;color: #418CEE;">{{detailAllData.collectionNumber}}</p>
      </el-button>
      <el-button round v-if="!collectionFlag" @click="collectionAction">
        <p style="line-height: 20px;"><i class="iconfont iconshoucang noshoucang"></i></p>
        <p style="line-height: 20px;color: #8F9399;">{{detailAllData.collectionNumber}}</p>
      </el-button>
    </div>
    <div class="">
      <el-input class="enterTextarea" type="textarea" :rows="5" maxlength="200" placeholder="写下你的评论..." v-model="content" style="background: #F2F6FC;"></el-input>
    </div>
    <p style="margin-top: 10px;" class="clearfix">
      <span style="float: left;margin-top: 6px;">全部评论</span>
      <span style="float: right;"><el-button type="primary" @click="publishCommment">发表评论</el-button></span>
    </p>
    <el-divider></el-divider>
    <div v-if="detailAllData.conmmentNumber==0">
      <p style="text-align: center;"><img src="@/assets/no-reply.png"></p>
      <p style="text-align: center;color: #8F9399;">还没有评论，成为第一个评论的人！</p>
    </div>
    <div v-if="detailAllData.conmmentNumber!=0">
      <div v-for="item in trainCommentVoList">
        <p style="line-height: 24px;display: flex;justify-content: space-between;">
          <span style="display: flex;align-items: center;">
            <img src="@/assets/navbar/avatar.png" alt="" width="24px" height="24px" style="display: inline-block;">
            <span v-if="item.beCommented" style="margin-left: 5px;color: #303133;font-weight: bold;">
              {{item.commentator}}<span style="color: #606266;margin: 0px 10px;font-weight: normal;">回复</span>{{item.beCommented}}
            </span>
            <span v-if="!item.beCommented" style="margin-left: 5px;color: #303133;font-weight: bold;">
              {{item.commentator}}
            </span>
          </span>  
          <span style="display: flex;align-items: center;">
            <span style="color: #8F9399;">{{item.createdTime}}</span>
            <i class="inconfont icon-car-app-ten" style="margin-left: 20px;margin"></i>
            <span class="replyCommentAlign" style="margin-left: 5px;cursor: pointer;color: #8F9399;" @click="replyCommentFunc(item)">回复</span>
          </span>
        </p>
        <p style="margin-left: 30px;color: #606266;word-break: break-all;white-space: pre-wrap;">
          {{item.content}}
        </p>
        <p v-if="item.status" style="margin-left: 30px;display: flex;justify-content: space-between;">
          <el-input  class="enterInput" maxlength="200" :placeholder='"回复"+item.commentator' v-model="item.replyComment" style="background: #F2F6FC;"></el-input>
          <el-button type="primary" @click="publishFunc(item)">发布</el-button>
        </p>
        <el-divider></el-divider>
      </div>
    </div>
    <div class="siderBarBox" :style="{right: screenWidth}">
      <div class="siderBar">
        <div @click="thumbsupFunc">
            <svg-icon :icon-class="dianzanFlag ? 'dianzan1' : 'dianzan'"></svg-icon>
        </div>
        <div @click="gotoComments">
            <svg-icon icon-class="comment"></svg-icon>
        </div>
        <div @click="collectionAction">
            <svg-icon :icon-class="collectionFlag ? 'like1' : 'like'"></svg-icon>
        </div>
      </div>
      <div class="backUp" @click="backTop">
        <i class="el-icon-download"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name:'likeAndComment',
  props: ['detailAllData'],
  computed: {

  },
  watch:{
    detailAllData(newVal,oldVal){
     if(newVal){
        this.detailAllData = newVal;
        this.trainCommentVoList = this.detailAllData.informationCommentList;
        this.dianzanFlag = this.detailAllData.userLikeIt;
        this.collectionFlag = this.detailAllData.userCollectionIt;
      }
    },
  },
  data() {
    return {
      content:'',
      trainCommentVoList:[],
      dianzanFlag: false,
      collectionFlag: false,
      screenWidth: '',   // 这里是给到了一个默认值
    };
  },
  mounted(){
    let thisWidth = ((document.documentElement.clientWidth - 1100) / 2) - 65;
    if(thisWidth<=5){thisWidth = 5};
    this.screenWidth = thisWidth + 'px';

    window.onresize = () => {
      let thisWidth1 = ((document.documentElement.clientWidth - 1100) / 2) - 65;
      if(thisWidth1<=5){thisWidth1 = 5};
      this.screenWidth = thisWidth1 + 'px';
    }
  },
  methods: {
    // 发表评论
    publishCommment(){
      if(this.content){
        let data = {
          informationId:this.detailAllData.id,
          content:this.content
        };
        this.$emit('publishCommment',data);
        this.content = '';
      }else{
        this.$message.warning({message: '没有填写任何评论内容！'});
      }
      
    },
    // 回复
    replyCommentFunc(item){
      if(item.createdUser!=JSON.parse(sessionStorage.getItem('userInfo')).id){
        if(item.status){
          item.status = false;
        }else{
          item.status = true;
        }
      }else{
        this.$message.warning('不能回复自己的评论')
      }
      
    },
    // 发布
    publishFunc(item){
      if(item.replyComment){
        item.status = false;
        let data = {
          informationId:this.detailAllData.id,
          content:item.replyComment,
          userId:item.createdUser
        };
        this.$emit('publishCommment',data);
      }else{
        this.$message({message: '没有填写任何回复信息！', type: 'warning'});
      }
      
    },
    // 点赞
    thumbsupFunc(data){
      console.log(this.detailAllData.id);
      this.$emit('thumbsupFunc',this.detailAllData.id);
    },
    // 定位评论
    gotoComments(){
      this.$emit('gotoComments');
    },
    // 收藏
    collectionAction(data){
      this.$emit('collectionAction',this.detailAllData.id);
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      this.$emit('backTop');
    },
  }
}
</script>

<style scoped>
  /deep/ .el-button--medium.is-round{
    padding: 0px 30px;
  }
  /deep/ .el-button.is-round{
    border-radius: 30px;
  }
  /deep/ .enterTextarea > textarea{
    background: #F2F6FC;
  }
  /deep/ .enterInput > input{
    background: #F2F6FC;
  }
  /deep/ .replyButton .yesthumbsupBtn,.replyButton .yesshoucangBtn{
    border-color: #418CEE;
  }
  /deep/ .yesthumbsup:before{
    color: #418CEE;
  }
  /deep/ .yesshoucang:before{
    color: #418CEE;
  }
  /*/deep/ .replyButton .el-button.is-round{
    border-color: #418CEE;
  }*/
  /deep/ .el-divider--horizontal{
    margin: 15px 0px;
  }
  /deep/ .replyCommentAlign:hover{
    color: #4991EE!important;
  }
  /deep/ .siderBarBox{
    width: 50px;
    position: fixed;
    bottom: 20%;
  }
  /deep/ .siderBarBox .siderBar div{
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
  /deep/ .siderBarBox .siderBar{
    border: 1px solid #EBEEF5;
  }
  /deep/ .siderBarBox .siderBar div:not(:last-child) {
    border-bottom: 1px solid #EBEEF5;
}
/deep/ .siderBarBox .backUp {
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #DDDDDD;
    border-radius: 6px;
    margin-top: 20px;
    color: #FFF;
    transform: rotate(180deg);
    cursor: pointer;
  }
</style>
