<template>
    <div class="login-container">
        <div class="bg">
            <img src="@/assets/login/bg.png" alt="">
        </div>
        <el-form class="login-form" ref="loginForm" :model="loginForm" size="small" :rules="loginRules">
            <!--            <div class="titleDiv" style="text-align: center">-->
            <!--                <img src="@/assets/login/title.png" alt="" width="80%">-->
            <!--            </div>-->
            <el-divider content-position="center">欢迎登陆</el-divider>
            <el-row>
                <div class="label">用户名</div>
                <el-form-item prop="loginName">
                    <el-input class="search-input" v-model="loginForm.loginName" placeholder="请输入用户名"/>
                </el-form-item>
                <div class="label">密码</div>
                <el-form-item prop="password">
                    <el-input type="password" class="search-input" v-model="loginForm.password" ref="password" placeholder="请输入密码"/>
                </el-form-item>
                <div class="label">验证码</div>
                <el-form-item prop="captcha" style="margin-bottom: 20px;width: 75%;display: inline-block">
                    <el-input class="search-input" maxlength="8" placeholder="请输入验证码" v-model="loginForm.captcha"></el-input>
                </el-form-item>
                <div class="divIdentifyingCode" @click="getIdentifyingCode(true)">
                    <img id="imgIdentifyingCode" style="height:40px; width: 100px; cursor: pointer;" alt="点击更换"
                         title="点击更换"/>
                </div>
            </el-row>
            <el-button style="width: 100%;margin-bottom: 10px;height: 40px;font-size: 16px" type="primary" @click="handleLogin('loginForm')" :loading="loading">
                登 录
            </el-button>
<!--            <div style="text-align: center;font-size: 12px">重置密码</div>-->
        </el-form>
    </div>
</template>

<script>
    import {validUsername} from "@/utils/validate";
    // import strEnc from '@/utils/desUtil'
    import {thiscryptoJS} from "@/utils/CryptoJs";
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    captcha: '',
                    loginName: "",
                    password: "",
                    appUserId: ''
                },
                loginRules: {
                    loginName: [
                        {required: true, trigger: "blur", message: '请输入用户名'}
                    ],
                    password: [
                        {required: true, trigger: "blur", message: '请输入密码'}
                    ],
                    captcha: [{required: true, trigger: "blur", message: '请输入验证码'}]
                },
                loading: false,
                showDialog: false,
                redirect: undefined,
                otherQuery: {}
            };
        },
        computed: {
            userId() {
                return this.$store.state.user.userId
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    const query = route.query;
                    if (query) {
                        this.redirect = query.redirect;
                        this.otherQuery = this.getOtherQuery(query);
                    }
                },
                immediate: true
            }
        },
        created() {
            // window.addEventListener('storage', this.afterQRScan)
        },
        mounted() {
            this.getIdentifyingCode(true);
        },
        destroyed() {
            // window.removeEventListener('storage', this.afterQRScan)
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        let loginData = JSON.parse(JSON.stringify(this.loginForm));
                        loginData.appUserId = this.userId;
                        let newPsd = thiscryptoJS.encryptNoPadding(loginData.password);
                        loginData.password = newPsd;
                        this.$store.dispatch("user/login", loginData).then(async (res) => {
                            // const accessRoutes = await this.$store.dispatch('permission/generateRoutes', res.roleId)
                            // this.$router.addRoutes(accessRoutes)
                            this.loading = false;
                            // this.$emit("close")
                            if (this.$route.path === '/home/index') {
                                location.reload()
                            } else {
                                this.$router.push({
                                    path: this.redirect || "/home",
                                    query: this.otherQuery
                                });
                            }
                        }).catch(() => {
                            this.loading = false;
                            this.getIdentifyingCode(true)
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== "redirect") {
                        acc[cur] = query[cur];
                    }
                    return acc;
                }, {});
            },
            /**
             * 窗口代码
             * @param {Boolean} bRefresh 是否刷新
             */
            getIdentifyingCode: function (bRefresh) {
                let identifyCodeSrc = "/auto-appstore/industry-knowledge//api/sys/staff/captcha";
                if (bRefresh) {
                    identifyCodeSrc = "/auto-appstore/industry-knowledge//api/sys/staff/captcha?" + Math.random();
                }
                let objs;
                objs = document.getElementById("imgIdentifyingCode");
                objs.src = identifyCodeSrc;
            }
        }
    };
</script>

<style lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #283443;
    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 40px;
            /*width: 85%;*/

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                height: 40px;
            }
        }

        .el-form-item {
            border: 1px solid rgba(0, 0, 0, 0.1);
            /*background: rgba(0, 0, 0, 0.1);*/
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;

    .login-container {
        /*min-height: 100%;*/
        width: 100%;
        display: flex;
        overflow: hidden;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

        .bg {
            /*width: 40%;*/
            img {
                width: 400px;
                height: 100%;
            }
        }

        .login-form {
            width: 100%;
            padding: 50px;

            .titleDiv {
                text-align: center;
                margin-bottom: 10px;
            }

            /deep/ .el-divider__text {
                font-weight: bold;
                font-size: 24px;
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            cursor: pointer;
            user-select: none;
        }

        .label {
            margin-bottom: 5px;
            font-size: 14px
        }

        @media screen and (max-width: 1440px) {
            .login-form {
                padding: 0 20px;
            }
        }
    }

    .divIdentifyingCode {
        display: inline-block;
        width: 18%;
        /*position: absolute;*/
        /*top: 0;*/
        /*right: 0;*/
        z-index: 5;
        /*width: 102px; !*设置图片显示的宽*!*/
        height: 40px; /*图片显示的高*/
        background: #e2e2e2;
        margin: 0;
        vertical-align: top;
    }
</style>
