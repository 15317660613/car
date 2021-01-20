import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from './utils/auth' // get token from cookie
import getPageTitle from './utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/home/index', '/', '/share', '/assignment', '/university', '/course', '/course1', '/tribune', '/Detail', '/teamIntroduce', '/assignmentDetail'] // no redirect whitelist
let flag = false;
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    // const hasToken = getToken()
    const appToken = location.href.split("tokenId=")[1];
    if (appToken && !flag) {
        try {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']

            flag = true

            var roles = await store.dispatch('user/getInfo', appToken);
            // generate accessible routes map based on roles
            // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

            // dynamically add accessible routes
            // router.addRoutes(accessRoutes)

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({...to, replace: true})
        } catch (error) {
            if(error.respCode === '6'){
                Message.error(error.message)
            }
            // Message.error(error)
            // remove token and go to login page to re-login
            // await store.dispatch('user/resetToken')
            // Message.error(error || 'Has Error')
            next('/login')
            NProgress.done()
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            next()
            // Message.error('登录失效，请重新登陆')
            // localStorage.removeItem('userInfo')
            // // other pages that do not have permission to access are redirected to the login page.
            // next('/home/index')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
