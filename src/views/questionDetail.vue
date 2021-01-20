<template>
    <div class="mainBody">
        <el-breadcrumb separator="/"
                       class="headerTitle" style="height: 50px;line-height: 50px">
            <el-breadcrumb-item :to="{ path: '/tribune' }">交流论坛</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!--<div class="headerTitle">交流论坛</div>-->
        <header class="banner">
            <!--<el-button type="primary" style="position: absolute;right: 20px;top: 20px;" @click="back">返回-->
            <!--</el-button>-->
            <div class="innerBanner">
                <div class="questionTitle">{{questionInfo.introduce}}</div>
                <div class="questionContent" v-html="questionInfo.content"></div>
                <div class="fontsize20" style=";margin-top: 30px;font-weight: 500">我要回答:</div>
                <quill-editor
                        style="margin-top: 10px"
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption">
                </quill-editor>
                <div style="text-align: right;margin-top: 10px">
                    <el-button type="primary" @click="save">提交回答</el-button>
                </div>
                <!--                <el-button type="primary" @click="showAnswer" style="margin-top: 10px">写回答</el-button>-->
            </div>
        </header>
        <section style="background-color: #FFFFFF;margin-bottom: 20px">
            <div class="mainColumn">
                <div class="answerType" v-if="questionInfo.expertsList.length>0">专家答复</div>
                <comment :list="questionInfo.expertsList"></comment>
                <div class="answerType" v-if="questionInfo.visitorList.length>0">其他答复</div>
                <comment :list="questionInfo.visitorList"></comment>
                <div style="text-align: center;color: #ddd"
                     v-if="questionInfo.expertsList.length===0 && questionInfo.visitorList.length===0">暂无答复
                </div>
            </div>
        </section>
        <!--        <el-dialog title="写回答" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%">-->
        <!--            <quill-editor-->
        <!--                    v-model="content"-->
        <!--                    ref="myQuillEditor"-->
        <!--                    :options="editorOption">-->
        <!--            </quill-editor>-->
        <!--            <div style="text-align: right;margin-top: 10px">-->
        <!--                <el-button type="primary" @click="save">提交回答</el-button>-->
        <!--            </div>-->
        <!--        </el-dialog>-->
    </div>
</template>

