// import Vue from 'vue'
// import App from './App.vue'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import '@/styles/index.css' // global css
// //视频播放
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
//
// Vue.use(VideoPlayer)
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
//
// import store from './store'
// import './styles/element-variables.scss'
// import Cookies from 'js-cookie'
// import i18n from './lang' // internationalization
// import * as Quill from 'quill';
// let fonts = ['Microsoft-YaHei','SimSun', 'SimHei','KaiTi','Arial'];
// let Font = Quill.import('formats/font');
// Font.whitelist = fonts;
// Quill.register(Font, true);
//
// Vue.use(VueQuillEditor)
//
// import router from './router'
// Vue.config.productionTip = false
//
// Vue.use(Element, {
//   size: Cookies.get('size') || 'medium', // set element-ui default size
//   i18n: (key, value) => i18n.t(key, value)
// })
// new Vue({
//   router,
//   store,
//   i18n,
//   render: h => h(App),
// }).$mount('#app')
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import './assets/iconfont/iconfont.css'
import './assets/icomoon/style.css'
import ('./assets/iconfont/iconfont.js')
import ECharts from 'vue-echarts/components/ECharts.vue'

Vue.component('v-chart', ECharts)
//视频播放
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)
import '@/styles/index.scss' // global css
// 富文本引用
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

import {message} from './utils/resetMessage'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

import common from '@/api/common' //引用文件
Vue.prototype.common= common; //挂载到Vue实例上面

Vue.prototype.$message = message;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  data: {
    Bus: new Vue()
  },
  render: h => h(App)
})

