<template>
    <div class="myselfclass">
        <el-dialog :close-on-click-modal="clickclose" title="意见反馈" width="560px" @close="clearFormData"
            v-if="dialogVisible" :visible.sync="dialogVisible">
            <div>
                <el-form :model="form" :rules="rules" ref="form" label-width="50px"  class="demo-dynamic">
                    <el-form-item
                        prop="title"
                        label="标题">
                        <el-input v-model="form.title" maxlength='20'></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="content"
                        label="内容">
                        <el-input type="textarea" :rows="4" maxlength="200" placeholder="上限200字符" v-model="form.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align: center;margin-top: 10px;">
                        <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {feedback} from '@/api/person'
    export default {
        name: "feedback",
        props: [],
        data() {
            return {
                dialogVisible: false,
                clickclose: false,
                content:'',
                form:{
                    content:'',
                    title:'',
                },
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                    ],
                },
            };
        },
        mounted() {

        },
        methods: {
            // 默认执行的方法 设置dialog显示
            defaultfunc() {
                this.dialogVisible = true;
            },
            // 提交表单
            submitForm() {
                
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let requireform = {
                            content:this.form.content,
                            title:this.form.title,
                        };
                        feedback(requireform).then((res) => {
                            this.clearFormData();
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 关闭dialog弹窗
            clearFormData() {
                this.dialogVisible = false;
                this.form.content = '';
                this.form.title = '';
            },
        },
    }
</script>

<style scoped>
    /deep/ .myselfclass .el-dialog__header{
        padding: 10px!important;
    }
</style>
