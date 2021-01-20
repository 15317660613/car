import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import WebLayout from '@/WebLayout'
import Layout from '@/layout'

let myuserInfo = {
    loginName:'',
    companyName:''
};
if(JSON.parse(sessionStorage.getItem('userInfo'))){
    myuserInfo.loginName = JSON.parse(sessionStorage.getItem('userInfo')).loginName;
    myuserInfo.companyName = JSON.parse(sessionStorage.getItem('userInfo')).companyName;

}

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const employerRoutes = [];
export const technologyRoutes = [];
export const constantRoutes = [

    {
        path: '/home',
        component: WebLayout,
        hidden: true,
        redirect: '/home/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/home/index'),
                name: 'Home',
                meta: {title: '首页', noCache: true, breadcrumb: false}
            }
        ]
    },
    {
        path: '/',
        redirect: '/home',
        hidden: true,
    },
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
        name: 'Login',
        hidden: true,
    },
    {
        path: '/Detail/:id',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/Detail/:id',
                component: () => import('@/views/questionDetail.vue'),
                name: 'Detail',
                meta: {name: '交流论坛', ename: 'Communication BBS'},
            }
        ]
    },
    {
        path: 'share',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/share',
                component: () => import('@/views/share.vue'),
                name: 'share',
                meta: {name: '专题分享', ename: '产品规划、产品设计、市场营销、售后服务、新能源、智能网联'},
            }
        ]
    },
    {
        path: 'hotSpot',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/hotSpot',
                component: () => import('@/views/hotSpot.vue'),
                name: 'hotSpot',
                meta: {name: '热点跟踪', ename: '每日资讯、热点观察、政策跟踪'},
            }
        ]
    },
    {
        path: 'unscramble',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/unscramble',
                component: () => import('@/views/unscramble.vue'),
                name: 'unscramble',
                meta: {name: '数据解读', ename: '行 业 整 体 市 场 分 析 报 告'},
            }
        ]
    },
    {
        path: '/assignment',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/assignment',
                component: () => import('@/views/assignment.vue'),
                name: 'Assignment',
                meta: {name: '任务平台', ename: 'Task platform'},
            }
        ]
    },
    {
        path: '/assignmentDetail/:id',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/assignmentDetail/:id',
                component: () => import('@/views/assignmentDetail.vue'),
                name: 'AssignmentDetail',
                meta: {name: '任务详情', ename: 'Task Detail platform'},
            }
        ]
    },
    {
        path: '/',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/shareDetail',
                component: () => import('@/views/shareDetail.vue'),
                name: 'shareDetail',
                meta: {name: '专题分享详情', ename: 'Details of topic sharing'},
            }
        ]
    },
    {
        path: '/',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/hotSpotDetail',
                component: () => import('@/views/hotSpotDetail.vue'),
                name: 'hotSpotDetail',
                meta: {name: '热点跟踪详情', ename: 'Hotspot tracking details'},
            }
        ]
    },
    {
        path: '/',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/unscrambleDetail',
                component: () => import('@/views/unscrambleDetail.vue'),
                name: 'unscrambleDetail',
                meta: {name: '数据解读详情', ename: 'Data interpretation details'},
            }
        ]
    },
    {
        path: '/assignmentCreate',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/assignmentCreate',
                component: () => import('@/views/assignmentCreate.vue'),
                name: 'AssignmentCreate',
                meta: {name: '发布任务', ename: 'Task create platform'},
            }
        ]
    },
    {
        path: '/assignmentCreateSuccess',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/assignmentCreateSuccess',
                component: () => import('@/views/assignmentCreateSuccess.vue'),
                name: 'createSuccess',
                meta: {name: '任务平台', ename: 'Task create platform'},
            }
        ]
    },
    {
        path: '/train',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/train',
                component: () => import('@/views/train.vue'),
                name: 'Train',
                meta: {name: '课程培训', ename: '大数据、汽车生产制造、前瞻技术'},
            }
        ]
    },
    {
        path: '/train/:id',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/train/:id',
                component: () => import('@/views/courseDetail.vue'),
                name: 'CourseDetail',
                meta: {name: '课程详情'},
            }
        ]
    },
    {
        path: '/stat/statStock',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/stat/statStock',
                component: () => import('@/views/stat/index.vue'),
                name: 'stat',
                meta: {name: '开源项目', ename: 'Developer mall'},
                children: [
                    {
                        path: '/stat/statSale',
                        component: () => import('@/views/stat/statSales/statSalesIndex.vue'),
                        name: 'statSale',
                        meta: {name: '销量', ename: 'Developer mall'},
                    }, {
                        path: '/stat/statYield',
                        component: () => import('@/views/stat/statYield/statYieldIndex.vue'),
                        name: 'statYield',
                        meta: {name: '产量', ename: 'Developer mall'},
                    }, {
                        path: '/stat/statStock',
                        component: () => import('@/views/stat/statStock/statStockIndex.vue'),
                        name: 'statStock',
                        meta: {name: '保有量', ename: 'Developer mall'},
                    }, {
                        path: '/stat/statUsedCar',
                        component: () => import('@/views/stat/statUsedCar/statUsedCarIndex.vue'),
                        name: 'statUsedCar',
                        meta: {name: '二手车', ename: 'Developer mall'},
                    }, {
                        path: '/stat/statNewEnergy',
                        component: () => import('@/views/stat/statNewEnergy/statNewEnergyIndex.vue'),
                        name: 'statNewEnergy',
                        meta: {name: '新能源', ename: 'Developer mall'},
                    }, {
                        path: '/stat/statDisplace',
                        component: () => import('@/views/stat/statDisplace/statDisplaceIndex.vue'),
                        name: 'statDisplace',
                        meta: {name: '置换', ename: 'Developer mall'},
                    }
                ]
            }
        ]
    },
    {
        path: '/course',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/course',
                component: () => import('@/views/course.vue'),
                name: 'Course',
                meta: {name: '开放大学', ename: 'The Open University'},
            }
        ]
    },
    {
        path: '/person',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/collection',
                component: () => import('@/views/person/collection.vue'),
                name: 'collection',
                meta: {name: '个人中心', ename: '用户名：'+ myuserInfo.loginName +' 公司：' + myuserInfo.companyName},
            }
        ]
    },
    {
        path: '/searchResult',
        component: WebLayout,
        hidden: true,
        children: [
            {
                path: '/searchResult',
                component: () => import('@/views/searchResult/index.vue'),
                name: 'SearchResult',
                meta: {name: '搜索结果'},
            }
        ]
    }
];
export const adminRoutes = [

]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
