<template>
    <div style="height: 100%;background-color: #fff">
        <div class="navbar">
            <div class="navbar-left">
                <img src="@/assets/logo.png" alt="" height="34px">
            </div>
        </div>
        <div class="loginDiv">
            <Login />
        </div>
        <div class="footer">
            <div class="footerWrap">
                <div style="height: 1px;background: #303133;margin-bottom: 28px" class="footerWidth"></div>
                <div style="display: flex;justify-content: inherit" class="footerWidth">
                    <div class="footerContact">联系电话：022-6725654</div>
                    <div class="footerContact">邮编：300300</div>
                    <div class="footerContact">联系地址：天津市东丽区先锋东路68号</div>
                </div>
                <div style="margin-top:30px;padding-top: 17px;display: flex;justify-content: center;background: #212227;padding-bottom: 15px;">
                    <div style="height: 1px;width: 150px;background: #303133;margin-right:10px" class="line"></div>
                    <div class="company">版权所有：中汽数据有限公司</div>
                    <div style="height: 1px;width: 150px;background: #303133;margin-left: 10px" class="line"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Login from "@/components/Login";

    export default {
        name: "login",
        components: {Login},
        data() {
            return {

            };
        },
        methods: {

        }
    }
</script>

<style scoped>
    .navbar {
        height: 60px;
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

    .loginDiv{
        width: 900px;
        height: calc(100% - 128px);
        margin: 0 auto;
        display: flex;
        align-items: center;
    }

    .footerWrap {
        width: 100%;
        margin: 0 auto;
        justify-content: space-around;
        align-items: center;
    }
    @media screen and (min-width: 1367px) {
        .footerWidth {
            width: 1200px;
            margin: 0 auto;
        }

        .footerContact {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #C0C4CC;
            line-height: 20px;
        }

        .company {
            height: 17px;
            font-size: 12px !important;
            font-weight: 400;
            color: #8F9399;
            line-height: 17px;
        }

        .line {
            margin-top: 8px;
        }
    }

    @media screen and (max-width: 1367px) {
        .footerWidth {
            width: 854px;
            margin: 0 auto;
        }

        .company {
            height: 13px;
            font-size: 12px !important;
            font-weight: 400;
            color: #8F9399;
            line-height: 13px;
        }

        .line {
            margin-top: 6px;
        }

        .footerContact {
            height: 15px;
            font-size: 12px;
            font-weight: 500;
            color: #C0C4CC;
            line-height: 15px;
        }
    }

    .footer {
        background: #1B1B1B;
        color: #777777;
    }
</style>
