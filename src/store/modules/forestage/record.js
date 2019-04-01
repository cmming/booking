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
        list: {
            "pageNum": 0,
            "pageSize": 0,
            "totalNumber": 0,
            "data": []
        },
        searchData: { "btime": "", "etime": "", "pageNum": 1, "pageSize": 15, "order_by": "", "order": "" },
        columns: [{
            prop: "pcName",
        },{
            prop:"applyTimes",
        },{
            prop:"applyCode",
        },{
            prop:"applyDateStr",
        }],
        filterColumns: [{
            prop: "applyStatus",
        },{
            prop: "adminMark",
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
                commit('GET_RECORD_LIST', response.data.data)
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