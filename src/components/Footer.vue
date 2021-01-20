<template>
    <div class="footer">
        <div class="footerWrap">
            <div class="linkHeight footerWidth" style="display: flex;justify-content: inherit">
                <router-link to="/home/index">
                    <div class="footerPath" index="">首页</div>
                </router-link>
                <router-link to="/share">
                    <div class="footerPath" index="/share">专题分享</div>
                </router-link>
                <router-link to="/hotSpot">
                    <div class="footerPath" index="/assignment">热点跟踪</div>
                </router-link>
                <router-link to="/stat/statStock">
                    <div class="footerPath" index="/university">数据速览</div>
                </router-link>
                <router-link to="/train">
                    <div class="footerPath" index="/tribune">课程培训</div>
                </router-link>
                <router-link to="/unscramble">
                    <div class="footerPath" index="/tribune">数据解读</div>
                </router-link>
            </div>
            <div style="height: 1px;background: #303133;margin-top: 20px;margin-bottom: 28px" class="footerWidth"></div>
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
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

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

        .footerPath {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #8F9399;
            line-height: 20px;
            cursor: pointer;
        }

        .footerContact {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #C0C4CC;
            line-height: 20px;
        }

        .linkHeight {
            color: rgba(138, 138, 138, 1);
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

        .linkHeight {
            color: rgba(138, 138, 138, 1);
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

        .footerPath {
            height: 15px;
            font-size: 12px;
            font-weight: 500;
            color: #8F9399;
            line-height: 15px;
            cursor: pointer;
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
        padding-top: 20px;
    }

</style>
