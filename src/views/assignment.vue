<template>
    <div class="container">
        <div class="headerTitle">任务平台
            <div style="float: right">
                <el-button type="primary" @click="createTask" style="" v-if="this.userRole == 1">发布任务</el-button>
            </div>
        </div>

        <div class="content" style="margin-bottom: 20px">
            <div class="tableWrap">
                <el-table :data="tableData" style="width: 100%" @row-click="jumpToDetail" stripe>
                    <el-table-column label="状态" width="80" align='center' :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span style="color:#40A9FF;font-weight: 600" v-if="scope.row.sp1 === 0">{{scope.row.sp1 | statusFilter}}</span>
                            <span style="color:#BCBCBC;font-weight: 600" v-if="scope.row.sp1 === 1">{{scope.row.sp1 | statusFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="任务名称" align='center' width="210"
                                     :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="replynum" label="回复/查看" align='center' width="100">
                        <template slot-scope="scope">
                            <span style="">{{scope.row.comentNum}}/{{scope.row.looknum}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="publisherName" label="发布者" align='center'
                                     :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="reward" label="赏金数" align='center'></el-table-column>
                    <el-table-column prop="publishertime" :show-overflow-tooltip="true" label="发布时间" align='center'
                                     min-width="180"></el-table-column>
                </el-table>
                <pagination v-show="total>0" :total="total" :page.sync="copyQuery.page" :limit.sync="copyQuery.pageSize"
                            @pagination="pageQuery"/>
            </div>
            <div class="hotList">
                <div class="hotHeader">
                    <span style="padding-left: 10px;border-left: 3px solid #418CEE">荣誉排行榜</span>
                    <span style="float: right;color:#606266;font-size: 14px">更多 <i
                            class="el-icon-arrow-right"></i></span>
                </div>
                <div class="hotListWrap">
                    <div class="hotListItem" v-for="(item,index) in honourList" :key="item.id">
                        <div style="display: flex;" class="testSize">
                            <span :class="{circle: index < 3, index: true}" :style="{backgroundColor: item.color}">{{index + 1}}</span>
                            <span style="height:16px;line-height:16px;color:#303133;margin-left: 5px;width: 60%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.userName}}</span>
                            <span style="width: calc(40% - 20px);">任务数：{{item.taskNum}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getAssignment,
    } from '@/api/assignment'
    import Pagination from '@/components/Pagination'

    export default {
        name: "Assignment",
        components: {Pagination},
        filters: {
            statusFilter(type) {
                const typeValue = {
                    0: '任务中',
                    1: '已完成',
                    // 2: '已完成',
                    // 3: '已完成',
                }
                return typeValue[type]
            }
        },
        data() {
            return {
                listQuery: {
                    page: 1,
                    pageSize: 10,
                },
                copyQuery: {
                    page: 1,
                    pageSize: 10
                },
                total: 0,
                tableData: [
                    //     {
                    //     status: 0,
                    //     name: '使用日志组件制作demo',
                    //     view: '0/0',
                    //     publishtime: '2020/04/29',
                    //     publish: '孙二鑫',
                    //     price: '1000'
                    // }
                ],
                userRole: localStorage.getItem("userInfoUserrole"),
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
            this.getList(this.listQuery);
        },
        methods: {
            //获取任务列表
            getList(obj) {
                getAssignment(obj).then(response => {
                    this.tableData = response.data.list;
                    this.total = response.data.count;
                })
            },
            //分页查询
            pageQuery() {
                this.getList(this.copyQuery)
            },
            //查看任务详情
            jumpToDetail(row) {
                this.$router.push({name: "AssignmentDetail", params: {id: row.id}});
            },
            //新建任务
            createTask() {
                this.$router.push({name: "AssignmentCreate"});
            },
        }
    }
</script>

<style scoped>
    /deep/ .el-pagination__editor.el-input .el-input__inner {
        height: 28px;
        line-height: 28px !important;
    }

    @media screen and (min-width: 1367px) {
        .headerTitle {
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: bold;
            border-bottom: 1px solid #eaeaea;
        }

        .testSize {
            height: 16px;
            line-height: 16px;
            font-size: 14px !important;
        }

        .circle {
            display: inline-block;
            width: 16px;
            height: 16px;
            line-height: 16px;
            border-radius: 10px;
            color: #fff;
            text-align: center;
            margin-top: 0px;
            font-size: 14px;
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

        .testSize {
            height: 16px;
            line-height: 16px;
            font-size: 12px !important;
        }

        .circle {
            display: inline-block;
            width: 16px;
            height: 16px;
            line-height: 16px;
            border-radius: 10px;
            color: #fff;
            text-align: center;
            margin-top: 0px;
            font-size: 12px;
        }
    }

    /deep/ .pagination-container {
        background: #fff;
        padding: 10px 16px;
    }

    /deep/ .pagination-container {
        margin-top: 0px;
    }

    .content {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }

    .tableWrap {
        width: 67%;
        border: 1px solid #EBEEF5;
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
        line-height: 16px;
        border-radius: 10px;
        text-align: center;
        margin-top: 0px;
        font-size: 14px;
    }

    .hotListItem {
        /*border-bottom: 1px dashed #eaeaea;*/
        padding: 10px 4px;
        color: #8F9399;
    }
</style>
