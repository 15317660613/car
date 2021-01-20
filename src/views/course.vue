<template>
    <div style="">
        <div class="toptitle" style="position: relative">
            <el-breadcrumb separator="/"
                           class="headerTitle" style="position: absolute;height: 50px;line-height: 50px">
                <el-breadcrumb-item :to="{ path: '/university' }">在线课程</el-breadcrumb-item>
                <el-breadcrumb-item>如何确定研发项目的需求和范围</el-breadcrumb-item>
            </el-breadcrumb>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first" style="visibility: hidden">
                </el-tab-pane>
            </el-tabs>
        </div>
        <div style="margin-top: 20px;display:inline-flex;width: 100%">
            <div style="width: 75%;height: 496px;">
                <video-player class="video-player vjs-custom-skin"
                              ref="videoPlayer"
                              :playsinline="true"
                              width="75%"
                              height="496px"
                              :options="playerOptions"
                ></video-player>
            </div>
            <div style="height: 100%;background:rgba(37,39,48,1);height: 496px;width: 25%">
                <div style="display: inline-flex;margin: 24px">
                    <div style="width:4px;height:20px;background:rgba(65,140,238,1);margin-right: 6px"></div>
                    <div style="height:20px;font-size:14px;;font-weight:600;color:rgba(255,255,255,1);line-height:20px;">
                        视频目录
                    </div>
                </div>
                <div style="height:20px;font-size:14px;;font-weight:600;color:rgba(65,140,238,1);line-height:20px;margin-left: 24px;margin-right: 10px">
                    <i class="el-icon-caret-right"></i>如何确定研发项目的需求和范围
                </div>
            </div>
        </div>
        <div style="background:rgba(243,245,248,1);padding-top: 20px;padding-bottom: 25px">
            <div style="height:22px;font-size:16px;;font-weight:600;color:rgba(48,49,51,1);line-height:22px;margin-left: 24px">
                如何确定研发项目的需求和范围
            </div>
            <div style="display: inline-flex;margin-top: 10px">
                <div style="height:30px;font-size:14px;font-family:PingFang-SC-Regular,PingFang-SC;font-weight:400;color:rgba(48,49,51,1);line-height:30px;margin-left: 24px">
                    标签：
                </div>
                <div class="tag">
                    需求定义
                </div>
                <div class="tag">
                    研发项目
                </div>
            </div>
            <div class="course_desc">
                简介：需求定义是我们软件开发项目中“立项管理”需要做的工作。需求定义阶段的产物对于后期需求捕获、需工作求分析以及建模开发等都有直接的影响。如果这个阶段的工作做得不理想，就会出现“上梁不正下梁歪”的结果。本课将简要介绍在产品开发项目中，如果进行需求定义工作。
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "course",
        data() {
            return {
                // 视频播放
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    width: '75%',
                    height: '496px',
                    // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "video/mp4",
                        // src: '//static/assets/研发项目计划的制定和控制.mp4'//url地址
                        // src: require('../assets/研发项目计划的制定和控制.mp4')
                        // src: "" //url地址
                    }],
                    // poster: require('../assets/研发项目计划.png'), //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
            };
        },
    }
</script>

<style scoped>
    /deep/ .vjs-poster {
        display: inline-block;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: 100% 100%;
        background-color: #000000;
        cursor: pointer;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
    }

    /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button {
        transform: scale(0.6) !important;
    }

    /deep/ .el-tabs__header {
        width: 25%;
        margin: 0 auto;
    }

    /deep/ .el-tabs__nav {
        white-space: nowrap;
        position: relative;
        transition: transform .3s;
        float: left;
        z-index: 2;
        visibility: hidden;
    }

    /deep/ .el-tabs__item {
        /*padding: 0 20px;*/
        height: 50px;
        box-sizing: border-box;
        line-height: 50px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        position: relative;
    }

    /deep/ .el-input__inner {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 32px;
        line-height: 32px;
        outline: 0;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
    }

    /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button {
        width: 2em !important;
    }

    /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button {
        background-color: rgba(0, 0, 0, 0.45);
        font-size: 3.5em;
        border-radius: 50%;
        height: 2em !important;
        line-height: 2em !important;
        margin-top: -1em !important;
    }

    .tag {
        padding: 0px 10px;
        margin-left: 10px;
        height: 30px;
        border-radius: 17px;
        opacity: 0.5;
        border: 1px solid rgba(151, 151, 151, 1);
        font-size: 14px;
        font-weight: 400;
        color: rgba(48, 49, 51, 1);
        line-height: 30px;
    }

    .course_desc {
        font-size: 14px;
        font-weight: 500;
        color: rgba(143, 147, 153, 1);
        line-height: 28px;
        margin-left: 24px;
        margin-right: 24px;
    }

    .title {
        height: 50px;
        font-size: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 50px;
        position: absolute;
    }

    /deep/ .el-tabs__nav-wrap::after {
        width: 500%;
        left: -200%;
        content: "";
        position: absolute;
        bottom: 0;
        height: 1px;
        background-color: #eaeaea;
        z-index: 1;
    }

    /deep/ .el-tabs__nav-wrap {
        overflow: visible;
    }

    /deep/ .el-tabs__header {
        width: 20%;
        margin: 0 auto
    }
    @media screen and (min-width: 1367px) {
        /*<!--面包屑-->*/
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
            font-weight: normal;
            color: #000;
            font-weight: 600 !important;
            font-size: 20px;
            cursor: text;
        }

        /deep/ .el-breadcrumb__inner, .el-breadcrumb__inner a {
            font-weight: 400 !important;
            font-size: 14px;
            color: #666;
        }
    }
    @media screen and (max-width: 1367px) {
        /*<!--面包屑-->*/
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
            font-weight: normal;
            color: #000;
            font-weight: 600 !important;
            font-size: 14px;
            cursor: text;
        }

        /deep/ .el-breadcrumb__inner, .el-breadcrumb__inner a {
            font-weight: 400 !important;
            font-size: 12px;
            color: #666;
        }
    }
    /*/deep/ .el-tabs__item {*/
    /*    height: 50px;*/
    /*    line-height: 50px;*/
    /*}*/
</style>
