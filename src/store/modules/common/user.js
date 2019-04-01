import storage from '@/utils/storage';
import {
    USER_lOGIN,
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
        submitFormsRoles: {

        }
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
}


export default {
    state,
    getters,
    mutations,
    actions
}