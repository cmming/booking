import storage from '@/utils/storage';
import {
    GET_TERMICAL_LIST,
    SET_TERMICAL_BROKEN,
    TERMICAL_ADD,
    TERMICAL_DELETE,
    TERMICAL_UPDATE
} from '../mutation-types'


import {
    requestMap
} from '@/utils/requestMap'


const state = {
    termical: {
        list: {
            "pageNum": 0,
            "pageSize": 0,
            "totalNumber": 0,
            "data": []
        },
        searchOption: {
            state: { prop: "state", type: "radio", option: [{ label: "全部", value: '' },{ label: "故障", value: -1 }, { label: "正常", value: 1 }, { label: "删除", value: -2 }] },
        },
        searchData: { "btime": "", "etime": "", "pageNum": 1, "pageSize": 15, "order_by": "", "order": "", "state": "" },
        columns: [{
            prop: "id",
        }, {
            prop: "pcName",
        }],
        filterColumns: [{
            prop: "state",
        }],
        index: "termical",
        listAction: GET_TERMICAL_LIST,


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
        addAction: TERMICAL_ADD,
        updateAction: TERMICAL_UPDATE,
        deleteAction: TERMICAL_DELETE,
        formModel: {
            pcName: "",
            state: 1,
        },
        submitForms: [
            //应用名称
            { prop: "pcName", type: "input" },
            // 1正常，-1故障，-2是停用删除
            { prop: "state", type: "radio", option: [{ label: "故障", value: -1 }, { label: "正常", value: 1 }, { label: "删除", value: -2 }] },
        ],
        submitFormsRoles: {
            pcName: [{ roleKey: 'required', required: true, trigger: "change" }],
        }
    }
}

const getters = {
    termical: (state) => {
        return state.termical
    },
}

const mutations = {
    GET_TERMICAL_LIST: (state, data) => {
        state.termical.list = data
    },
}

const actions = {
    GET_TERMICAL_LIST({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('GET_TERMICAL_LIST', data).then(response => {
                resolve(response.data)
                commit('GET_TERMICAL_LIST', response.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    TERMICAL_UPDATE({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('TERMICAL_UPDATE', data).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    TERMICAL_ADD({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('TERMICAL_ADD', data).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    SET_TERMICAL_BROKEN({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('SET_TERMICAL_BROKEN', data).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    TERMICAL_DELETE({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('TERMICAL_DELETE', data).then(response => {
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