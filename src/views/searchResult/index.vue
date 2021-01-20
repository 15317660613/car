<template>
    <div class="mainBody">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
        <div v-for="item in shareList">
            <div class="mywrapper" @click="goDetail(item)">
                <div class="myleft">
                    <img v-if="item.thumbnail" style="width: 100%;height: 100%;" :src='defaultSettings.prefix + item.thumbnail.filePath'/>
                    <img v-if="!item.thumbnail" style="width: 100%;height: 100%;" src="@/assets/navbar/shareList-icon.png"/>
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

    </div>
</template>

<script>
    import {sharePage} from '@/api/share'
    import defaultSettings from '@/settings'

    export default {
        name: "SearchResult",
        data() {
            return {
                page: {
                    current: 1,
                    size: 5,
                    type: '',
                    status: 4,
                    title: '',
                    frontOrBack: 'front',
                },
                defaultSettings: defaultSettings,
                shareList: [],
                total: 0
            }
        },
        created() {
            this.$root.Bus.$on('getList', (keyword) => {
                console.log(keyword)
                this.page.title = keyword
                this.getListData();
            });
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
          goDetail(item){
            this.$router.push({
              path: "/unscrambleDetail",
              query: {
                id: item.id,
                type:item.type,
              }
            });
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
  /deep/ .el-divider {
    margin: 10px 0;
    background-color: #EBEEF5;
  }
</style>
