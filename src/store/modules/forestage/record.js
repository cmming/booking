import storage from '@/utils/storage';
import {
    GET_RECORD_LIST,
    UPDATE_RECORD
} from '../mutation-types'


import {
    requestMap
} from '@/utils/requestMap'


const state = {
    record: {
        llist: {
            "data": [],
            "meta": { "pagination": { "count": 0, "current_page": 1, "total_pages": 0 ,"per_page":15} },
        },
        queryFormData: { page: "", limit: "", end_time: "", start_time: "", date: '', applyTiems: '', id: "", },
        columns: [{
            prop: "termical_id",
        },{
            prop:"btime",
        },{
            prop:"etime",
        }],
        filterColumns: [{
            prop: "state",
        }],
        index: "record",
        listAction: GET_RECORD_LIST,


        formDialog: false,
        // formState: 'add',
        commonAction: {
            delete: true,
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
        // updateAction: UPDATE_RECORD,
        deleteAction: UPDATE_RECORD,
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
    record: (state) => {
        return state.record
    },
}

const mutations = {
    GET_RECORD_LIST: (state, data) => {
        console.log(data)
        state.record.list = data
        console.log(state.record.list)
    },
}

const actions = {
    GET_RECORD_LIST({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('GET_RECORD_LIST', data).then(response => {
                resolve(response.data)
                commit('GET_RECORD_LIST', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    UPDATE_RECORD({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('UPDATE_RECORD', data).then(response => {
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