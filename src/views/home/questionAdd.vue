<template>
    <div class="">
        <el-dialog :close-on-click-modal="clickclose" title="填写调查问卷" width="560px" @close="clearFormData(1)"
                   v-if="dialogVisible" :visible.sync="dialogVisible">
            <div>
                <div style="display: flex;justify-content: center;margin-bottom: 15px">
                    <div class="step num">1</div>
                    <div class="step" style="margin-left: 5px">下载调查问卷并填写</div>
                    <i class="el-icon-arrow-right" style="margin-left: 10px;margin-right: 10px"></i>
                    <div class="step num">2</div>
                    <div class="step" style="margin-left: 5px">上传已填写的问卷</div>
                </div>
                <div style="display: flex;justify-content: center;margin-bottom: 15px">
                    <el-button type="primary" @click="download"
                               style="border: 1px solid #0081D1;background: rgba(0, 129, 209, 0.1);color: #0081D1;"><i
                            class="iconfont iconcar-app-twentytwo el-icon--left"></i>下载问卷
                    </el-button>
                    <el-upload
                            name="files"
                            :data="postdata"
                            :file-list="fileList"
                            multiple
                            class="upload-demo"
                            accept=".doc,.docx,.pdf"
                            action="/auto-appstore/industry-knowledge/api/upload/questionnaireFile"
                            :show-file-list="false"
                            :on-success="uploadPDFSuccess"
                            :before-upload="beforeAvatarUpload"
                            :on-change="handleChange"
                            style="display: inline-block;">
                        <el-button type="primary" style="margin-left: 20px;background: #0081D1"><i
                                class="iconfont iconxingzhuangbeifen3 el-icon--left"></i>上传问卷
                        </el-button>
                    </el-upload>
                </div>
                <el-form :model="form" :rules="rules" ref="newAddDialog" label-width="80px" class="demo-dynamic"
                         style="text-align: center">
                    
                    <el-form-item prop="fileName">
                        <el-input v-model="form.fileName" style="width: 270px" disabled
                                  placeholder="请上传文件"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="content" style="width: 270px" maxlength="50"
                                  placeholder="反馈内容"></el-input>
                    </el-form-item>
                    <div style="width: 100%;height: 1px;background: #EBEEF5"></div>
                    <div class="qTitle">{{questionName}}</div>
                    <div class="qDesc">{{questionDesc}}</div>
                    <div style="text-align: center">
                        <el-button type="primary" @click="submitForm('newAddDialog')">提交</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {getQuestionDetail, getQuestionDownload, getCommitAnswer,fileDelete} from '@/api/home';
    // import {fileDelete} from '@/assets/api/file';
    const axios = require('axios');
    export default {
        name: "NewAddTrain",
        props: [],
        data() {
            return {
                fileList: [],
                postdata: {
                    type: '3'
                },
                questionId: '',
                questionName: '',
                questionDesc: '',
                dialogVisible: false,
                clickclose: false,
                form: {
                    fileName: '',
                },
                content:'',
                rules: {
                    fileName: [
                        {required: true, message: '请上传问卷', trigger: 'blur'},
                    ],
                },
                options: [],
                questionDownloadId: ''//下载调查问卷id
            };
        },
        mounted() {

        },
        methods: {
            //获取问卷详情
            getDetailData(data) {
                getQuestionDetail(data).then((res) => {
                    if (res.data.questionnaireFile) {
                        this.questionDownloadId = res.data.questionnaireFile.id
                    }
                })

            },
            handleChange(file, fileList) {
                if (fileList.length > 0) {
                    this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
                }
            },
            // 默认执行的方法 设置dialog显示
            defaultfunc(data) {
                this.questionId = data.id
                this.questionName = '问卷名称：' + (data.title ? data.title : '')
                this.questionDesc = '问卷说明：' + (data.questionName ? data.questionName : '')
                this.getDetailData(data.id)
                this.dialogVisible = true;
            },
            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var info = {}
                        info.questionId = this.questionId;
                        info.questionnaireFile = this.form;
                        info.questionnaireFile.type = '3';
                        info.content = this.content;
                        getCommitAnswer(info).then((res) => {
                            if (res.ok) {
                                this.$emit("refresh");
                                this.clearFormData();
                                return this.$message.success("反馈提交成功");
                            } else {
                                return this.$message.error(res.message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 关闭dialog弹窗
            clearFormData(type) {
                // 点击关闭的时候  取消上传的文件
                if(type==1){
                    let requireform = [];
                    requireform.push(this.form.filePath);
                    fileDelete(requireform).then((res) => {
                            
                    });
                }
                this.fileList = [];
                this.content = '';
                this.form = {
                    fileName: '',
                    filePath: '',
                };

                this.dialogVisible = false;
            },
            uploadPDFSuccess(response, file, fileList) {
                console.log(response);
                if (response.ok) {
                    this.$message.success('导入成功');
                    this.form = response.data[0]
                } else {
                    this.$message.error(response.message);
                }
            },
            // 上传之前
            beforeAvatarUpload(file) {
                var fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
                const isTrueFile = fileExtension === 'doc'||fileExtension === 'docx'||fileExtension === 'pdf';

                if (!isTrueFile) {
                  this.$message.error('文件格式不正确,仅限word文件和pdf文件');
                }
                return isTrueFile;
            },
            download() {
                if (this.questionDownloadId) {
                    var url = '/auto-appstore/industry-knowledge/api/download/questionnaireFile/' + this.questionDownloadId + '?type=3'
                    axios({
                        method: 'get',
                        url: url,
                    }).then((res) => {
                        if (res.data.message) {
                            this.$message.error(res.data.message)
                        } else {
                            window.open(url);
                        }
                    })
                } else {
                    this.$message.error('文件不存在')
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-form-item__error {
        margin-left: 125px;
    }

    .el-form-item {
        margin-bottom: 20px;
    }

    .step {
        text-align: center;
        height: 15px;
        font-size: 12px;
        line-height: 15px;
        font-weight: 500;
        color: #8F9399;
    }

    .num {
        width: 15px;
        border: 1px solid rgb(220, 223, 230);
        border-radius: 100%;
    }

    /deep/ .el-form-item__content {
        margin-left: 0px !important;
    }

    .qTitle {
        font-size: 12px;
        font-weight: 500;
        color: #8F9399;
        line-height: 17px;
        text-align: left;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .qDesc {
        text-align: left;
        font-size: 12px;
        font-weight: 500;
        color: #8F9399;
        line-height: 17px;
        margin-bottom: 20px;
    }
</style>
