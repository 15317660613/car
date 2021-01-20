<template>
    <div class="myselfclass">
        <el-dialog :close-on-click-modal="clickclose" title="修改密码" width="560px" @close="clearFormData"
            v-if="dialogVisible" :visible.sync="dialogVisible">
            <div>
                <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-dynamic">
                    <el-form-item
                        prop="oldPsw"
                        label="原密码">
                        <el-input
                            placeholder="原密码"
                            style="width: 200px"
                            v-model="form.oldPsw"
                            type="password"
                            >
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        prop="newPsw1"
                        label="新密码">
                        <el-input
                            placeholder="新密码"
                            style="width: 200px"
                            v-model="form.newPsw1"
                            type="password">
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        prop="newPsw2"
                        label="确认新密码">
                        <el-input
                            placeholder="确认新密码"
                            style="width: 200px"
                            v-model="form.newPsw2"
                            type="password">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">提交</el-button>
                        <el-button @click="clearFormData">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {staffupdatePsw} from '@/api/person';
    import {thiscryptoJS} from "@/utils/CryptoJs";
    export default {
        name: "changePassword",
        props: [],
        data() {
            // 旧密码验证
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.form.newPsw1) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            // 新密码验证
            var validatePass = (rule, value, callback) => {
                let reg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}$/;
                if (value != ''&&!reg.test(value)) {
                   callback(new Error('应包含数字、小写字母、大写字母'));
                } else {
                    callback();
                }
            };
            return {
                dialogVisible: false,
                clickclose: false,
                form:{
                    oldPsw:'',
                    newPsw1:'',
                    newPsw2:'',
                },
                rules: {
                    oldPsw: [
                        { required: true, message: '请输入原密码', trigger: 'blur' },

                    ],
                    newPsw1: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在6-12个字符', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    newPsw2: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
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
                staffupdatePsw(this.form).then((res) => {
                    this.clearFormData();
                })
            },
            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let requireform={
                            oldPsw:thiscryptoJS.encryptNoPadding(this.form.oldPsw),
                            newPsw1:thiscryptoJS.encryptNoPadding(this.form.newPsw1),
                            newPsw2:thiscryptoJS.encryptNoPadding(this.form.newPsw2),
                            staffId:JSON.parse(sessionStorage.getItem('userInfo')).id,
                        }
                        staffupdatePsw(requireform).then((res) => {
                            this.clearFormData();
                            this.dialogVisible = false;
                            this.$router.push("/login");
                            return this.$message.success("修改成功");
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 关闭dialog弹窗
            clearFormData() {
                this.form.oldPsw = '';
                this.form.newPsw1 = '';
                this.form.newPsw2 = '';
                this.$refs['form'].clearValidate();
            },
        },
    }
</script>

<style scoped>
    /deep/ .el-dialog__header{
        padding: 10px!important;
    }
</style>
