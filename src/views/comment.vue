<template>
    <div>
        <div class="card storyItem" v-for="item in list" :key="item.id">
            <div class="answerName">
                <img src="@/assets/user.jpg" alt="" width="38px" height="38px">
                <div class="AuthorInfo-content">{{item.userName}}</div>
            </div>
            <div class="answerContent" v-html="item.content"></div>
            <div class="ContentItem-time">发布于 {{item.createrTime}}</div>
            <div class="Comments-container">
                <div class="CommentsV2">
                    <div class="CommentTopbar">{{item.commentsCount}}条评论</div>
                    <div class="comments" v-for="item1 in item.commentFirstList" :key="item1.id">
                        <div class="rootComment">
                            <div class="CommentItemV2">
                                <div style="display: flex;justify-content: space-between">
                                    <div class="answerName">
                                        <img src="@/assets/user.jpg" alt="" width="24px" height="24px">
                                        <div class="AuthorInfo-content">{{item1.userName}}</div>
                                    </div>
                                    <div class="ContentItem-time">{{item1.commentDate}}</div>
                                </div>
                                <div class="CommentItemV2-metaSibling">
                                    <div class="CommentItemV2-content">
                                        {{item1.commentContent}}
                                    </div>
                                    <div style="color:#8590a6">
                                        <i class="el-icon-s-comment"></i>
                                        <el-button type="text" style="color:#8590a6" @click="showInput(item1)">
                                            回复
                                        </el-button>
                                    </div>
                                    <div class="publish" v-if="item1.flag">
                                        <el-input placeholder="写下你的评论..." v-model.trim="item1.data" maxlength="1000"/>
                                        <el-button type="primary" style="position:absolute;right: 0" :disabled="!item1.data"
                                                   @click="publish(item1.data, item1.articleId, item1.answerId, item1.userId, item1.id)">
                                            发布
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="childrenComment" v-for="item2 in item1.commentList" :key="item2.id">
                            <div class="CommentItemV2">
                                <div style="display: flex;justify-content: space-between">
                                    <div class="answerName">
                                        <img src="@/assets/user.jpg" alt="" width="24px" height="24px">
                                        <div class="AuthorInfo-content">{{item2.userName}} <span
                                                style="color: #8590a6">回复</span> {{item2.puserName}}
                                        </div>
                                    </div>
                                    <div class="ContentItem-time">{{item2.commentDate}}</div>
                                </div>
                                <div class="CommentItemV2-metaSibling">
                                    <div class="CommentItemV2-content">
                                        {{item2.commentContent}}
                                    </div>
                                    <div style="color:#8590a6">
                                        <i class="el-icon-s-comment"></i>
                                        <el-button type="text" style="color:#8590a6" @click="showInput(item2)">
                                            回复
                                        </el-button>
                                    </div>
                                    <div class="publish" v-if="item2.flag">
                                        <el-input placeholder="写下你的评论..." v-model.trim="item2.data" maxlength="1000"/>
                                        <el-button type="primary" style="position:absolute;right: 0" :disabled="!item2.data"
                                                   @click="publish(item2.data, item2.articleId, item2.answerId, item2.userId ,item2.levelOneId, item2.id)">
                                            发布
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comments-footer">
                        <div class="publish">
                            <el-input placeholder="写下你的评论..." v-model.trim="item.data" maxlength="1000"/>
                            <el-button type="primary" style="position:absolute;right: 0" :disabled="!item.data"
                                       @click="publish(item.data, item.articleId, item.id)">发布
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {comment} from '@/api/index'

    export default {
        name: "comment",
        props: ['list'],
        methods: {
            showInput(obj) {
                obj.flag = !obj.flag;
                this.$forceUpdate()

            },
            publish(inputId, articleId, answerId, userId, levelOneId, commentPid = levelOneId) {
                comment({
                    commentContent: inputId,
                    articleId: articleId,
                    answerId: answerId,
                    levelOneId: levelOneId,
                    commentPid: commentPid,
                    userPid: userId
                }).then(() => {
                    this.$message.success("发布成功！");
                    this.$parent.getDetail();
                })
            }
        }
    }
</script>

<style scoped>
    .answerName {
        margin-top: 10px;
        display: flex;
        align-items: center;
        margin-bottom: 4px;
    }

    .AuthorInfo-content {
        margin-left: 10px;
    }

    .answerContent {
        margin-top: 10px;
        overflow: auto;
    }

    .CommentsV2 {
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        height: 100%;
        overflow: visible;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #ebebeb;
        -webkit-box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
        box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
        background: #fff;
        margin-top: 12px;
        border-radius: 4px;
    }

    .CommentTopbar {
        border-radius: 2px;
        height: 50px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 600;
        border-bottom: 1px solid #eee;
    }

    .comments {
        position: relative;
    }

    .CommentItemV2 {
        padding: 12px 20px 10px;
        font-size: 15px;
    }

    .CommentItemV2-metaSibling {
        padding-left: 33px;
    }

    .CommentItemV2-content {
        margin-bottom: 6px;
        line-height: 25px;
    }

    .childrenComment {
        padding-left: 33px;
    }

    .comments-footer {
        padding: 12px 20px;
        border-top: 1px solid #eee;
    }

    .publish {
        padding-right: 78px;
        display: flex;
        position: relative
    }

    .ContentItem-time {
        margin-top: 10px;
        font-size: 14px;
        color: #8590a6;
    }
</style>
