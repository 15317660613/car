<!--<template>-->
<!--    <div class="main">-->
<!--        <div class="mainContent">-->
<!--            <div>-->
<!--                <div style="font-size: 48px;">开发者联盟</div>-->
<!--                <div style="width: 100px;height: 3px;background-color: #ffffff;margin: 10px 0"></div>-->
<!--                <div style="line-height: 36px;font-size: 14px">-->
<!--                    <div>依托中汽数据专业的研发团队和技术资源，建设面向开发者的共享开发平台</div>-->
<!--                    <div style="width: 50%">为开发者提供专属开发社区和技术指导，为合作伙伴提供项目合作、开发支持、推广运营的专业服务。-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="divList">-->
<!--                <div>-->
<!--                    <router-link to="" @click.native="judge('share')">-->
<!--                        <img src="@/assets/play1.png" alt="" width="100%">-->
<!--                        开发者商城-->
<!--                    </router-link>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <router-link to='' @click.native="judge('Assignment')">-->
<!--                        <img src="@/assets/Unknown 2备份@2x.png" alt="" width="100%">-->
<!--                        任务平台-->
<!--                    </router-link>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <router-link to='' @click.native="judge('University')">-->
<!--                        <img src="@/assets/编组 2备份@2x.png" alt="" width="100%">-->
<!--                        开放大学-->
<!--                    </router-link>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <router-link to='' @click.native="judge('Tribune')">-->
<!--                        <img src="@/assets/编组 10备份@2x.png" alt="" width="100%">-->
<!--                        交流论坛-->
<!--                    </router-link>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <router-link to='' @click.native="judge('TeamIntroduce')">-->
<!--                        <img src="@/assets/编组 11备份@2x.png" alt="" width="100%">-->
<!--                        团队介绍-->
<!--                    </router-link>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "home",-->
<!--        methods:{-->
<!--            judge(url){-->
<!--                if(!localStorage.getItem('userInfo')){-->
<!--                    this.$message.warning("请先登录！")-->
<!--                    return;-->
<!--                }-->
<!--                this.$router.push({name: url})-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    .main {-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        background: url("../assets/bg.png") no-repeat;-->
<!--        background-size: 100% 100%;-->
<!--        color: #FFFFFF;-->
<!--    }-->

<!--    .mainContent {-->
<!--        position: absolute;-->
<!--        width: 60%;-->
<!--        height: 80%;-->
<!--        left: 20%;-->
<!--        bottom: 0;-->
<!--        display: flex;-->
<!--        flex-direction: column;-->
<!--        justify-content: space-between;-->
<!--        padding-bottom: 50px;-->
<!--    }-->

<!--    .divList {-->
<!--        display: flex;-->
<!--        justify-content: space-between;-->
<!--        align-items: center-->
<!--    }-->

<!--    .divList > div {-->
<!--        width: 18%;-->
<!--        text-align: center;-->
<!--        cursor: pointer;-->
<!--        background: rgba(45, 70, 107, 1);-->
<!--        padding-bottom: 10px;-->
<!--    }-->

<!--    .router-link-active {-->
<!--        text-decoration-line: none !important;-->
<!--        color: #FFFFFF;-->
<!--    }-->

<!--    a {-->
<!--        text-decoration: none !important;-->
<!--        color: #FFFFFF;-->
<!--    }-->
<!--</style>-->
