<template>
    <div id="appWeb" :style="{width:width,height: height,minHeight: minheight}">
        <navbar/>
        <div :style="{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',height: height,minHeight: minheight,paddingTop: '60px',boxSizing: 'border-box',
        backgroundColor: '#FFF'}">
            <div :class="{homeClass: true,mainContainer: this.$route.path != '/home/index'}"
                 :style="{minHeight:bodyminheight}">
                <router-view/>
            </div>
            <Footer/>
            <!--v-if="this.$route.path !== '/home/index'"/>-->
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/WebNavbar.vue'
    import Footer from '@/components/Footer.vue'

    export default {
        name: 'App',
        components: {
            Footer,
            Navbar
        },
        computed: {
            width: function () {
                let width = '';
                width = '100%'
                return width;
            },
            height: function () {
                let height = '';
                // if (this.$route.path === '/home/index') {
                //     height = '100%'
                // } else {
                height = 'auto'
                // }
                return height;
            },
            minheight: function () {
                let height = '';
                // if (this.$route.path === '/home/index') {
                //     height = '100%'
                // } else {
                height = 'calc(100% - 186px)'
                // }
                console.log('minheight-------------' + height)
                return height;
            },
            bodyminheight: function () {
                let height = '';
                console.log(this.$route.name)
                let x = document.body.clientHeight - 405
                if(this.$route.name === 'CourseDetail' || this.$route.name === 'SearchResult'){
                    x = document.body.clientHeight - 288
                }
                height = x + 'px'

                return height;
            }
        }
    }
</script>

<style scoped>
    .mainContainer {
        /*width: calc(60% + 100px) !important;*/
        max-width: 1100px!important;
        height: auto !important;
        background-color: #ffffff;
        margin: 0 auto;
        /*padding-left: 50px;*/
        /*padding-right: 50px;*/
        /*min-height: 460px;*/
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .homeClass {
        width: 100%;
        height: 100%;
    }

    @media screen and (max-width: 1366px) {
        .mainContainer {
            width: 1200px !important;
        }
    }
</style>
