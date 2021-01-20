<template>
    <div class="mainBody">
        <section class="mainContainer">
            <el-row :gutter="10">
                <el-col :span="6" v-if="question">
                    <div class="content">
                        <div class="contentCover">
                            <div class="content-cover-inner">
                                <img src="@/assets/train/wenjuan.png" alt="">
                            </div>
                        </div>
                        <div class="contentInner" style="height: auto">
                            <span class="ztext">填写并上传调查问卷，获得专家答疑</span>
                        </div>
                        <div style="text-align: center">
                            <el-button type="primary" size="small" @click="newAddFunc">填写问卷</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" v-for="(item,index) in quesList" :key="item.id">
                    <div class="content" :class="{hasMargin: hasMargin(index)}" @click="couseDetail(item.id)">
                        <div class="contentCover">
                            <div class="content-cover-inner">
                                <img :src="defaultSettings.prefix + item.picPath" alt="">
                            </div>
                        </div>
                        <div class="contentInner">
                            <span class="ztext">{{item.title}}</span>
                        </div>
                        <div class="contentActions">
                            <div class="ContentItem-action">
                                <i class="el-icon-time" style="margin-right: 5px"></i> {{item.videoDuration || 0}}
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <pagination v-show="total>0" :total="total" :layout="'prev, pager, next'" :page.sync="queryObj.current" :limit.sync="queryObj.size"
                        @pagination="getList()" style="text-align: center"/>
        </section>
        <div class="component-container">
            <newAdd @refresh="refresh" ref="newAddDialog"></newAdd>
        </div>
    </div>
</template>

<script>
    import {getList} from '@/api/train'
    import {getQuestion} from '@/api/home'
    import Pagination from '@/components/Pagination'
    import defaultSettings from '@/settings'
    // 新增页面
    import newAdd from './home/questionAdd';
    // import {getQuestionList, createQuestion, login} from "@/api/index";

    export default {
        name: 'Question',
        data() {
            return {
                quesList: [],
                searchContent: '',
                dialogVisible: false,
                content: '',
                imageUrl: '',
                queryObj:{
                    current: 1,
                    size: 7,
                    entity:{
                        status:4,
                    }
                },
                defaultSettings: defaultSettings,
                total: 0,
                question: {}

            }
        },
        components: {Pagination,newAdd},
        props: {
            msg: String
        },

        mounted() {
            //获取调查问卷
            this.getQuestion()
            // this.login();
        },
        methods: {
            // async login() {
            //     let token = location.href.split("tokenId=")[1];
            //     if (token !== localStorage.getItem('token')) {
            //         await login(token).then(() => {
            //             localStorage.setItem('token', token)
            //         }).catch(() => {
            //             return
            //         })
            //     }
            //     this.getList();
            // },
            hasMargin(index){
                let num = (this.quesList.length + 1) % 4;
                if(this.quesList.length - index <= num){
                    return true;
                }else{
                    return false;
                }
            },
            couseDetail(id){
                this.$router.push({name: "CourseDetail", params: {id: id}});
            },
            getList() {
                getList(this.queryObj).then((res)=>{
                    this.total = res.data.total;
                    this.quesList = res.data.records;
                })
            },
            getQuestion() {
                getQuestion().then(response => {
                    this.question = response.data;
                    if(!this.question){
                        this.queryObj.size = 8;
                    }
                    this.getList();
                })
            },
            newAddFunc() {
                this.$refs['newAddDialog'].defaultfunc(this.question);
            },
            refresh() {
                //获取调查问卷
                this.question = {}
                this.getQuestion()
            }
            // resetTemp() {
            //     this.quesObj = {
            //         // title: '',
            //         content: '',
            //         introduce: '',
            //         // attachmentId: ''
            //     }
            // },
            // askQuestion() {
            //     this.resetTemp();
            //     this.imageUrl = '';
            //     this.dialogVisible = true;
            //     this.$nextTick(() => {
            //         this.addQuillTitle()
            //     })
            // },
            // onEditorReady() { // 准备编辑器
            // },
            // onEditorBlur() {
            // }, // 失去焦点事件
            // onEditorFocus() {
            // }, // 获得焦点事件
            // onEditorChange() {
            // }, // 内容改变事件
            // save: function () {
            //     if (this.quesObj.introduce === '') {
            //         return this.$message.warning("请输入问题简介！");
            //     }
            //     if (this.quesObj.content.trim() === '') {
            //         return this.$message.warning("请输入问题详情！");
            //     }
            //     createQuestion(this.quesObj).then(() => {
            //         this.$message.success("发布成功！")
            //         this.dialogVisible = false;
            //         this.getList();
            //     })
            // },
            // addQuillTitle() {
            //     const oToolBar = document.querySelector(".ql-toolbar"),
            //         aButton = oToolBar.querySelectorAll("button"),
            //         aSelect = oToolBar.querySelectorAll("select");
            //     aButton.forEach(function (item) {
            //         if (item.className === "ql-script") {
            //             item.value === "sub" ? (item.title = "下标") : (item.title = "上标");
            //         } else if (item.className === "ql-indent") {
            //             item.value === "+1"
            //                 ? (item.title = "向右缩进")
            //                 : (item.title = "向左缩进");
            //         } else {
            //             item.title = titleConfig[item.classList[0]];
            //         }
            //     });
            //     aSelect.forEach(function (item) {
            //         item.parentNode.title = titleConfig[item.classList[0]];
            //     });
            // },
            // handleAvatarSuccess(res, file) {
            //     this.imageUrl = URL.createObjectURL(file.raw);
            //     this.quesObj.attachmentId = res.data.id;
            // }
        }
    }
