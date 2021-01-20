<template>
    <div>
        <div class="navbar">
            <div class="navbar-left">
                <img src="@/assets/logo.png" alt="" @click="backhome" class="homeLogo">
                <div style="display: inline-block;margin-left: 40px">
                    <el-menu :default-active="(this.$route.path.indexOf('/stat') != -1) ? '/stat/statStock' : this.$route.path" class="el-menu-demo" router mode="horizontal">
                        <el-menu-item index="/home/index">首页</el-menu-item>
                        <el-menu-item index="/share">专题分享</el-menu-item>
                        <el-menu-item index="/hotSpot">热点跟踪</el-menu-item>
                        <el-menu-item index="/stat/statStock">数据速览</el-menu-item>
                        <el-menu-item index="/train">课程培训</el-menu-item>
                        <el-menu-item index="/unscramble">数据解读</el-menu-item>
                    </el-menu>
                </div>
            </div>
            <div class="navbar-right">
                <el-input class="navsearch" type="text" v-model="search" placeholder="搜索" style="width: auto" @keydown.enter.native="searchEnterFun">
                    <el-button slot="append" icon="el-icon-search" @click="searchEnterFun"></el-button>
                </el-input>
                <span style="margin-left: 10px;cursor: pointer" @click="login" v-if="!userInfo">登录</span>
                <span style="margin-left: 10px;" v-if="!userInfo">|</span>

                <span style="margin-left: 10px;cursor: pointer" @click="register" v-if="!userInfo">注册</span>

                <span style="margin-left: 30px;cursor: pointer" v-else>
                    <span style="cursor: pointer;margin-right: 20px;" @click="goInfoList" v-if="userInfo">

                        <el-badge :is-dot='haveInfo' class="item">
                            <i class="iconfont icon-car-app-five" @click="drawer = true"></i>
                        </el-badge>
                    </span>
                    <img src="@/assets/navbar/avatar.png" alt="" width="24px" class="avatar">
                    <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                        <span style="display: table-cell;max-width: 90px;overflow: hidden;white-space: nowrap;">{{userInfo.realName}}</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userTask">
                            <span style="font-weight: bold;font-size: 14px;color: #303133;">个人中心</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="collection">
                            <i class="iconfont icon-car-app-eight"></i>我的收藏
                        </el-dropdown-item>
                        <el-dropdown-item command="comment">
                            <i class="iconfont icon-car-app-ten"></i>我的评论
                        </el-dropdown-item>
                        <el-dropdown-item command="changePassword">
                            <i class="iconfont icon-car-app-sixteen"></i>修改密码
                        </el-dropdown-item>
                        <el-dropdown-item command="feedback">
                            <i class="iconfont icon-car-app-nineteen"></i>意见反馈
                        </el-dropdown-item>
                        <el-dropdown-item command="logout" style="text-align: center;">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </span>
                <!--                <span>|</span>-->
                <!--                <span>注册</span>-->
            </div>
        </div>
        <div style="position: relative;top:61px;" class="navTopBar"
             v-if="this.$route.path != '/home/index'&&this.$route.path != '/shareDetail'&&this.$route.name != 'CourseDetail' &&this.$route.path != '/hotSpotDetail'
             &&this.$route.path != '/unscrambleDetail'&&this.$route.path != '/searchResult'">
            <img v-if="this.$route.path == '/train'" src="@/assets/navbar/bg.png" alt="" width="100%" height="100%"
                 style="display: block">
            <img v-if="this.$route.path == '/share'" src="@/assets/navbar/share_bg.png" alt="" width="100%"
                 height="100%" style="display: block">
            <img v-if="this.$route.path == '/hotSpot'" src="@/assets/navbar/hotSpot_bg.png" alt="" width="100%"
                 height="100%" style="display: block">
            <img v-if="this.$route.path == '/unscramble'" src="@/assets/navbar/unscramble_bg.png" alt="" width="100%"
                 height="100%" style="display: block">
            <img v-if="this.$route.path.indexOf('/stat') != -1 " src="@/assets/navbar/stat_bg.png" alt="" width="100%"
                 height="100%" style="display: block">
            <img v-if="this.$route.path == '/collection'||this.$route.path == '/comment'"
                 src="@/assets/navbar/person_bg.png" alt="" width="100%" height="100%" style="display: block">
            <div class="bgDiv">
                <div style="width: 60%;margin: 0 auto;display: flex;height: 100%;justify-content: space-between">
                    <div class="textNavbar">
                        <div>{{this.$route.meta.name}}</div>
                        <el-divider></el-divider>
                        <div class="subText">{{this.$route.meta.ename}}</div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog width="900px" v-if="modelShow" :visible.sync="modelShow" center
                   :close-on-press-escape="false" :close-on-click-modal="false">
            <Login v-on:close="close"/>
        </el-dialog>
        <!-- 意见反馈弹窗 -->
        <feedback ref="feedbackDialog"></feedback>
        <!-- 修改密码 -->
        <changePassword ref="changePasswordDialog"></changePassword>
        <!-- 消息抽屉 -->
        <el-drawer :visible.sync="drawer" :with-header="false" :before-close="handleClose" ref="drawer">
            <div style="height: 100vh;overflow: auto;" class="infinite-list-wrapper">
                <el-tabs type="border-card" v-model="infoActiveName" @tab-click="handleClickInfoTabs">
                    <el-tab-pane label="未读" name="unreadInfo">
                        <div v-for="item in unreadInfoList" @click="goInfoDetail(item)" style="cursor: pointer;padding: 0px 20px;">
                            <p class="infoTitle">
                                <span class="overflowOne" style="display: inline-block;width: calc(100% - 50px);">{{item.title}}</span>
                                <span style="float: right;color: #F56C6C;font-size: 12px;">未读</span>
                            </p>
                            <p class="infoDetail overflowOne">
                                <span v-if="item.type==0" title="item.content">反馈内容：{{item.content}}</span>
                                <span v-else>反馈内容：{{item.content}}</span>
                            </p>
                            <p class="infoDetail">
                                <span>反馈人：{{item.createdUser}}</span>
                                <span v-if="item.type==0">消息类型：系统消息</span>
                                <span v-if="item.type==1">消息类型：专题分享</span>
                                <span v-if="item.type==2">消息类型：每日资讯</span>
                                <span v-if="item.type==3">消息类型：热点观察</span>
                                <span v-if="item.type==4">消息类型：政策跟踪</span>
                                <span v-if="item.type==5">消息类型：数据解读</span>
                                <span v-if="item.type==6">消息类型：课程培训</span>
                                <span>时间：{{item.createdTime}}</span>
                            </p>
                            <el-divider></el-divider>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="全部" name="allInfo">
                        <div v-for="item in infoList" @click="goInfoDetail(item)" style="cursor: pointer;padding: 0px 20px;">
                            <p class="infoTitle">
                                <span class="overflowOne" style="display: inline-block;width: calc(100% - 50px);">{{item.title}}</span>
                                <span v-if="item.isRead==0" style="float: right;color: #F56C6C;font-size: 12px;">未读</span>
                                <span v-if="item.isRead==1" style="float: right;color: #67C23A;font-size: 12px;">已读</span>
                            </p>
                            <p class="infoDetail overflowOne">
                                <span v-if="item.type==0" title="item.content">反馈内容：{{item.content}}</span>
                                <span v-else>反馈内容：{{item.content}}</span>
                            </p>
                            <p class="infoDetail">
                                <span>反馈人：{{item.createdUser}}</span>
                                <span v-if="item.type==0">消息类型：系统消息</span>
                                <span v-if="item.type==1">消息类型：专题分享</span>
                                <span v-if="item.type==2">消息类型：每日资讯</span>
                                <span v-if="item.type==3">消息类型：热点观察</span>
                                <span v-if="item.type==4">消息类型：政策跟踪</span>
                                <span v-if="item.type==5">消息类型：数据解读</span>
                                <span v-if="item.type==6">消息类型：课程培训</span>
                                <span>时间：{{item.createdTime}}</span>
                            </p>
                            <el-divider></el-divider>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                
                <p v-if="haveMore" style="text-align: center;color:#4991EE;cursor: pointer;margin-bottom: 10px;" @click="goInfoList">{{loadingText}}</p>
                <p v-if="!haveMore" style="text-align: center;margin-bottom: 10px;">{{loadingText}}</p>
            </div>

        </el-drawer>
    </div>
