<!--发布任务-->
<template>
    <div class="container">
        <el-breadcrumb separator="/"
                       class="headerTitle">
            <el-breadcrumb-item :to="{ path: '/assignment' }">任务平台</el-breadcrumb-item>
            <el-breadcrumb-item>发布任务</el-breadcrumb-item>
        </el-breadcrumb>
        <!--<div class="headerTitle">发布任务</div>-->
        <div class="content">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <div style="display: inline-flex;justify-content: space-between;width: 100%">
                    <el-form-item label="任务名称" style="" class="nameLabel" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="截止时间" style="width: 224px" prop="deadlinetime">
                        <el-date-picker
                                v-model="form.deadlinetime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH"
                                placeholder="选择时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="赏金" style="width: 224px" prop="reward">
                        <el-input v-model="form.reward"></el-input>
                    </el-form-item>
                </div>
                <el-form-item prop="details">
                    <quill-editor
                            v-model="form.details"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                    </quill-editor>
                </el-form-item>
                <el-form-item style="width: 486px">
                    <el-upload
                            class="upload-demo"
                            action="/api/upload"
                            :on-preview="handlePreview"
                            :on-success="uploadSuccess"
                    >
                        <el-button size="small" type="primary">添加附件</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div style="width: 100%;padding-top: 40px;text-align: center">
                <el-button class="dev-button" @click="handleCreate">发布任务</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getAddAssignment
    } from '@/api/assignmentCreate'

    import {deepclone} from "../utils/common";

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
                fileList: [],
                editorOption: {
                    placeholder: '请输入任务详情',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'direction': 'rtl'}],
                            [{'color': []}, {'background': []}],
                            [{'font': ['Microsoft-YaHei', 'SimSun', 'SimHei', 'KaiTi', 'Arial', 'sans-serif']}],
                            [{'align': []}],
                            ['clean'],
                            ['link', 'image']
                        ]
                    }
                },
                copyQuery: {
                    page: 1,
                    pageSize: 10
                },
                total: 0,
                rules: {
                    title: [
                        {required: true, message: '任务名称不能为空', trigger: 'blur'},
                    ],
                    deadlinetime: [
                        {required: true, message: '截止时间不能为空', trigger: 'blur'}],
                    details: [
                        {required: true, message: '任务详情不能为空', trigger: 'blur'}],
                    reward: [
                        {required: true, message: '赏金不能为空', trigger: 'blur'},
                    ]
                },
                form: {
                    title: '',
                    deadlinetime: '',
                    details: '',
                    fileIdList: [],
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
        },
        methods: {

            onEditorReady() { // 准备编辑器
            },
            onEditorBlur() {
            }, // 失去焦点事件
            onEditorFocus() {
            }, // 获得焦点事件
            onEditorChange() {
            }, // 内容改变事件
            handleCreate() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        let loginData = deepclone(this.form);
                        loginData.deadlinetime = loginData.deadlinetime + ':00:00'
                        this.loading = true;
                        getAddAssignment(loginData).then(response => {
                            this.$message({
                                message: '发布成功等待审批！',
                                type: 'success',
                                duration: 2000,
                                onClose: () => {
                                    this.$router.push({name: "createSuccess"});
                                }
                            })
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            uploadSuccess(response, file, fileList) {
                // this.$refs.filePath.value(response.data.savePath)
                if (response.ok) {
                    var arr = [];
                    for (var i = 0; i < fileList.length; i++) {
                        arr.push(fileList[i].response.data.id);
                    }
                    this.form.fileIdList = arr;
                    // this.temp.filePath = response.data.savePath;
                    this.$forceUpdate();
                    // this.$message({
                    //   message: response.data,
                    //   type: 'success'
                    // });
                } else {
                    this.form.fileIdList = []
                    this.$forceUpdate();
                    // this.temp.filePath = 'Files\\' + ''
                    this.$message.error(response.message);
                }
            },
        }
    }
</script>

<style scoped>

    /deep/ .el-form-item::before, .el-form-item::after {
        display: inherit;
    }

    .dev-button {
        width: 88px;
        height: 32px;
        padding: 0;
        background: rgba(250, 250, 250, 1);
        border-radius: 4px;
        margin-bottom: 37px;
        border: 1px solid rgba(221, 221, 221, 1);
    }

    /deep/ .ql-toolbar.ql-snow {
        border: 1px solid #ccc;
        box-sizing: border-box;
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        padding: 8px;
        border-radius: 4px 4px 0px 0px;
    }

    /deep/ .ql-container.ql-snow {
        border-radius: 0px 0px 4px 4px;
    }

    /deep/ .ql-editor {
        height: 380px;
    }

    /deep/ .el-form-item {
        display: block;
    }

    /deep/ .el-form-item__label {
        /* text-align: right; */
        vertical-align: middle;
        float: none;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
    }

    /deep/ .el-form-item__content {
        margin-left: 0px !important;
        line-height: 40px;
        position: relative;
        font-size: 14px;
    }

    .content {
        margin-top: 10px;
    }

    .nameLabel {
        width: 486px
    }

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

        .nameLabel {
            width: 300px
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
</style>
