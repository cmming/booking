import storage from '@/utils/storage';
import {
    GET_USERS_LIST,
    USERS_STORE,
    USERS_UPDATE,
    USERS_DELETE
} from '../mutation-types'


import {
    requestMap
} from '@/utils/requestMap'


const state = {
    users: {
        list: {
            "pageNum": 0,
            "pageSize": 0,
            "totalNumber": 0,
            "data": []
        },
        searchData: { "btime": "", "etime": "", "pageNum": 1, "pageSize": 15, "order_by": "", "order": "","userName":"","idNumber":"","phone":"" },
        columns: [{
            prop: "loginName",
        },{
            prop:"userName",
        },{
            prop:"idNumber",
        },{
            prop:"phone",
        }],
        filterColumns: [{
            prop: "state",
        },{
            prop: "jurisdiction",
        }],
        index: "users",
        listAction: GET_USERS_LIST,


        formDialog: false,
        formState: 'add',
        commonAction: {
            delete: false,
            edit: true,
            add: false,
            detail: false,
            hide: false
        },
        //数据item key
        deleteKey: "id",
        //删除过程中的请求参数的key
        deleteParamsKey: "id",
        addAction: USERS_STORE,
        updateAction: USERS_UPDATE,
        deleteAction: USERS_UPDATE,
        formModel: {
            idNumber: "",
            userName: "",
            phone: "",
            jurisdiction: 2,
            loginName: "",
        },
        submitForms: [
            //应用名称
            { prop: "loginName", type: "input" },
            { prop: "userName", type: "input" },
            { prop: "idNumber", type: "input",},
            { prop: "phone", type: "input"},
            // { prop: "jurisdiction", type: "input"},
            { prop: "jurisdiction", type: "radio", option: [{ label: "管理员", value: 1 }, { label: "用户", value: 2 }] },
        ],
        submitFormsRoles: {
            loginName: [{ roleKey: 'required', required: true, trigger: "change" }],
            idNumber: [{ roleKey: 'required', required: true,  trigger: "change" }],
            userName: [{ roleKey: 'required', required: true, trigger: "change" }],
            phone: [{ roleKey: 'required', required: true,  trigger: "change" }],
            jurisdiction: [{ roleKey: 'required', required: true, type: "number",  trigger: "change" }],
        }
    }
}

const getters = {
    users: (state) => {
        return state.users
    },
}

const mutations = {
    GET_USERS_LIST: (state, data) => {
        state.users.list = data
    },
}

const actions = {
    GET_USERS_LIST({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('GET_USERS_LIST', data).then(response => {
                resolve(response.data)
                commit('GET_USERS_LIST', response.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    USERS_UPDATE({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('USERS_UPDATE', data).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    USERS_STORE({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('USERS_STORE', data).then(response => {
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