</template>

<script>
    import {resetRouter} from "../router";
    import Login from "@/components/Login";
    import {deepclone} from '../utils/common'
    import { noticepage,notice } from '@/api/person'
    import {getToken, setToken, removeToken} from '../utils/auth'
    import {
        login, register
    } from '@/api/login'
    // 意见反馈
    import feedback from '@/views/person/feedback';
    // 修改密码
    import changePassword from '@/views/person/changePassword';
    //大写字母、数字
    let bigLetterNum = (rule, value, callback) => {
        let reg = /^[A-Z0-9]+$/
        if (!reg.test(value) && value) {
            callback(new Error('请输入数字、大写字母'))
        } else {
            callback()
        }
    }
    //请输入汉字、字母、数字
    let chineseLetterNum = (rule, value, callback) => {
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
        if (!reg.test(value) && value) {
            callback(new Error('请输入汉字、字母、数字'))
        } else {
            callback()
        }
    }
    let letterNum = (rule, value, callback) => {
        let reg = /^[A-Za-z0-9]+$/
        if (!reg.test(value) && value) {
            callback(new Error('请输入字母、数字'))
        } else {
            callback()
        }
    }
    let num = (rule, value, callback) => {
        let reg = /^[0-9]+$/
        if (!reg.test(value) && value) {
            callback(new Error('请输入数字'))
        } else {
            callback()
        }
    }
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
        name: "Navbar",
        components: {Login,feedback,changePassword},
        data() {
            return {
                codeIndex: (this.$route.path.indexOf('/stat') != -1) ? '/stat/statStock' : this.$route.path,
                options: [{
                    value: '1',
                    label: '企业用户'
                }, {
                    value: '2',
                    label: '个人用户'
                }],
                value: '1',
                ishow: false,
                haveInfo: false,
                drawer: false,
                modelShow: false,
                modelRegisterShow: false,
                rules: {
                    enterpriseName: [
                        {required: true, message: '企业名称不能为空', trigger: 'blur'},
                        {validator: chineseLetterNum, trigger: 'blur'}],
                    contactName: [
                        {required: true, message: '联系人不能为空', trigger: 'blur'}],
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {validator: letterNum, trigger: 'blur'}],
                    userpassword: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                    ],
                    contactTel: [
                        {required: true, message: '联系电话不能为空', trigger: 'blur'},
                        {validator: phone, trigger: 'blur'}],
                    contactEmail: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {validator: mail, trigger: 'blur'}],
                    duns: [
                        {required: true, message: 'DUNS码不能为空', trigger: 'blur'},
                        {validator: bigLetterNum, trigger: 'blur'}],
                    businessLicenseNum: [
                        {required: true, message: '营业执照号码不能为空', trigger: 'blur'},
                        {validator: num, trigger: 'blur'}],
                    organCode: [
                        {required: true, message: '组织机构代码不能为空', trigger: 'blur'},
                        {validator: num, trigger: 'blur'}],
                    taxRegistration: [
                        {required: true, message: '税务登记证不能为空', trigger: 'blur'},
                        {validator: num, trigger: 'blur'}],
                    enterpriseRegisteredAddfress: [
                        {required: true, message: '企业注册地址不能为空', trigger: 'blur'},
                    ],
                    mailAddress: [
                        {required: true, message: '通信地址不能为空', trigger: 'blur'},
                    ],
                    businessLicenseCopyName: [
                        {required: true, message: '请上传营业执照复印件', trigger: 'blur'},
                    ],
                    idcardup: [
                        {required: false, message: '请上传身份证正面照片', trigger: 'blur'},
                    ],
                    idcarddown: [
                        {required: false, message: '请上传身份证背面照片', trigger: 'blur'},
                    ],
                },
                form: {
                    userrole: "1",
                    enterpriseName: '',//企业名称
                    contactName: '',
                    username: '',
                    userpassword: '',
                    contactTel: '',
                    contactEmail: '',
                    isCombine: true,
                    duns: '',
                    businessLicenseNum: '',
                    organCode: '',
                    enterpriseRegisteredAddfress: '',
                    mailAddress: '',
                    businessLicense: '',
                    businessLicenseCopyName: '',
                    idcardup: '',//身份证正面
                    idcardupfilePath: '',//身份证正面地址
                    idcarddown: '',//身份证背面
                    idcarddownfilePath: '',//身份证背面地址
                },
                loginform: {
                    password: '',
                    userName: '',
                },
                codeImg: "",
                search: '',
                websock: null,
                infoList:[],
                unreadInfoList:[],
                clickclose:false,
                infoPage:{
                    current:0,
                    size:10,
                },
                loading: false,
                infoCount:0,
                loadingText:'加载中···',
                haveMore:true,
                mywsuri:'',
                infoActiveName:'unreadInfo',
            };
        },
        created() {
            this.mywsuri = process.env.NODE_ENV === 'development' ? 'ws://10.10.10.87:8380' : 'ws://192.168.144.210:8380';
            this.initWebSocket();
        },
        destroyed() {
            this.websock.close() //离开路由之后断开websocket连接
        },
        computed: {
            userInfo() {
                return this.$store.state.user.userInfo
            },
        },
        methods: {
            initWebSocket() { //初始化weosocket
                const wsuri = this.mywsuri + "/auto-appstore/industry-knowledge/message-push/" + JSON.parse(sessionStorage.getItem('userInfo')).id;
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen() { //连接建立之后执行send方法发送数据
                let actions = {"test": "12345"};
                this.websocketsend(JSON.stringify(actions));
            },
            websocketonerror() {//连接建立失败重连
                this.initWebSocket();
            },
            websocketonmessage(e) { //数据接收
                if(e.data!=0){
                    this.haveInfo = true;
                }else{
                    this.haveInfo = false;
                }
                const redata = JSON.parse(e.data);
            },
            websocketsend(Data) {//数据发送
                this.websock.send(Data);
                console.log('send');
            },
            websocketclose(e) {  //关闭
                console.log('断开连接', e);
            },
            backhome() {
                this.$router.push("/home")
            },
            resetLoginTemp() {
                this.loginform = {
                    password: '',
                    userName: '',
                }
            },
            resetForm() {
                this.form = {
                    userrole: "1",
                    enterpriseName: '',//企业名称
                    contactName: '',
                    username: '',
                    userpassword: '',
                    contactTel: '',
                    contactEmail: '',
                    isCombine: true,
                    duns: '',
                    businessLicenseNum: '',
                    organCode: '',
                    enterpriseRegisteredAddfress: '',
                    mailAddress: '',
                    businessLicense: '',
                    businessLicenseCopyName: '',
                    idcardup: '',//身份证正面
                    idcardupfilePath: '',//身份证正面地址
                    idcarddown: '',//身份证背面
                    idcarddownfilePath: '',//身份证背面地址
                }
            },
            uploadPDFSuccess(response) {
                // this.$refs.filePath.value(response.data.savePath)
                if (response.ok) {
                    this.form.businessLicense = response.data.id;
                    this.form.businessLicenseCopyName = response.data.name;
                    this.$forceUpdate();
                    // this.temp.filePath = response.data.savePath;
                    // this.temp.filePath = URL.createObjectURL(file.raw);
                    // this.$forceUpdate();
                    // console.log(this.temp.filePath)
                    // this.$message({
                    //   message: response.data,
                    //   type: 'success'
                    // });
                } else {
                    this.form.businessLicense = ''
                    this.form.businessLicenseCopyName = ''
                    this.$forceUpdate();
                    // this.temp.filePath = ''
                    // this.temp.filePath = 'Files\\' + ''
                    this.$message.error(response.message);
                }
            },
            uploadSuccess(response, file, fileList) {
                // this.$refs.filePath.value(response.data.savePath)
                if (response.ok) {
                    this.form.idcardup = response.data.id;
                    // this.temp.filePath = response.data.savePath;
                    this.form.idcardupfilePath = response.data.url;
                    this.$forceUpdate();
                    // this.$message({
                    //   message: response.data,
                    //   type: 'success'
                    // });
                } else {
                    this.form.idcardup = ''
                    this.$forceUpdate();
                    // this.temp.filePath = 'Files\\' + ''
                    this.$message.error(response.message);
                }
            },
            uploadidcarddownSuccess(response, file, fileList) {
                // this.$refs.filePath.value(response.data.savePath)
                if (response.ok) {
                    this.form.idcarddown = response.data.id;
                    // this.temp.filePath = response.data.savePath;
                    this.form.idcarddownfilePath = response.data.url;
                    this.$forceUpdate();
                    // this.$message({
                    //   message: response.data,
                    //   type: 'success'
                    // });
                } else {
                    this.form.idcarddown = ''
                    this.$forceUpdate();
                    // this.temp.filePath = 'Files\\' + ''
                    this.$message.error(response.message);
                }
            },
            login() {
                this.resetLoginTemp()
                this.modelShow = true;
            },
            handleLogin() {
                this.$refs.loginform.validate(valid => {
                    if (valid) {
                        let loginData = deepclone(this.loginform);
                        this.loading = true;
                        // let newPsd = strEnc(loginData.password, "CATARC", "ADC", loginData.username)

                        // 加密
                        var loginNameChars = loginData.userName.split("");
                        var pwdChars = loginData.password.split("");
                        var pwdLength = pwdChars.length;
                        var saltChars = [];
                        var half = parseInt(pwdLength / 2);
                        for (var i = 0; i < pwdLength; i++) {
                            var saltItemInt = loginNameChars[parseInt(Math.random() * loginNameChars.length)]
                                .charCodeAt(0) + parseInt(Math.random() * 1000);
                            pwdChars[i] = String.fromCharCode(pwdChars[i].charCodeAt(0) ^ saltItemInt);
                            saltChars[i] = String.fromCharCode(saltItemInt);
                        }
                        var pwdStr = pwdChars.join("");
                        var saltStr = saltChars.join("");
                        var resultStr = saltStr.substring(0, half) + pwdStr + saltStr.substring(half);

                        // field.password = resultStr;

                        loginData.password = resultStr;

                        this.$store.dispatch('user/login', loginData).then(() => {
                            this.modelShow = false;

                            this.$message.success("登录成功");
                            this.userInfo = localStorage.getItem("userInfo")

                        }).catch(() => {
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            register() {
                this.resetForm()
                this.modelRegisterShow = true;
            },
            handleRegister() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        let loginData = deepclone(this.form);
                        this.loading = true;
                        //判断注册的用户类型
                        if (loginData.userrole == '1') {
                            //注册企业用户
                            delete (loginData.idcardup)
                            delete (loginData.idcardupfilePath)
                            delete (loginData.idcarddown)
                            delete (loginData.idcarddownfilePath)

                            loginData.isCombine = loginData.isCombine ? 0 : 1
                        } else {
                            //注册个人用户
                            delete (loginData.enterpriseName)
                            delete (loginData.isCombine)
                            delete (loginData.businessLicenseNum)
                            delete (loginData.organCode)
                            delete (loginData.enterpriseRegisteredAddfress)
                            delete (loginData.businessLicense)
                            delete (loginData.duns)
                            delete (loginData.businessLicenseCopyName)
                        }

                        // let newPsd = strEnc(loginData.password, "CATARC", "ADC", loginData.username)

                        // 加密
                        var loginNameChars = loginData.username.split("");
                        var pwdChars = loginData.userpassword.split("");
                        var pwdLength = pwdChars.length;
                        var saltChars = [];
                        var half = parseInt(pwdLength / 2);
                        for (var i = 0; i < pwdLength; i++) {
                            var saltItemInt = loginNameChars[parseInt(Math.random() * loginNameChars.length)]
                                .charCodeAt(0) + parseInt(Math.random() * 1000);
                            pwdChars[i] = String.fromCharCode(pwdChars[i].charCodeAt(0) ^ saltItemInt);
                            saltChars[i] = String.fromCharCode(saltItemInt);
                        }
                        var pwdStr = pwdChars.join("");
                        var saltStr = saltChars.join("");
                        var resultStr = saltStr.substring(0, half) + pwdStr + saltStr.substring(half);

                        // field.password = resultStr;

                        loginData.userpassword = resultStr;

                        register(loginData).then(response => {
                            this.$message({
                                message: '注册成功！',
                                type: 'success',
                                duration: 2000,
                                onClose: () => {
                                    this.modelShow = false;
                                    // localStorage.setItem('userInfo', this.loginform.userName)
                                    // this.userInfo = localStorage.getItem("userInfo")
                                }
                            })
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            handleCommand(data) {
                console.log(data);
                if (data == 'logout') {
                    this.logout();
                } else if (data == 'collection') {
                    // 把激活的名字存在store中
                    this.$router.push({
                        path: "/person/collection",
                        name: "collection",
                        query: {
                            activeItem: data
                        }
                    });
                } else if (data == 'comment') {
                    // 把激活的名字存在store中
                    this.$router.push({
                        path: "/person/collection",
                        name: "collection",
                        query: {
                            activeItem: data
                        }
                    });
                } else if (data == 'changePassword') {
                    this.$refs['changePasswordDialog'].defaultfunc();
                } else if (data == 'feedback') {
                    // 打开意见反馈弹窗
                    this.$refs['feedbackDialog'].defaultfunc();
                }
            },
            handleIsCombine(ishow) {
                this.ishow = ishow
            },
            // 点击消息tabs切换
            handleClickInfoTabs(a){
                this.infoPage.current = 0;
                this.infoPage.size = 10;
                this.unreadInfoList = [];
                this.infoList = [];
                this.goInfoList();
            },
            logout() {
                this.$confirm('是否确认退出当前登录账号？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true,
                    type: 'warning'
                }).then(() => {

                    this.$store.dispatch('user/logout').then(() => {
                        this.$router.push("/login")
                    }).catch(() => {
                    })

                })
            },
            close() {
                this.modelShow = false;
            },
            // 抽屉样式消息列表
            goInfoList(){
                this.loading = true;
                this.infoPage.current += 1;
                let requireform = {
                    current:this.infoPage.current,
                    size:this.infoPage.size,
                    entity:{
                        replyStaffId:JSON.parse(sessionStorage.getItem('userInfo')).id,
                    }
                };
                if(this.infoActiveName=='unreadInfo'){
                    requireform.entity.isRead = '0'
                }
                noticepage(requireform).then(res => {
                    this.loading = false;
                    if(this.infoActiveName=='unreadInfo'){
                        
                        if(res.data.records){
                            res.data.records.forEach(item=>{
                                this.unreadInfoList.push(item);
                            })
                           this.infoCount = res.data.total;
                        };
                        if(this.unreadInfoList.length>=this.infoCount){
                            this.loadingText = '没有更多了';
                            this.haveMore = false;
                        }else{
                            this.loadingText = '点击加载更多';
                        }
                    }else{
                        if(res.data.records){
                            res.data.records.forEach(item=>{
                                this.infoList.push(item);
                            })
                           this.infoCount = res.data.total;
                        };
                        if(this.infoList.length>=this.infoCount){
                            this.loadingText = '没有更多了';
                            this.haveMore = false;
                        }else{
                            this.loadingText = '点击加载更多';
                        }
                    }
                    
                })
            },
            // 跳转消息详情
            goInfoDetail(data){
                let requireform = {
                    id:data.noticeId
                };
                notice(requireform).then(res => {

                })
                // 1专题分享 2 3 4热点跟踪 5数据解读 6课程培训 0系统消息
                if(data.type==1){
                    this.$router.push({ path: "/shareDetail", query: {id: data.id }});
                };
                if(data.type==2||data.type==3||data.type==4){
                    this.$router.push({ path: "/hotSpotDetail", query: {id: data.id }});
                };
                if(data.type==5){
                    this.$router.push({ path: "/unscrambleDetail", query: {id: data.id }});
                };
                if(data.type==6){
                    this.$router.push({name: "CourseDetail", params: {id: data.id}});
                };
                this.initWebSocket();
                this.$refs['drawer'].closeDrawer();
            },
            // 关闭抽屉的时候吧当前页致为0
            handleClose(done) {
                this.infoPage.current = 0;
                this.infoActiveName = 'unreadInfo';
                this.infoList = [];
                this.loadingText = '加载中···';
                this.haveMore = true;
                done();

            },
            searchEnterFun() {
                setTimeout(() => {
                    this.$root.Bus.$emit("getList", this.search);
                }, 500);
                this.$router.push({name: "SearchResult"});
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-menu--horizontal {
        border-bottom: none !important;
    }

    /deep/ .searchLeft .iconfont {
        font-size: 12px;
        margin-left: 5px;
    }

    /deep/ .el-input input {
        background: #fff !important;
    }

    /deep/ .avatar-uploader-icon {
        line-height: 135px;
        text-align: center;
    }

    /deep/ .el-upload {
        width: 100%;
        height: 100%;
    }

    /deep/ .tipsWidth .el-form-item__error {
        width: 21%;
        text-align: right;
    }

    /deep/ .tipsWidth45 .el-form-item__error {
        width: 43%;
        text-align: right;
    }

    /deep/ .tipsWidth35 .el-form-item__error {
        width: 35%;
        text-align: right;
    }

    .imgtip {
        margin-left: calc(50% - 106px);
    }

    .avatar {
        vertical-align: middle;
    }

    .depositInfo {
        width: 80%;
        height: 200px;
        border: 1px solid #ccc;
        margin: 10px auto;
    }

    .registerDialog {
        height: 100%;
        border-radius: 0px;

    }

    /deep/ .registerDialog .el-dialog--center {
        /*height: 100% !important;*/
        margin: 0 auto;
        border-radius: 0px;
        /*margin-top: 0px !important;*/
    }

    /deep/ .registerDialog .el-form-item__content {
        /*width: 45%;*/
        margin-top: 16px;
        display: flex;
    }

    /deep/ .el-input input {
        background: #fff !important;
    }

    /deep/ .el-input__inner:hover {
        border-color: #C0C4CC;
    }

    /deep/ .el-dialog {
        border-radius: 5px;
    }

    /deep/ .el-dialog__header {
        border-bottom: 0px !important;
        padding: 0px !important;
    }
    /deep/ .myselfclass .el-dialog__header{
        padding: 10px!important;
        border-bottom: 1px solid #DBDBDB!important;
    }
    /deep/ .el-dialog--center .el-dialog__body {
        text-align: initial;
        padding: 0;
    }

    /deep/ .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 0;
    }

    p {
        padding-top: 5px;
        line-height: 34px;
        font-size: 16px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(47, 47, 47, 1);
    }

    .login-name {
        height: 62px;
        line-height: 62px;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: #2F2F2F;
        border-bottom: 1px solid #DCDFE6;
    }

    .loginbutton {
        color: #FFF;
        background-color: #0081d1;
        border-color: #0081d1;
    }

    .navbar {
        /*height: 50px;*/
        overflow: hidden;
        position: fixed;
        z-index: 100;
        top: 0;
        right: 0;
        left: 0;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        display: flex;
        justify-content: space-between;
    }

    .navbar-left {
        display: flex;
        align-items: center;
        padding-left: 90px;
    }

    .navbar-right {
        display: flex;
        align-items: center;
        padding-right: 50px;
    }
    .navbar-right span {
        margin-left: 10px;
        color: #418CEE
    }

    /deep/ .el-dropdown-link {
        color: #606266 !important;
    }

    .textNavbar {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .innerBanner {
        /*position: absolute;*/
        /*display: flex;*/
        line-height: 3.5;
        margin: 0 auto;
    }

    .searchBar {
        /*display: flex;*/
        display: inline-block;
        margin-right: 20px;
    }

    .searchBar-toolWrapper {
        display: inline-block;
    }

    /deep/ .el-dialog__header {
        border-bottom: 1px solid #ddd;
    }

    /deep/ .el-menu--horizontal > .el-menu-item.is-active {
        color: #409EFF !important;
    }

    /deep/ .serchInput input {
        border-radius: 0;
    }

    .navTopBar /deep/ .el-divider--horizontal {
        width: 160px;
        height: 2px;
        margin: 15px 0 !important;
    }
    /deep/ .homeLogo{
        height: 34px;
    }
    @media screen and (min-width: 1367px) {
        .bgDiv {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            color: #FFF;
            font-size: 30px;
        }

        .subText {
            font-size: 12px !important;
            /*color: #606266;*/
            /*margin-top: 10px;*/
        }

        .navTopBar {
            height: 184px !important;
        }
        /deep/ .homeLogo{
            height: 34px;
        }
    }

    @media screen and (max-width: 1367px) {
        .bgDiv {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            color: #FFF;
            font-size: 28px;
        }

        .subText {
            font-size: 12px !important;
            /*color: #606266;*/
            /*margin-top: 10px;*/
        }

        .navTopBar {
            height: 132px !important;
        }

        .navbar-right {
            padding-right: 10px!important;
        } 
        .navbar-left {
            padding-left: 10px!important;
        }
        /deep/ .el-menu-item{
            padding:0px 15px;
        }
        /deep/ .homeLogo{
            height: 24px;
        }
    }

    .icon-car-app-nine:before {
        color: red;
    }

    .icon-car-app-eight:before, .icon-car-app-ten:before, .icon-car-app-sixteen:before, .icon-car-app-nineteen:before {
        color: #979797;
    }

    .personCenter {
        font-size: 14px;
        color: #606266;
    }

    .el-dropdown-menu__item:hover .icon-car-app-eight:before,
    .el-dropdown-menu__item:hover .icon-car-app-ten:before,
    .el-dropdown-menu__item:hover .icon-car-app-sixteen:before,
    .el-dropdown-menu__item:hover .icon-car-app-nineteen:before {
        color: #418CEE;
    }

    .infoTitle {
        font-size: 16px;
        color: #000;
        line-height: 25px;
    }

    .infoDetail {
        font-size: 12px;
        color: #606266;
        line-height: 20px;
    }

    .infoDetail span {
        margin-right: 20px;
    }
    /deep/ .el-tabs__nav.is-top{
        width: 100%;
    }
    /deep/ .el-tabs__nav.is-top .el-tabs__item.is-top{
        width: 50%;
        text-align: center;
    }
</style>
