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
            "data": [],
            "meta": { "pagination": { "count": 0, "current_page": 1, "total_pages": 0 ,"per_page":15} },
        },
        searchData: { "btime": "", "etime": "", "pageNum": 1, "pageSize": 15, "order_by": "", "order": "","userName":"","idNumber":"","phone":"" },
        columns: [{
            prop: "name",
        },{
            prop:"email",
        },{
            prop:"created_at",
        }],
        // filterColumns: [{
        //     prop: "state",
        // }],
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
        deleteParamsKey: "resource_id",
        updateKey: "id",
        updateParamsKey: "resource_id",
        addAction: USERS_STORE,
        updateAction: USERS_UPDATE,
        deleteAction: USERS_UPDATE,
        formModel: {
            name: "",
            email: "",
            password:""
        },
        submitForms: [
            //应用名称
            { prop: "name", type: "input" },
            { prop: "email", type: "input" },
            { prop: "password", type: "input",inputType:"password",notEdit:true },
        ],
        submitFormsRoles: {
            name: [{ roleKey: 'required', required: true, trigger: "change" }],
            email: [{ roleKey: 'required', required: true,  trigger: "change" }],
            password: [{ roleKey: 'required', required: true,  trigger: "change" }],
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
                resolve(response)
                commit('GET_USERS_LIST', response.data)
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