<script>
    import {titleConfig} from '@/utils/tooltip'
    import {getQuestionDetail, createAnswer} from '@/api/index'
    import comment from './comment'

    export default {
        name: 'Detail',
        components: {
            comment
        },
        data() {
            return {
                questionInfo: {
                    title: '',
                    expertsList: [],
                    visitorList: []
                },
                // dialogVisible: false,
                editorOption: {
                    placeholder: '写回答...',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'direction': 'rtl'}],
                            [{'color': []}, {'background': []}],
                            [{'font': ['Microsoft-YaHei', 'SimSun', 'SimHei', 'KaiTi', 'Arial', 'sans-serif']}],
                            [{'align': []}],
                            ['clean'],
                            ['link', 'image']
                        ]
                    }
                },
                content: '',
            }
        },
        mounted() {
            this.getDetail();
            // window.addEventListener("scroll", this.headerShowStatus)
        },
        methods: {
            getDetail() {
                // getQuestionDetail(this.$route.params.id).then((res) => {
                this.questionInfo = {
                    introduce: '用过最好用的SpringBoot注解有哪些？',
                    content: "<p data-tool=\"mdnice编辑器\" style=\"color: rgb(89, 89, 89);padding-top: 8px;padding-bottom: 8px;line-height: 26px;\">可以毫不夸张地说，这篇文章介绍的 Spring/SpringBoot 常用注解基本已经涵盖你工作中遇到的大部分常用的场景。对于每一个注解我都说了具体用法，掌握搞懂，使用 SpringBoot 来开发项目基本没啥大问题了！</p><p data-tool=\"mdnice编辑器\" style=\"color: rgb(89, 89, 89);padding-top: 8px;padding-bottom: 8px;line-height: 26px;text-align: center;\"><img data-ratio=\"1\" data-src=\"https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tw6LYJVSGJ4sbu4oCWSw3JkNX5lic8qmyIfqrq34sUVqblmdkCePcHPX79n0g9Q5cESuV470Ksp19w/640?wx_fmt=gif\" data-type=\"gif\" data-w=\"440\" style=\"width: 269px !important; height: auto !important; visibility: visible !important;\" _width=\"269px\" class=\"\" src=\"" + require('../assets/ques.jpg') + "\" crossorigin=\"anonymous\" data-fail=\"0\"></p><p data-tool=\"mdnice编辑器\" style=\"color: rgb(89, 89, 89);padding-top: 8px;padding-bottom: 8px;line-height: 26px;\"><strong style=\"color: rgb(71, 193, 168);\">为什么要写这篇文章？</strong></p><p data-tool=\"mdnice编辑器\" style=\"color: rgb(89, 89, 89);padding-top: 8px;padding-bottom: 8px;line-height: 26px;\">最近看到网上有一篇关于 SpringBoot 常用注解的文章被转载的比较多，我看了文章内容之后属实觉得质量有点低，并且有点会误导没有太多实际使用经验的人（这些人又占据了大多数）。所以，自己索性花了大概 两天时间简单总结一下了。</p>",
                    expertsList: [{
                        userName: 'answer1',
                        content: "<h3 data-tool=\"mdnice编辑器\" style=\"color: rgb(89, 89, 89);margin-top: 30px;margin-bottom: 15px;font-weight: bold;font-size: 20px;\"><span style=\"display: none;\"></span><code>@SpringBootApplication</code><span style=\"display: none;\"></span></h3><p data-tool=\"mdnice编辑器\" style=\"color: rgb(89, 89, 89);padding-top: 8px;padding-bottom: 8px;line-height: 26px;\">这里先单独拎出<code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@SpringBootApplication</code> 注解说一下，虽然我们一般不会主动去使用它。</p><pre data-tool=\"mdnice编辑器\" style=\"color: black;margin-top: 10px;margin-bottom: 10px;border-radius: 5px;box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;\"><span style=\"display: block;background: url(&quot;https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tw6LYJVSGJ4sbu4oCWSw3Jk8UVsdxzakzHSGqtvy6RpdgwS9q6R3aDicarO3QqhkPCPqoy4I8fWvnw/640?wx_fmt=png&quot;) 10px 10px / 40px no-repeat rgb(39, 40, 34);height: 30px;width: 100%;margin-bottom: -7px;border-radius: 5px;\"></span><code style=\"overflow-x: auto;padding: 16px;color: #ddd;display: -webkit-box;font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;font-size: 12px;-webkit-overflow-scrolling: touch;padding-top: 15px;background: #272822;border-radius: 5px;\"><span style=\"color: #75715e;line-height: 26px;\">@SpringBootApplication</span><br><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">public</span>&nbsp;<span style=\"line-height: 26px;\"><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">class</span>&nbsp;<span style=\"font-weight: bold;color: white;line-height: 26px;\">SpringSecurityJwtGuideApplication</span>&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"line-height: 26px;\"><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">public</span>&nbsp;<span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">static</span>&nbsp;<span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">void</span>&nbsp;<span style=\"color: #a6e22e;font-weight: bold;line-height: 26px;\">main</span><span style=\"line-height: 26px;\">(java.lang.String[]&nbsp;args)</span>&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SpringApplication.run(SpringSecurityJwtGuideApplication.class,&nbsp;args);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code></pre><p data-tool=\"mdnice编辑器\" style=\"color: rgb(89, 89, 89);padding-top: 8px;padding-bottom: 8px;line-height: 26px;\">我们可以把 <code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@SpringBootApplication</code>看作是 <code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@Configuration</code>、<code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@EnableAutoConfiguration</code>、<code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@ComponentScan</code> 注解的集合。</p><pre data-tool=\"mdnice编辑器\" style=\"color: black;margin-top: 10px;margin-bottom: 10px;border-radius: 5px;box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;\"><span style=\"display: block;background: url(&quot;https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tw6LYJVSGJ4sbu4oCWSw3Jk8UVsdxzakzHSGqtvy6RpdgwS9q6R3aDicarO3QqhkPCPqoy4I8fWvnw/640?wx_fmt=png&quot;) 10px 10px / 40px no-repeat rgb(39, 40, 34);height: 30px;width: 100%;margin-bottom: -7px;border-radius: 5px;\"></span><code style=\"overflow-x: auto;padding: 16px;color: #ddd;display: -webkit-box;font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;font-size: 12px;-webkit-overflow-scrolling: touch;padding-top: 15px;background: #272822;border-radius: 5px;\"><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">package</span>&nbsp;org.springframework.boot.autoconfigure;<br><span style=\"color: #75715e;line-height: 26px;\">@Target</span>(ElementType.TYPE)<br><span style=\"color: #75715e;line-height: 26px;\">@Retention</span>(RetentionPolicy.RUNTIME)<br><span style=\"color: #75715e;line-height: 26px;\">@Documented</span><br><span style=\"color: #75715e;line-height: 26px;\">@Inherited</span><br><span style=\"color: #75715e;line-height: 26px;\">@SpringBootConfiguration</span><br><span style=\"color: #75715e;line-height: 26px;\">@EnableAutoConfiguration</span><br><span style=\"color: #75715e;line-height: 26px;\">@ComponentScan</span>(excludeFilters&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span style=\"color: #75715e;line-height: 26px;\">@Filter</span>(type&nbsp;=&nbsp;FilterType.CUSTOM,&nbsp;classes&nbsp;=&nbsp;TypeExcludeFilter.class),<br>&nbsp;&nbsp;<span style=\"color: #75715e;line-height: 26px;\">@Filter</span>(type&nbsp;=&nbsp;FilterType.CUSTOM,&nbsp;classes&nbsp;=&nbsp;AutoConfigurationExcludeFilter.class)&nbsp;})<br><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">public</span>&nbsp;<span style=\"color: #75715e;line-height: 26px;\">@interface</span>&nbsp;SpringBootApplication&nbsp;{<br>&nbsp;&nbsp;&nbsp;......<br>}<br><br><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">package</span>&nbsp;org.springframework.boot;<br><span style=\"color: #75715e;line-height: 26px;\">@Target</span>(ElementType.TYPE)<br><span style=\"color: #75715e;line-height: 26px;\">@Retention</span>(RetentionPolicy.RUNTIME)<br><span style=\"color: #75715e;line-height: 26px;\">@Documented</span><br><span style=\"color: #75715e;line-height: 26px;\">@Configuration</span><br><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">public</span>&nbsp;<span style=\"color: #75715e;line-height: 26px;\">@interface</span>&nbsp;SpringBootConfiguration&nbsp;{<br><br>}<br></code></pre><ul data-tool=\"mdnice编辑器\" style=\"color: black;margin-top: 8px;margin-bottom: 8px;padding-left: 25px;\" class=\"list-paddingleft-2\"><li><section style=\"margin-top: 5px;margin-bottom: 5px;line-height: 26px;color: rgb(1, 1, 1);\"><code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@EnableAutoConfiguration</code>：启用 SpringBoot 的自动配置机制</section></li><li><section style=\"margin-top: 5px;margin-bottom: 5px;line-height: 26px;color: rgb(1, 1, 1);\"><code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@ComponentScan</code>：扫描被<code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@Component</code> (<code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@Service</code>,<code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@Controller</code>)注解的 bean，注解默认会扫描该类所在的包下所有的类。</section></li><li><section style=\"margin-top: 5px;margin-bottom: 5px;line-height: 26px;color: rgb(1, 1, 1);\"><code style=\"font-size: 14px;overflow-wrap: break-word;padding: 2px 4px;border-radius: 4px;margin-right: 2px;margin-left: 2px;background-color: rgba(27, 31, 35, 0.05);font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace;word-break: break-all;color: rgb(198, 73, 128);\">@Configuration</code>：允许在 Spring 上下文中注册额外的 bean 或导入其他配置类</section></li></ul>",
                        createrTime: '2020-04-29',
                        commentsCount: '2',
                        commentFirstList: [
                            {
                                id: 1,
                                userName: 'quyueming',
                                commentDate: '2020-04-29',
                                commentContent: '写的真好',
                                commentList: [
                                    {
                                        id: '11',
                                        userName: 'zxcvbn',
                                        puserName: 'quyueming',
                                        commentDate: '2020-04-29',
                                        commentContent: '写的真的好'
                                    }
                                ]
                            }
                        ]
                    }, {
                        userName: 'answer2',
                        content: "<h3 data-tool=\"mdnice编辑器\" style=\"color: black;margin-top: 30px;margin-bottom: 15px;font-weight: bold;font-size: 18px;\"><span style=\"display: none;\"></span>2.1. <code>@Autowired</code><span style=\"display: none;\"></span></h3><p data-tool=\"mdnice编辑器\" style=\"color: rgb(89, 89, 89);padding-top: 8px;padding-bottom: 8px;line-height: 26px;\">自动导入对象到类中，被注入进的类同样要被 Spring 容器管理比如：Service 类注入到 Controller 类中。</p><pre data-tool=\"mdnice编辑器\" style=\"color: black;margin-top: 10px;margin-bottom: 10px;border-radius: 5px;box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;\"><span style=\"display: block;background: url(&quot;https://mmbiz.qpic.cn/mmbiz_png/iaIdQfEric9Tw6LYJVSGJ4sbu4oCWSw3Jk8UVsdxzakzHSGqtvy6RpdgwS9q6R3aDicarO3QqhkPCPqoy4I8fWvnw/640?wx_fmt=png&quot;) 10px 10px / 40px no-repeat rgb(39, 40, 34);height: 30px;width: 100%;margin-bottom: -7px;border-radius: 5px;\"></span><code style=\"overflow-x: auto;padding: 16px;color: #ddd;display: -webkit-box;font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;font-size: 12px;-webkit-overflow-scrolling: touch;padding-top: 15px;background: #272822;border-radius: 5px;\"><span style=\"color: #75715e;line-height: 26px;\">@Service</span><br><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">public</span>&nbsp;<span style=\"line-height: 26px;\"><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">class</span>&nbsp;<span style=\"font-weight: bold;color: white;line-height: 26px;\">UserService</span>&nbsp;</span>{<br>&nbsp;&nbsp;......<br>}<br><br><span style=\"color: #75715e;line-height: 26px;\">@RestController</span><br><span style=\"color: #75715e;line-height: 26px;\">@RequestMapping</span>(<span style=\"color: #a6e22e;line-height: 26px;\">\"/users\"</span>)<br><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">public</span>&nbsp;<span style=\"line-height: 26px;\"><span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">class</span>&nbsp;<span style=\"font-weight: bold;color: white;line-height: 26px;\">UserController</span>&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;<span style=\"color: #75715e;line-height: 26px;\">@Autowired</span><br>&nbsp;&nbsp;&nbsp;<span style=\"color: #f92672;font-weight: bold;line-height: 26px;\">private</span>&nbsp;UserService&nbsp;userService;<br>&nbsp;&nbsp;&nbsp;......<br>}<br></code></pre>",
                        createrTime: '2020-04-29',
                        commentsCount: '2',
                        commentFirstList: [
                            {
                                id: 1,
                                userName: 'quyueming',
                                commentDate: '2020-04-29',
                                commentContent: '写的真好',
                                commentList: [
                                    {
                                        id: '11',
                                        userName: 'zxcvbn',
                                        puserName: 'quyueming',
                                        commentDate: '2020-04-29',
                                        commentContent: '写的真的好'
                                    }
                                ]
                            }
                        ]
                    }],
                    visitorList: []

                }
            },
            showAnswer() {
                this.content = '';
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.addQuillTitle()
                })
            },
            addQuillTitle() {
                const oToolBar = document.querySelector(".ql-toolbar"),
                    aButton = oToolBar.querySelectorAll("button"),
                    aSelect = oToolBar.querySelectorAll("select");
                aButton.forEach(function (item) {
                    if (item.className === "ql-script") {
                        item.value === "sub" ? (item.title = "下标") : (item.title = "上标");
                    } else if (item.className === "ql-indent") {
                        item.value === "+1"
                            ? (item.title = "向右缩进")
                            : (item.title = "向左缩进");
                    } else {
                        item.title = titleConfig[item.classList[0]];
                    }
                });
                aSelect.forEach(function (item) {
                    item.parentNode.title = titleConfig[item.classList[0]];
                });
            },
            save() {
                if (this.content === '') {
                    return this.$message.warning("请输入您的答案后提交！");
                }
                createAnswer({
                    articleId: this.$route.params.id,
                    content: this.content
                }).then(() => {
                    this.$message.success("提交成功！")
                    // this.dialogVisible = false;
                    this.content = ''
                    this.getDetail();
                })
            },
            back() {
                window.history.back()
            }
            // headerShowStatus(){
            //     if(document.documentElement.scrollTop >= 100){
            //         this.isFixed = true;
            //     }else if(document.documentElement.scrollTop < 100){
            //         this.isFixed = false;
            //     }
            //     console.log(document.documentElement.scrollTop)
            // }
        }
    }
