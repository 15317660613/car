// import {login, logout, getInfo} from '../../api/user'
// import {getToken, setToken, removeToken} from '../../utils/auth'
// import {resetRouter} from '../../router'
// const getDefaultState = () => {
//     return {
//         token: getToken(),
//         name: '',
//         avatar: '',
//         roles: []
//     }
// }
//
// const state = getDefaultState()
//
// const mutations = {
//     RESET_STATE: (state) => {
//         Object.assign(state, getDefaultState())
//     },
//     SET_TOKEN: (state, token) => {
//         state.token = token
//     },
//     SET_NAME: (state, name) => {
//         state.name = name
//     },
//     SET_AVATAR: (state, avatar) => {
//         state.avatar = avatar
//     },
//     SET_ROLES: (state, roles) => {
//         state.roles = roles
//     }
// }
//
// const actions = {
//     // user login
//     login({commit}, userInfo) {
//         const {username, password} = userInfo
//         return new Promise((resolve, reject) => {
//             login(userInfo).then(response => {
//                 const {data} = response
//                 commit('SET_TOKEN', data.id)
//                 setToken(data.id)
//                 //                     setToken(data.id)
// //                     debugger
//                 localStorage.setItem('userInfo', response.data.username)
//                 localStorage.setItem('userInfoDetail', JSON.stringify(response.data))
//                 localStorage.setItem('userInfoId', response.data.id)
//                 localStorage.setItem('userInfoUserrole', response.data.userrole)//用户类型1为企业用户，2为个人用户
//                 localStorage.setItem('userInfoAccountState', response.data.accountState)//账号状态0.未审核1.已审核2.审核未通过
//                 // this.userInfo = localStorage.getItem("userInfo")
//                 resolve()
//             }).catch(error => {
//                 reject(error)
//             })
//         })
//     },
//
//     // get user info
//     getInfo({commit, state}) {
//         return new Promise((resolve, reject) => {
//             getInfo(state.token).then(response => {
//                 const {data} = response
//
//                 if (!data) {
//                     reject('Verification failed, please Login again.')
//                 }
//
//                 const {roles, name, avatar} = data
//                 if (data.userrole == 0) {
//                     //管理员
//                     var x = ['admin']
//                 } else {
//                     //普通用户
//                     var x = ['developer', 'editor']
//                 }
//
//                 // roles must be a non-empty array
//                 if (!x || x.length <= 0) {
//                     reject('getInfo: roles must be a non-null array!')
//                 }
//                 debugger
//                 commit('SET_ROLES', x)
//                 commit('SET_NAME', name)
//                 commit('SET_AVATAR', '')
//                 console.log('22222222222')
//                 resolve(x)
//             }).catch(error => {
//                 reject(error)
//             })
//         })
//     },
//
//     // user logout
//     logout({commit, state}) {
//         return new Promise((resolve, reject) => {
//             logout(state.token).then(() => {
//                 removeToken() // must remove  token  first
//                 resetRouter()
//                 commit('RESET_STATE')
//                 resolve()
//             }).catch(error => {
//                 reject(error)
//             })
//         })
//     },
//
//     // remove token
//     resetToken({commit}) {
//         return new Promise(resolve => {
//             removeToken() // must remove  token  first
//             commit('RESET_STATE')
//             resolve()
//         })
//     }
// }
//
// export default {
//     namespaced: true,
//     state,
//     mutations,
//     actions
// }


import {login, loginIP, logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'
import store from "../index";
//
// const state = {
//     token: getToken(),
//     name: '',
//     avatar: '',
//     introduction: '',
//     roles: [],
//     roleId: '',
//     orgId: ''
// }
const getDefaultState = () => {
    return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || null,
        userId: ''
    }
}

const state = getDefaultState()
const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_USERID: (state, userId) => {
        sessionStorage.setItem(`userId`, userId)
        state.userId = userId
    },
    SET_USERINFO: (state, userInfo) => {
        sessionStorage.setItem(`userInfo`, JSON.stringify(userInfo))
        state.userInfo = userInfo
    }
}

const actions = {
    // user login
    login({commit}, userInfo) {
        return new Promise((resolve, reject) => {
            login(userInfo).then(response => {
                const {data} = response
                commit('SET_USERINFO', data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({commit}, appToken) {
        return new Promise((resolve, reject) => {
            getInfo(appToken).then(response => {
                const {data} = response
                if(response.respCode === '6'){
                    reject(response)
                }
                commit('SET_USERINFO', data)
                commit('SET_USERID', data.appUserId);
                resolve()
            }).catch(error => {
                reject(error.message)
            })
        })
    },

    // user logout
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SET_USERINFO', null)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },

    // dynamically modify permissions
    changeRoles({commit, dispatch}, role) {
        return new Promise(async resolve => {
            const token = role + '-token'

            commit('SET_TOKEN', token)
            setToken(token)

            const {roles} = await dispatch('getInfo')

            resetRouter()

            // generate accessible routes map based on roles
            const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // reset visited views and cached views
            dispatch('tagsView/delAllViews', null, {root: true})

            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
