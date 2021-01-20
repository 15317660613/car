import axios from 'axios'
import store from '../store'
import router from '../router'
import {message} from './resetMessage';
import {Loading} from 'element-ui';

let loading //loading动画服务实例
// create an axios instance
const service = axios.create({
    baseURL: '/auto-appstore/industry-knowledge/api', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 3600000 // request timeout
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        loading = Loading.service({
            lock: true,
            text: '载入中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.2)',
            customClass: ''
        })
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    // 请求成功
    res => {
        loading.close()
        if (res.status === 200) {
            if (res.data instanceof Blob) {
                return Promise.resolve(res)
            }
            if (res.data.ok) {
                return Promise.resolve(res.data)
            } else {
                // if (res.config.url === '/api/airport/CarRemote/stop' || res.config.url === '/api/airport/CarRemote/run' || res.config.url === '/api/airport/CarRemote/turn') {
                //
                // } else {
                message.error(res.data.message)
                // }
                return Promise.reject(res.data)
            }
        } else {
            return Promise.reject(res.data)
        }
    },
    // 请求失败
    error => {
        loading.close()
        const {
            response
        } = error
        if (response) {
            if (response.status == 401) {
                store.commit('user/SET_USERINFO', null)
                window.parent.postMessage("", "*");
                message.error('登录失效，请重新登陆')
                router.push({path: "/login"});
            }
            // 请求已发出，但是不在2xx的范围
            return Promise.reject(response)
        } else {
            message.error('请求失败，请检查您的网络状态')
        }
    }
)

export default service