</script>

<style scoped>
    .fontsize20 {
        font-size: 20px
    }

    .questionTitle {
        padding-top: 12px;
        margin-bottom: 4px;
        font-size: 22px;
        font-weight: 600;
        font-synthesis: style;
        line-height: 32px;
        color: #1a1a1a;
    }

    .answerType {
        font-size: 20px;
        color: #175199;
        font-weight: 600;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }

    .banner {
        position: relative;
        background-color: #FFFFFF;
    }

    .innerBanner {
        /*padding-top: 20px;*/
        width: 100%;
        display: block;
        height: auto;
        padding-bottom: 10px;
    }

    /deep/ .ql-editor {
        height: 360px;
    }

    .questionContent {
        box-shadow: 0 0 10px rgba(26, 26, 26, .1);
        padding: 10px;
        overflow: auto;
    }

    .headerTitle {
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        font-weight: bold;
        border-bottom: 1px solid #eaeaea;
    }

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

    @media screen and (max-width: 1366px) {
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

        .headerTitle {
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            font-weight: bold;
            border-bottom: 1px solid #eaeaea;
        }

        .questionTitle {
            padding-top: 12px;
            margin-bottom: 4px;
            font-size: 14px;
            font-weight: 600;
            font-synthesis: style;
            line-height: 32px;
            color: #1a1a1a;
        }

        .answerType {
            font-size: 14px;
            color: #175199;
            font-weight: 600;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }

        .fontsize20 {
            font-size: 14px
        }
    }
</style>
