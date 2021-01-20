<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程培训</el-breadcrumb-item>
            <el-breadcrumb-item>正文</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div class="courseDetail">
            <div class="courseTitle">{{courseObj.train.title}}</div>
            <div class="courseContent">
                <div class="courseVideo">
                    <video controls controlsList="nodownload" :poster="defaultSettings.prefix + courseObj.train.picPath" @waiting="handleWaiting"
                           @canplaythrough="isLoading = false" @stalled="isLoading = true" preload="auto" @pause="isLoading = false,playing=!playing"
                           @playing="isLoading = true, playing=true">
                        <source :src="defaultSettings.prefix + courseObj.train.videoPath">
                    </video>
                    <img :src="src" alt="" v-show="!isLoading" @click="play" @mouseenter="mouseenter" @mouseleave="mouseleave">
                </div>
                <div class="courseInfo">
                    <div class="title">
                        课程介绍
                    </div>
                    <div class="introduce">
                        {{courseObj.train.content}}
                    </div>
                    <div class="tools">
                        <div>
                            <svg-icon icon-class="dianzan"></svg-icon>
                            {{courseObj.likesNumber}}
                        </div>
                        <div>
                            <svg-icon icon-class="comment"></svg-icon>
                            {{courseObj.commentNumber}}
                        </div>
                        <div>
                            <svg-icon icon-class="like"></svg-icon>
                            {{courseObj.collectionNumber}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <carouselBottom/>
        <div class="control">
            <div class="control-btn" style="margin-right: 20px" @click="dianzan" :class="{isActive: dianzanFlag}">
                <svg-icon :icon-class="dianzanSVG"></svg-icon>
                <span>{{courseObj.likesNumber}}</span>
            </div>
            <div class="control-btn" @click="collectionAction" :class="{isActive: collectionFlag}">
                <svg-icon :icon-class="collectionFlag ? 'like1' : 'like'"></svg-icon>
                <span>{{courseObj.collectionNumber}}</span>
            </div>
        </div>
        <div class="commentInput">
            <div class="commentCount">
                <svg-icon icon-class="comment" style="margin-right: 10px"></svg-icon>
                {{courseObj.commentNumber}}条评论
            </div>
            <el-input type="textarea" maxlength="200" v-model="comment" :rows="5"></el-input>
            <div class="comment-btn">
                <el-button type="primary" size="small" @click="makeComment" :disabled="comment.replace(/(^\s*)|(\s*$)/g, '')===''">发表评论</el-button>
            </div>
        </div>
        <div class="comments" id="comments">
            <div class="commentsAll">全部评论</div>
            <div v-if="comments.length==0">
                <p style="text-align: center;"><img src="@/assets/no-reply.png"></p>
                <p style="text-align: center;color: #8F9399;">还没有评论，成为第一个评论的人！</p>
            </div>
            <div v-if="comments.length!==0" class="comment" v-for="(item,index) in comments" :key="index">
                <div class="commentTip">
                    <img src="@/assets/navbar/avatar.png" alt="" width="24px">
                    <span class="name">{{item.commentator}}</span>
                    <span class="huifu" v-if="item.beCommented">回复</span>
                    <span class="name" v-if="item.beCommented">{{item.beCommented}}</span>
                    <span class="commentTime">
                        {{item.createdTime}}
                        <span @click="showCommentBack(item)" :class="{isActive: item.flag}">
                            <svg-icon :icon-class="item.flag ? 'comment1' : 'comment'" style="margin: 0 5px 0 20px"></svg-icon>
                            回复
                        </span>
                    </span>
                </div>
                <div class="commentContent">{{item.content}}</div>
                <div class="commentBack" v-if="item.flag">
                    <el-input type="text" size="small" maxlength="200" style="margin-right: 10px;margin-left: 35px" v-model="item.data"></el-input>
                    <el-button type="primary" size="small" style="width: 80px" :disabled="!item.data || item.data.replace(/(^\s*)|(\s*$)/g, '')===''" @click="publish(item)">发布
                    </el-button>
                </div>
            </div>
            <div class="more" @click="expandComment" v-if="showNum < courseObj.trainCommentVoList.length && comments.length!==0">
                展开更多评论
            </div>
        </div>
        <div class="siderBarBox" :style="{right: right}">
            <div class="siderBar">
                <div @click="dianzan">
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
    import {getCourseDetail, dianzan, canceldianzan, makeComment, collection, cancelcollection} from '@/api/train.js'
    import carouselBottom from '@/views/layout/carouselTel.vue'
    import defaultSettings from '@/settings'

    export default {
        name: "courseDetail",
        data() {
            return {
                courseObj: null,
                comments: [],
                isLoading: true,
                playing: false,
                $video: null,
                src: require('@/assets/train/play.png'),
                dianzanFlag: false,
                collectionFlag: false,
                comment: '',
                showNum: 3,
                defaultSettings: defaultSettings
                // showNumCount: 0
            }
        },
        components: {
            carouselBottom,
        },
        computed: {
            dianzanSVG() {
                return this.dianzanFlag ? 'dianzan1' : 'dianzan'
            },
            userId() {
                return this.$store.state.user.userId
            },
            right() {
                let right = (window.screen.width - 1240) / 2 + 'px'
                return right;
            },
        },
        mounted() {
            setTimeout(() => {
                this.init();
            }, 500);
            this.getCourseDetail();
            window.addEventListener('scroll', this.scrollToTop)
        },
        destroyed() {
            window.removeEventListener('scroll', this.scrollToTop)
        },
        methods: {
            init() {
                this.$video = document.getElementsByTagName("video")[0];
            },
            getCourseDetail() {
                getCourseDetail(this.$route.params.id).then((res) => {
                    this.courseObj = res.data;
                    this.dianzanFlag = res.data.userLikeIt;
                    this.collectionFlag = res.data.userCollectionIt;
                    this.comments = this.courseObj.trainCommentVoList.slice(0, this.showNum)
                })
            },
            handleWaiting() {
                this.isLoading = true;
            },
            mouseenter() {
                this.src = require('@/assets/train/play1.png')
            },
            mouseleave() {
                this.src = require('@/assets/train/play.png')
            },
            play() {
                this.playing = !this.playing;
                if (this.$video) {
                    // 播放状态
                    if (this.playing) {
                        this.$video.play();
                        this.isLoading = true;
                    }
                }
            },
            dianzan() {
                if (!this.dianzanFlag) {
                    let params = {
                        staffId: this.userId,
                        trainId: this.$route.params.id
                    }
                    dianzan(params).then((res) => {
                        this.getCourseDetail();
                    })
                } else {
                    let params = {trainId: this.$route.params.id};
                    canceldianzan(params).then((res) => {
                        this.getCourseDetail();
                    })
                }
            },
            collectionAction() {
                if (!this.collectionFlag) {
                    let params = {
                        staffId: this.userId,
                        trainId: this.$route.params.id
                    }
                    collection(params).then((res) => {
                        this.getCourseDetail();
                    })
                } else {
                    let params = {trainId: this.$route.params.id};
                    cancelcollection(params).then((res) => {
                        this.getCourseDetail();
                    })
                }
            },
            makeComment() {
                let params = {
                    content: this.comment,
                    trainId: this.$route.params.id
                }
                makeComment(params).then((res) => {
                    this.$message.success('发表评论成功')
                    this.comment = '';
                    this.getCourseDetail();
                })
            },
            expandComment() {
                this.showNum += 3;
                this.comments = this.courseObj.trainCommentVoList.slice(0, this.showNum)
            },
            showCommentBack(obj) {
                obj.flag = !obj.flag;
                this.$forceUpdate()
            },
            publish(obj) {
                let params = {
                    userId: obj.commentatorId,
                    content: obj.data,
                    trainId: this.$route.params.id
                }
                makeComment(params).then((res) => {
                    this.$message.success('发表评论成功')
                    obj.data = '';
                    obj.flag = false;
                    this.getCourseDetail();
                })
            },
            // 点击图片回到顶部方法，加计时器是为了过渡顺滑
            backTop() {
                const that = this
                let timer = setInterval(() => {
                    let ispeed = Math.floor(-that.scrollTop / 5)
                    document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                    if (that.scrollTop === 0) {
                        clearInterval(timer)
                    }
                }, 16)
            },

            // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
            scrollToTop() {
                const that = this
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                that.scrollTop = scrollTop
                if (that.scrollTop > 60) {
                    that.btnFlag = true
                } else {
                    that.btnFlag = false
                }
            },
            gotoComments(){
                document.getElementById("comments").scrollIntoView()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .courseDetail {

        .courseTitle {
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 10px;
        }

        .courseContent {
            display: flex;
            justify-content: space-between;

            .courseVideo {
                position: relative;
                width: 70%;

                video {
                    width: 100%;
                    height: 100%;
                    object-fit: fill;
                }

                img {
                    display: block;
                    position: absolute;
                    top: calc(50% - 36px);
                    left: calc(50% - 36px);
                    width: 72px;
                    z-index: 99;
                    cursor: pointer;
                }
            }

            .courseInfo {
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                width: calc(30% - 20px);
                border: 1px solid #DCDFE6;
                border-radius: 4px;

                .title {
                    margin: 10px;
                    font-size: 18px;
                    font-weight: 600;
                    padding-left: 10px;
                    border-left: 3px solid #3190FA;
                }

                .introduce {
                    border-top: 1px solid #DCDFE6;
                    padding: 10px;
                    font-size: 14px;
                    color: #606266;
                    line-height: 1.5;
                    word-wrap: break-word;
                    /*word-break: normal;*/
                    overflow-y: auto;
                    flex: 1;
                }

                .tools {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    color: #8F9399;
                    font-size: 12px;
                    border-top: 1px solid #DCDFE6;

                    div {
                        text-align: center;
                        width: 33.3%;
                    }

                    div:not(:last-child) {
                        border-right: 1px solid #DCDFE6;
                    }
                }
            }
        }
    }

    .control {
        display: flex;
        justify-content: center;
        margin-top: 20px;

        .control-btn {
            display: flex;
            padding: 5px 40px;
            border: 1px solid #DCDFE6;
            border-radius: 25px;
            flex-direction: column;
            align-items: center;
            font-size: 14px;
            cursor: pointer;

            &.isActive {
                border: 1px solid #418CEE;
                color: #418CEE;
            }
        }
    }

    .commentInput {
        margin-top: -20px;

        .commentCount {
            color: #606266;
            margin-bottom: 20px;
        }

        /deep/ .el-textarea__inner {
            background-color: #F2F6FC;
        }

        .comment-btn {
            text-align: right;
            margin-top: 10px;
        }
    }

    .comments {
        margin-top: -20px;
        font-size: 14px;

        .commentsAll {
            color: #606266;
            padding-bottom: 20px;
            border-bottom: 1px solid #EBEEF5;
        }

        .comment {
            padding: 20px 0;
            border-bottom: 1px solid #EBEEF5;

            img {
                vertical-align: middle;
                margin-right: 10px;
            }

            .name {
                font-weight: 600;
            }

            .commentTime {
                float: right;
                color: #8F9399;

                span {
                    cursor: pointer;
                }

                .isActive {
                    color: #4991EE;
                }
            }

            .commentTip {
                margin-bottom: 10px;
            }

            .commentContent {
                margin-left: 35px;
                color: #606266;
                word-wrap: break-word;
                line-height: 1.5;
            }

            .commentBack {
                margin-top: 20px;
                display: flex;

                /deep/ .el-input__inner {
                    background-color: #F2F6FC;
                }
            }
        }

        .more {
            text-align: center;
            color: #4991EE;
            margin-top: 20px;
            font-weight: 600;
            cursor: pointer;
        }
    }

    .siderBarBox {
        width: 50px;
        position: fixed;
        bottom: 20%;

        .siderBar {
            border: 1px solid #EBEEF5;

            div {
                height: 50px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
            }

            div:not(:last-child) {
                border-bottom: 1px solid #EBEEF5;
            }
        }

        .backUp {
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
    }

    /deep/ .el-divider {
        margin: 10px 0;
        background-color: #EBEEF5;
    }

    /deep/ .el-breadcrumb__inner, /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
        color: #8F9399;
    }

    /deep/ .el-carousel__container {
        position: relative;
        height: 100%;
    }
</style>
