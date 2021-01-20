<template>
    <div class="mainBody">
        <section class="mainContainer">
            <div>
                <el-menu :default-active="codeIndex" class="el-menu-demo" router mode="horizontal">
                    <el-menu-item index="/stat/statStock" style="height: 40px;line-height: 40px">
                        保有量
                    </el-menu-item>
                    <el-menu-item index="/stat/statSale" style="height: 40px;line-height: 40px">
                        销量
                    </el-menu-item>
                    <el-menu-item index="/stat/statNewEnergy" style="height: 40px;line-height: 40px">
                        新能源
                    </el-menu-item>
                    <el-menu-item index="/stat/statYield" style="height: 40px;line-height: 40px">
                        产量
                    </el-menu-item>
                    <el-menu-item index="/stat/statDisplace" style="height: 40px;line-height: 40px">
                        置换
                    </el-menu-item>
                    <el-menu-item index="/stat/statUsedCar" style="height: 40px;line-height: 40px">
                        二手车
                    </el-menu-item>

                </el-menu>
            </div>
            <router-view/>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'Question',
        data() {
            return {
                codeIndex: this.$route.path
            }
        },
        props: {
            msg: String
        },
        mounted() {
        },
        methods: {
            jumpToDetail(id) {
                this.$router.push({name: "Detail", params: {id: id}});
            },
        }
    }
</script>
<style scoped>

    /deep/ .el-menu.el-menu--horizontal {
        display: flex;
        justify-content: center;
        background: #f2f6fc;
        border-bottom: 1px solid #418cee;
    }

    @media screen and (min-width: 1367px) {
        .mainContainer {
            width: 1200px;
            background-color: #FFFFFF;
        }
    }

    @media screen and (max-width: 1367px) {
        .mainContainer {
            width: 100%;
            background-color: #FFFFFF;
        }
    }
</style>
