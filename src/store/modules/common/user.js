import storage from '@/utils/storage';
import {
    USER_lOGIN,
    LOGOUT,
    USERS_SET_PWD
} from '../mutation-types'


import {
    requestMap
} from '@/utils/requestMap'


const state = {
    user: {
        // 用户信息
        userInfo: storage.get("userInfo") ? storage.get("userInfo") : {},
        // 用户的表单
        form: {
            loginName: "",
            passWord: ""
        },
        // 验证规则
        submitFormsRoles: {},
        userMenuList: storage.get("userMenuList") ? storage.get("userMenuList") : []
    }
}

const getters = {
    user: (state) => {
        return state.user
    },
}

const mutations = {
    USER_lOGIN: (state, data) => {
        storage.set("userInfo", data);
        state.user.userInfo = data
            // 根据用户的类型进行判断
            //权限，1管理员，2用户
        if (data.jurisdiction == 1) {
            state.user.userMenuList = [{ path: '/admin/dashboard', name: '首页' }, { path: '/admin/termical', name: '机器管理' }, { path: '/admin/users', name: '用户管理' }, { path: '/admin/bookings', name: '预约管理' }, ]
                // state.user.userMenuList = [{ path: '/booking', name: '首页' }, { path: '/record', name: '我的预约' }, { path: '/admin/dashboard', name: '首页' }, { path: '/admin/termical', name: '机器管理' }, { path: '/admin/users', name: '用户管理' }, { path: '/admin/bookings', name: '预约管理' }, ]
        } else {
            state.user.userMenuList = [{ path: '/booking', name: '首页' }, { path: '/record', name: '我的预约' }]
        }
        // 将惨淡进行缓存
        storage.set("userMenuList", state.user.userMenuList);
    },
}

const actions = {
    USER_lOGIN({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('USER_lOGIN', data).then(response => {
                resolve(response.data)
                commit('USER_lOGIN', response.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    LOGOUT({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('LOGOUT', data).then(response => {
                resolve(response.data)
                    // 清空菜单
                storage.set("userMenuList", {});
                // 清空用户的信息
                storage.set("userInfo", {});
            }).catch(error => {
                reject(error)
            })
        })
    },
    USERS_SET_PWD({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('USERS_SET_PWD', data).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}