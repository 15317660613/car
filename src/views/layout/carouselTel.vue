<template>
    <el-carousel style="margin-top: 40px" arrow="never" class="carouselBottomHeight">
        <el-carousel-item v-for="(item,index) in carouselPic" :key="index" style="cursor: pointer"
                          >
            <el-image
                    @click="jumpWeb(item.url)"
                    :src="'/auto-appstore/industry-knowledge/file'+ item.path"
                    style="width: 100%;height: 100%"
            >
            </el-image>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    import {
        getBottomPicList,
    } from '@/api/home'

    export default {
        created() {
            this.getBottomPicList();
        },
        computed: {},
        data() {
            return {
                carouselPic: []
            }
        },
        methods: {
            //获取轮播图
            getBottomPicList() {
                var info = {
                    entity: {
                        type: 0,
                        status: 1
                    }
                }
                getBottomPicList(info).then(response => {
                    this.carouselPic = response.data
                })
            },
            jumpWeb(url) {
                if(url){
                    window.open(url)
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    @media screen and (max-width: 1367px) {
        .carouselBottomHeight {
            height: 93px;
        }
    }

    @media screen and (min-width: 1368px) {
        .carouselBottomHeight {
            height: 130px;
        }
    }
</style>
