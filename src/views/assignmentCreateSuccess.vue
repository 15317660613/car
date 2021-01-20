<!--任务发布成功-->
<template>
    <div class="container">
        <el-breadcrumb separator="/"
                       class="headerTitle">
            <el-breadcrumb-item :to="{ path: '/assignment' }">任务平台</el-breadcrumb-item>
            <el-breadcrumb-item>发布成功</el-breadcrumb-item>
        </el-breadcrumb>
        <!--<div class="headerTitle">任务平台</div>-->
        <div class="content">
            <div style="width: 100%;text-align: center;padding-top: 146px;padding-bottom: 216px">
                <img src="../assets/img_create_assignment_success.png">
                <div style="height:28px;font-size:20px;font-weight:600;color:rgba(51,51,51,1);line-height:28px;margin-top: 24px">
                    恭喜您任务发布成功，请您耐心等待后台审核！
                </div>
                <div style="height:22px;font-size:14px;font-weight:400;color:rgba(102,102,102,1);line-height:22px;margin-top: 16px">
                    如果长时间未通过审核，请立即<span style="color: #418CEE">联系管理员</span></div>
                <div style="margin-top: 46px">
                    <el-button type="primary" class="dev-button" style="width: 103px" @click="backTask">继续发布任务
                    </el-button>
                    <!--                    <el-button type="primary" class="dev-button" style="background:rgba(250,250,250,1);border:1px solid rgba(221,221,221,1);color:rgba(51,51,51,1);" @click="finishTask">查看任务</el-button>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getAssignmentDetail, getAssignmentFinish
    } from '@/api/assignmentDetail'

    export default {
        name: "AssignmentDetail",
        filters: {
            statusFilter(type) {
                const typeValue = {
                    0: '任务中',
                    1: '已完成'
                }
                return typeValue[type]
            }
        },
        data() {
            return {
                assignmentId: this.$route.params.id,
                listQuery: {
                    page: 1,
                    pageSize: 10,
                },
                copyQuery: {
                    page: 1,
                    pageSize: 10
                },
                total: 0,
                assignmentData: {
                    title: '',
                    publishertime: '',
                    deadlinetime: '',
                    details: '',
                    fileVOList: [],
                },
                honourList: [
                    {
                        id: 1,
                        color: '#FBCA03',
                        userName: '创始人',
                        taskNum: '15'
                    },
                    {
                        id: 2,
                        color: '#ABC5E2',
                        userName: 'quyueming',
                        taskNum: '9'
                    }

                ]
            }
        },
        created() {
            // this.getAssignmentDetail();
        },
        methods: {
            getAssignmentDetail() {
                getAssignmentDetail(this.assignmentId).then(response => {
                    this.assignmentData = response.data;
                })
            },
            pageQuery() {
                this.getList(this.copyQuery)
            },
            finishTask() {
                //结束任务
                getAssignmentFinish(this.$route.params.id).then(response => {
                    this.assignmentData = response.data;
                })
            },
            backTask() {
                //继续发布任务
                window.history.back()
            },
        }
    }
</script>

<style scoped>

    @media screen and (min-width: 1367px) {
        .headerTitle {
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: bold;
            border-bottom: 1px solid #eaeaea;
        }
        /*<!--面包屑-->*/
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
            font-weight: normal;
            color: #000;
            font-weight: 600 !important;
            font-size: 20px;
            cursor: text;
        }

        /deep/ .el-breadcrumb__inner, .el-breadcrumb__inner a {
            font-weight: 400 !important;
            font-size: 14px;
            color: #666;
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
        /*<!--面包屑-->*/
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
            font-weight: normal;
            color: #000;
            font-weight: 600 !important;
            font-size: 14px;
            cursor: text;
        }

        /deep/ .el-breadcrumb__inner, .el-breadcrumb__inner a {
            font-weight: 400 !important;
            font-size: 12px;
            color: #666;
        }
    }

    /deep/ .el-table .cell {
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        font-size: 14px;
        font-weight: 600;
        color: rgba(65, 140, 238, 1);
        line-height: 20px;
    }

    /deep/ .el-table th, .el-table tr {
        background-color: rgba(246, 246, 246, 1);
    }

    /deep/ .el-table {
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        flex: 1;
        width: 100%;
        max-width: 100%;
        font-size: 14px;
        color: #606266;
        background-color: rgba(246, 246, 246, 1);
    }

    /deep/ .el-table tr {
        background-color: rgba(246, 246, 246, 1);
    }

    .assigntips {
        height: 40px;
        font-size: 14px;
        font-weight: 600;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        margin-top: 27px;
        margin-bottom: 43px;
    }

    .titleContent {
        background: rgba(246, 246, 246, 1);
        padding-top: 10px;
        padding-left: 13px;
        padding-right: 13px;
        width: calc(100% - 26px);
        padding-bottom: 20px;
    }

    .fileContent {
        background: rgba(246, 246, 246, 1);
        padding-left: 13px;
        padding-right: 13px;
        width: calc(100% - 29px);
        margin-top: 13px;
        border-left: 3px solid #E6E6E6;
    }

    .dev-button {
        width: 88px;
        line-height: 32px;
        height: 32px;
        padding: 0;
        font-size: 14px;
        background-color: #418CEE;
        border: #418CEE;
    }

    .titleItem {
        width: 20%;
        height: 17px;
        font-size: 12px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
    }

    .content {
        margin-top: 10px;
    }

    .contentDetail {
        margin-top: 20px;
    }

    .tableWrap {
        width: 67%;
        border: 1px solid #EBEEF5;
    }

    /deep/ .el-table__body {
        width: 100%;
    }

    .hotList {
        width: 30%;
        border: 1px solid #eaeaea;
        padding: 10px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }

    .hotHeader {
        padding-bottom: 10px;
        border-bottom: 1px solid #eaeaea;
    }

    .index {
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 20px;
        border-radius: 10px;
        text-align: center;
        margin-top: 3px;
        font-size: 14px;
    }

    .circle {
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 10px;
        color: #fff;
        text-align: center;
        margin-top: 3px;
        font-size: 14px;
    }

    .hotListItem {
        border-bottom: 1px dashed #eaeaea;
        padding: 14px 4px;
        color: #8F9399;
    }
</style>
