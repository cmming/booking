import storage from '@/utils/storage';
import {
    GET_ONLINE_TERMICAL,
    GET_USER_BY_CODE,
    SET_TERMICAL_OFF
} from '../mutation-types'


import {
    requestMap
} from '@/utils/requestMap'


const state = {
    dashboard: {
        list: {
            "pageNum": 0,
            "pageSize": 0,
            "totalNumber": 0,
            "data": []
        },
        searchData: { "btime": "", "etime": "", "pageNum": 1, "pageSize": 15, "order_by": "", "order": "" },
        columns: [{
            prop: "pcid",
        }, {
            prop: "pacName",
        }, {
            prop: "state",
        }],
        index: "dashboard",
        listAction: GET_ONLINE_TERMICAL,


        formDialog: false,
        // formState: 'add',
        commonAction: {
            delete: false,
            edit: false,
            add: false,
            detail: false,
            hide: false
        },
        //数据item key
        deleteKey: "id",
        //删除过程中的请求参数的key
        deleteParamsKey: "id",
        // addAction: ADMIN_FILE_LOG_ADD,
        // updateAction: GET_USER_BY_CODE,
        // deleteAction: GET_USER_BY_CODE,
        // formModel: {
        //     AppName: ""
        // },
        // submitForms: [
        //     //应用名称
        //     { prop: "AppName", type: "input" },
        // ],
        // submitFormsRoles: {
        //     AppName: [{ roleKey: 'required', required: true, trigger: "change" }],
        // }
    }
}

const getters = {
    dashboard: (state) => {
        return state.dashboard
    },
}

const mutations = {
    GET_ONLINE_TERMICAL: (state, data) => {
        state.dashboard.list = data
        console.log(state.dashboard.list)
    },
}

const actions = {
    GET_ONLINE_TERMICAL({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('GET_ONLINE_TERMICAL', data).then(response => {
                resolve(response.data)
                commit('GET_ONLINE_TERMICAL', response.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    GET_USER_BY_CODE({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('GET_USER_BY_CODE', data).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    SET_TERMICAL_OFF({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('SET_TERMICAL_OFF', data).then(response => {
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