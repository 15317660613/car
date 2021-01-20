<!--任务详情-->
<template>
    <div class="container">
        <!--<div class="headerTitle">任务详情-->
        <!--<div style="float: right">-->
        <!--<el-button type="primary" @click="back" style="">返回</el-button>-->
        <!--</div>-->
        <el-breadcrumb separator="/"
                       class="headerTitle">
            <el-breadcrumb-item :to="{ path: '/assignment' }">任务平台</el-breadcrumb-item>
            <el-breadcrumb-item>任务详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!--</div>-->
        <div class="content">
            <div class="titleContent">
                <div style="line-height: 20px;color: #333333;font-size:14px;font-weight:600;">{{assignmentData.title}}
                </div>
                <div style="margin-top: 10px;width: 100%;;display: inline-flex">
                    <!--<div class="titleItem">-->
                    <!--<div style="margin-left: 5px;line-height: 20px;height: 20px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">-->
                    <!--<i class="iconfont iconicon_user" style=";font-size: 12px"></i>发布者：{{assignmentData.publisherName}}-->
                    <!--</div>-->
                    <!--</div>-->
                    <div class="titleItem">
                        <div style="line-height: 20px;height: 20px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                            <i class="iconfont iconicon_user" style="font-size: 12px;"
                               :title="assignmentData.publisherName"><span style="margin-left: 5px">发布者：{{assignmentData.publisherName}}</span></i>
                        </div>
                        <!--<span style="margin-left: 5px"></span>-->
                    </div>
                    <div class="titleItem" style="margin-left: 30px">
                        <div style="line-height: 20px;height: 20px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                            <i class="iconfont iconicon_time"
                               style="font-size: 12px;"><span style="margin-left: 5px">发布时间：{{assignmentData.publishertime}}</span></i>
                        </div>
                        <!--<span style="margin-left: 5px"></span>-->
                    </div>
                    <div class="titleItem" style="margin-left: 30px">
                        <div style="line-height: 20px;height: 20px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                            <i class="iconfont iconicon_time"
                               style="font-size: 12px;"><span style="margin-left: 5px">截止时间：{{assignmentData.deadlinetime}}</span></i>
                        </div>
                        <!--<span style="margin-left: 5px"></span>-->
                    </div>
                    <div class="titleItem" style="margin-left: 30px">
                        <div style="line-height: 20px;height: 20px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                            <i class="iconfont iconbianzu4" style="font-size: 12px;"><span style="margin-left: 5px">状态：{{assignmentData.sp1 |
                                statusFilter}}</span></i>
                        </div>
                        <!--<span style="margin-left: 5px"></span>-->
                    </div>
                </div>
            </div>
            <div class="contentDetail">
                <div style="display: inline-flex">
                    <div style="width:3px;height:20px;background:rgba(48,99,246,1);display: inline-block"></div>
                    <div style="height:20px;font-size:14px;font-weight:600;color:rgba(51,51,51,1);line-height:20px;display: inline-block;margin-left: 5px">
                        任务详情
                    </div>
                </div>
                <div class='assignmentDataFont' style="margin-left: 10px;margin-top: 13px"
                     v-html="assignmentData.details"></div>
            </div>
            <div style="height:1px;background-color: #EBEEF5;width: 100%;margin-top: 20px"></div>
            <div class="contentDetail">
                <div style="display: inline-flex">
                    <div style="width:3px;height:20px;background:rgba(48,99,246,1);display: inline-block"></div>
                    <div style="height:20px;font-size:14px;font-weight:600;color:rgba(51,51,51,1);line-height:20px;display: inline-block;margin-left: 5px">
                        任务附件
                    </div>
                </div>
                <div class="fileContent">
                    <div style="margin-top: 10px;width: 100%;">
                        <el-table
                                slot="empty"
                                :data="assignmentData.fileVOList"
                                :show-header="false"
                                empty-text='无附件'
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="文件名"
                            >
                            </el-table-column>
                            <el-table-column label="下载">
                                <template slot-scope="scope">
                            <span style="color:#40A9FF;text-decoration: underline"
                                  @click="handleShowDetail(scope.row.id)">下载</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div style="height:1px;background-color: #EBEEF5;width: 100%;margin-top: 28px"></div>
            <div style="width: 100%;padding-top: 40px;text-align: center" v-if="userInfo">
                <el-button type="primary" class="dev-button" @click="finishTask" :style="test(taskAction)">
                    {{taskAction}}
                </el-button>
                <div class="assigntips">注：发布者可在截止日期前主动结束任务，已结束的任务不可继续报名结束任务</div>
            </div>
            <el-dialog width="400px" style="border-radius: 5px;" :visible.sync="modelShow" center
                       :close-on-press-escape="false">
                <div slot="title">
                    <div style="font-weight: 600" class="login-name">报名接包</div>
                </div>
                <el-form ref="form" :model="form" size="small" style="text-align: center"
                         label-position="left"
                         label-width="90px">
                    <el-row style="margin:0px 40px 0px 10px;">
                        <el-form-item label="联系方式" prop="contractWay">
                            <el-input v-model="form.contractWay" maxlength="11"/>
                        </el-form-item>
                    </el-row>
                    <el-button style="width: 120px;margin-bottom: 20px;" type="primary"
                               class="loginbutton"
                               @click="handleAccept">接 包
                    </el-button>
                </el-form>
            </el-dialog>
            <el-dialog width="50%" height="100%" style="border-radius: 5px" :visible.sync="modelRegisterShow" center
                       class="registerDialog"
                       :close-on-press-escape="false"
            >
                <div slot="title">
                    <div style="font-weight: 600" class="login-name">请完善个人信息</div>
                </div>
                <el-form ref="registerForm" :model="registerForm" :rules="rules" size="small"
                         style="padding: 0 50px;display: inline">
                    <el-row>
                        <el-form-item prop="userrole" style="width: 45%;display: inline-block" class="tipsWidth45">
                            <div class="" style="display: inline-block;width: 45%;text-align: right">用户类型：</div>
                            <el-select v-model="registerForm.userrole" placeholder="请选择"
                                       style="display:inline-block;width: 50%;margin-left: 15px">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="width: 45%;display: inline-block;visibility: hidden" class="tipsWidth45">
                            <div class="" style="display: inline-block;width: 45%;text-align: right">用户类型：</div>
                            <el-input class="search-input"
                                      style="display:inline-block;width: 50%;margin-left: 15px"/>
                        </el-form-item>
                        <el-form-item prop="username" style="width: 45%;display: inline-block" class="tipsWidth45">
                            <div class="" style="display: inline-block;width: 45%;text-align: right">用户名：</div>
                            <el-input class="search-input" v-model="registerForm.username" maxlength="49" disabled
                                      style="display:inline-block;width: 50%;margin-left: 15px"/>
                        </el-form-item>
                        <el-form-item prop="contactName" style="width: 45%;display: inline-block" class="tipsWidth45">
                            <div class="" style="display: inline-block;width: 45%;text-align: right">联系人：</div>
                            <el-input class="search-input" v-model="registerForm.contactName" maxlength="9"
                                      style="display:inline-block;width: 50%;margin-left: 15px"/>
                        </el-form-item>
                        <el-form-item prop="contactTel" style="width: 45%;display: inline-block" class="tipsWidth45">
                            <div class="" style="display: inline-block;width: 45%;text-align: right">联系电话 ：</div>
                            <el-input class="search-input" v-model="registerForm.contactTel" maxlength="11"
                                      style="display:inline-block;width: 50%;margin-left: 15px"/>
                        </el-form-item>
                        <el-form-item prop="contactEmail" style="width: 45%;display: inline-block" class="tipsWidth45">
                            <div class="" style="display: inline-block;width: 45%;text-align: right">联系邮箱：</div>
                            <el-input class="search-input" v-model="registerForm.contactEmail" maxlength="29"
                                      style="display:inline-block;width: 50%;margin-left: 15px"/>
                        </el-form-item>
                        <el-form-item prop="mailAddress" style="width: 90%;display: inline-block" class="tipsWidth">
                            <div class="" style="display: inline-block;width: 22.5%;text-align: right">通信地址：</div>
                            <el-input class="search-input" v-model="registerForm.mailAddress" maxlength="499"
                                      style="display:inline-block;width: 75%;margin-left: 15px"/>
                        </el-form-item>
                        <el-form-item prop="idcardup" style="width: 45%;display: inline-block"
                                      class="tipsWidth45">
                            <div class="" style="display: inline-block;width: 45%;text-align: right;line-height: 135px">
                                身份证正面：
                            </div>
                            <el-upload class="avatar-uploader"
                                       :action="'/api/upload'"
                                       :show-file-list="false"
                                       :on-success="uploadSuccess"
                                       style="display: inline-block;width: 212px;height: 135px;border: 1px solid #ccc;border-radius: 5px;margin-left: 15px">
                                <img v-if="registerForm.idcardupfilePath"
                                     :src="registerForm.idcardupfilePath"
                                     class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item prop="idcarddown" style="width: 45%;display: inline-block"
                                      class="tipsWidth45">
                            <div class="" style="display: inline-block;width: 45%;text-align: right;line-height: 135px">
                                身份证背面：
                            </div>
                            <el-upload class="avatar-uploader"
                                       :action="'/api/upload'"
                                       :show-file-list="false"
                                       :on-success="uploadidcarddownSuccess"
                                       style="display: inline-block;width: 212px;height: 135px;border: 1px solid #ccc;border-radius: 5px;margin-left: 15px">
                                <img v-if="registerForm.idcarddown"
                                     :src="registerForm.idcarddownfilePath"
                                     class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-row>
                    <div style="width: 100%;text-align: center">
                        <el-button style="width: 300px;margin-bottom: 20px;margin-top: 20px" type="primary"
                                   class="loginbutton"
                                   @click="handleRegister">提 交
                        </el-button>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        getAssignmentDetail, getAssignmentFinish, accept, register, getAssignmentAcceptFinish
    } from '@/api/assignmentDetail'
    import {deepclone} from "../utils/common";

    let phone = (rule, value, callback) => {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!reg.test(value) && value) {
            callback(new Error('请输入正确的手机号'))
        } else {
            callback()
        }
    }
    let mail = (rule, value, callback) => {
        let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if (!reg.test(value) && value) {
            callback(new Error('邮箱格式不正确'))
        } else {
            callback()
        }
    }
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
                userInfo: localStorage.getItem('userInfo'),
                options: [{
                    value: '2',
                    label: '个人用户'
                }],
                modelShow: false,
                modelRegisterShow: false,//个人用户完善信息dialog
                assignmentId: this.$route.params.id,
                listQuery: {
                    page: 1,
                    pageSize: 10,
                },
                form: {
                    contractWay: '',
                    taskId: this.$route.params.id,
                },
                registerForm: {
                    userrole: "2",
                    contactName: '',
                    username: '',
                    userpassword: '',
                    contactTel: '',
                    contactEmail: '',
                    mailAddress: '',
                    idcardup: '',//身份证正面
                    idcardupfilePath: '',//身份证正面地址
                    idcarddown: '',//身份证背面
                    idcarddownfilePath: '',//身份证背面地址
                },
                rules: {
                    contactName: [
                        {required: true, message: '联系人不能为空', trigger: 'blur'}],
                    contactTel: [
                        {required: false, message: '联系电话不能为空', trigger: 'blur'},
                        {validator: phone, trigger: 'blur'}],
                    contactEmail: [
                        {required: false, message: '邮箱不能为空', trigger: 'blur'},
                        {validator: mail, trigger: 'blur'}],
                    mailAddress: [
                        {required: false, message: '通信地址不能为空', trigger: 'blur'},
                    ],
                    idcardup: [
                        {required: false, message: '请上传身份证正面照片', trigger: 'blur'},
                    ],
                    idcarddown: [
                        {required: false, message: '请上传身份证背面照片', trigger: 'blur'},
                    ],
                },
                copyQuery: {
                    page: 1,
                    pageSize: 10
                },
                total: 0,
                taskAction: '',
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
            this.getAssignmentDetail();
        },
        methods: {
            back() {
                window.history.back()
            },
            handleShowDetail(id) {
                //查看招标文件
                var url = '/api/download/' + id;
                window.open(url);
            },
            test(str) {
                if (str === '已停止接包') {
                    return {
                        background: "#cccccc",
                    }
                } else if (str === '结束接包') {
                    return {
                        background: "#418cee",
                    }
                } else if (str === '接包成功') {
                    return {
                        background: "#85ce61",
                    }
                }

            },
            getAssignmentDetail() {
                getAssignmentDetail(this.assignmentId).then(response => {
                    if (localStorage.getItem("userInfoId") == response.data.creatorId) {
                        //此任务为当前用户发布，当前登录用户可结束任务
                        if (response.data.sp1 == 1) {
                            this.taskAction = '已停止接包'
                        } else {
                            this.taskAction = '结束接包'
                        }
                    } else {
                        if (response.data.acceptState == 0) {
                            //当前登录用户尚未接包此任务
                            if (response.data.sp1 == 1) {
                                this.taskAction = '已停止接包'
                            } else {
                                this.taskAction = '报名接包'
                            }
                        } else {
                            this.taskAction = '接包成功'
                        }

                    }
                    this.assignmentData = response.data;
                    this.test(this.taskAction);
                })
            },
            pageQuery() {
                this.getList(this.copyQuery)
            },
            finishTask() {
                if (this.taskAction == '结束接包') {
                    //结束任务
                    let info = {}
                    info.id = this.$route.params.id
                    info.sp1 = 1
                    getAssignmentAcceptFinish(info).then(response => {
                        if (response.ok) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 2000,
                            })
                            this.getAssignmentDetail();
                        } else {
                            this.$message({
                                message: response.message,
                                type: 'error',
                                duration: 2000,
                            })
                        }

                    })
                } else if (this.taskAction == '报名接包') {
                    //报名接包
                    //报名接包需输入联系方式
                    //判断当前用户类型，如为个人用户，需判断用户是否通过审核，未通过审核需要补充填写个人信息
                    if (localStorage.getItem("userInfoUserrole") == '2' && localStorage.getItem("userInfoAccountState") != 1) {
                        this.register(JSON.parse(localStorage.getItem("userInfoDetail")))
                    } else {
                        this.modelShow = true;
                        this.form = {
                            contractWay: '',
                            taskId: this.$route.params.id,
                        }
                    }
                }
            },
            handleAccept() {
                //接包
                let loginData = deepclone(this.form);
                this.loading = true;
                accept(loginData).then(response => {
                    this.$message({
                        message: '接包成功！',
                        type: 'success',
                        duration: 2000,
                        onClose: () => {
                            this.modelShow = false;
                            this.getAssignmentDetail();
                        }
                    })
                })
            },
            register(data) {
                this.resetForm(data)
                this.modelRegisterShow = true;
            },
            resetForm(data) {
                this.registerForm = {
                    userrole: "2",
                    contactName: data.contactName,
                    username: data.username,
                    contactTel: data.contactTel,
                    contactEmail: data.contactEmail,
                    mailAddress: data.mailAddress,
                    idcardup: data.idcardup,//身份证正面
                    idcardupfilePath: data.idcardupfilePath,//身份证正面地址
                    idcarddown: data.idcarddown,//身份证背面
                    idcarddownfilePath: data.idcarddownfilePath,//身份证背面地址
                }
            },
            uploadSuccess(response, file, fileList) {
                // this.$refs.filePath.value(response.data.savePath)
                if (response.ok) {
                    this.registerForm.idcardup = response.data.id;
                    // this.temp.filePath = response.data.savePath;
                    this.registerForm.idcardupfilePath = response.data.url;
                    this.$forceUpdate();
                    // this.$message({
                    //   message: response.data,
                    //   type: 'success'
                    // });
                } else {
                    this.registerForm.idcardup = ''
                    this.$forceUpdate();
                    // this.temp.filePath = 'Files\\' + ''
                    this.$message.error(response.message);
                }
            },
            uploadidcarddownSuccess(response, file, fileList) {
                // this.$refs.filePath.value(response.data.savePath)
                if (response.ok) {
                    this.registerForm.idcarddown = response.data.id;
                    // this.temp.filePath = response.data.savePath;
                    this.registerForm.idcarddownfilePath = response.data.url;
                    this.$forceUpdate();
                    // this.$message({
                    //   message: response.data,
                    //   type: 'success'
                    // });
                } else {
                    this.registerForm.idcarddown = ''
                    this.$forceUpdate();
                    // this.temp.filePath = 'Files\\' + ''
                    this.$message.error(response.message);
                }
            },
            handleRegister() {
                this.$refs.registerForm.validate(valid => {
                    if (valid) {
                        let loginData = deepclone(this.registerForm);
                        loginData.id = localStorage.getItem("userInfoId")
                        this.loading = true;
                        register(loginData).then(response => {
                            this.$message({
                                message: '个人信息提交成功！',
                                type: 'success',
                                duration: 2000,
                                onClose: () => {
                                    this.modelRegisterShow = false;
                                    localStorage.setItem('userInfoDetail', JSON.stringify(response.data))
                                    localStorage.setItem('userInfoId', response.data.id)
                                    localStorage.setItem('userInfoUserrole', response.data.userrole)//用户类型1为企业用户，2为个人用户
                                    localStorage.setItem('userInfoAccountState', response.data.accountState)//账号状态0.未审核1.已审核2.审核未通过
                                    this.userInfo = localStorage.getItem("userInfo")
                                }
                            })
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
        }
    }
</script>

<style scoped>

    @media screen and (min-width: 1367px) {
        .assignmentDataFont {
            font-size: 14px;
        }

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
        .assignmentDataFont {
            font-size: 12px;
        }

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

    /deep/ .el-dialog--center .el-dialog__body {
        padding: 0;
        padding-top: 20px;
    }

    /deep/ .el-form--label-left .el-form-item__label {
        text-align: right;
    }

    /deep/ .avatar-uploader-icon {
        line-height: 135px;
        text-align: center;
    }

    /deep/ .el-upload {
        width: 100%;
        height: 100%;
        line-height: 135px;
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
        width: 100%;
        padding-bottom: 20px;
    }

    .fileContent {
        background: rgba(246, 246, 246, 1);
        padding-left: 13px;
        padding-right: 13px;
        width: 100%;
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
        width: 220px;
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

    /deep/ .el-dialog__headerbtn {
        position: absolute;
        top: 0px;
        right: 20px;
        height: 50px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
        line-height: 50px;
    }

    /deep/ .el-dialog__header {
        padding: 0;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc
    }
</style>