</script>
<style scoped>
    /deep/ .ql-editor {
        height: 300px;
    }

    .mainContainer {
        /*padding-top: 120px;*/
        background-color: #FFFFFF;
    }

    .mainColumn .card {
        border-bottom: 1px solid #f0f2f7;
        margin-bottom: 0;
        padding: 20px;
    }

    .mainColumn .card .contentItemTitle {
        font-size: 18px;
        font-weight: 600;
        line-height: 1.6;
        color: #1a1a1a;
        margin-top: -4px;
        margin-bottom: -4px;
    }

    .content .contentCover {
        position: relative;
        /*width: 190px;*/
        height: 150px;
        /*margin-top: -2px;*/
        /*margin-right: 18px;*/
        margin-bottom: 4px;
        /*float: left;*/
        overflow: hidden;
        /*background-position: 50%;*/
        /*background-size: cover;*/
        /*border-radius: 4px;*/
    }

    .contentInner {
        padding: 0 15px;
        margin: 10px 0;
        height: 44px;
        /*margin-bottom: -4px;*/
        overflow: hidden;
    }

    .contentActions {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        /*padding: 10px 20px;*/
        /*margin: 0 -20px -10px;*/
        color: #646464;
        /*background: #fff;*/
        padding: 0 15px;
        margin: 10px 0 20px 0;
    }

    .content.is-collapsed .contentInner {
        max-height: 100px;
    }

    .contentCover + .contentInner {
        margin-top: 16px;
    }

    .content-cover-inner {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .content-cover-inner img {
        height: 100%;
        width: 100%;
        -o-object-fit: cover;
        object-fit: cover;
    }

    .ztext {
        word-break: break-word;
        line-height: 1.6;
        font-size: 14px;
    }

    .contentActions .ContentItem-action {
        font-size: 12px;
        color: #8F9399;
    }

    .content{
        border: 1px solid #DCDFE6;
        border-radius: 6px;
        overflow: hidden;
        height: 255px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .hasMargin{
        margin-bottom: 0;
    }

    @media screen and (min-width: 1367px) {
        .headerTitle {
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: bold;
            border-bottom: 1px solid #eaeaea;
        }
    }

    @media screen and (max-width: 1367px) {
        .headerTitle {
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            font-weight: bold;
            border-bottom: 1px solid #eaeaea;
        }
    }
</style>
