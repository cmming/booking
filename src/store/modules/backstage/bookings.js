import storage from '@/utils/storage';
import {
    GET_BOOKINGS_LIST,
    CHANGE_BOOKINGS_STATE,
    BOOKING_TERMICAL_ORDER_UPDATE
} from '../mutation-types'


import {
    requestMap
} from '@/utils/requestMap'


const state = {
    bookings: {
        list: {
            "data": [],
            "meta": { "pagination": { "count": 0, "current_page": 1, "total_pages": 0, "per_page": 15 } },
        },
        searchData: { "btime": "", "etime": "", "pageNum": 1, "pageSize": 15, "order_by": "", "order": "", "user_name": "", "idNumber": "", "phone": "" },

        columns: [{
            prop: "termical_id",
        }, {
            prop: "termical_name",
        }, {
            prop: "user_name",
        }, {
            prop: "btime",
        }, {
            prop: "etime",
        }],
        filterColumns: [{
            prop: "state",
        }],
        index: "bookings",
        listAction: GET_BOOKINGS_LIST,


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
        updateKey: "id",
        updateParamsKey: "resource_id",
        // addAction: USERS_STORE,
        updateAction: BOOKING_TERMICAL_ORDER_UPDATE,
        // deleteAction: USERS_UPDATE,
        formModel: {
            // termical_id:"",
            state: "",
            date: "",
            start_time: "",
            end_time: ""

        },
        submitForms: [
            //应用名称
            // { prop: "termical_id", type: "input" },
            { prop: "date", type: "date" },
            { prop: "start_time", type: "time", format: "HH:mm:ss" },
            { prop: "end_time", type: "time", format: "HH:mm:ss" },
            //  1：未使用 2：使用中 3：已经使用 4禁用
            { prop: "state", type: "radio", option: [{ label: "未使用", value: 1 }, { label: "使用中", value: 2 }, { label: "已经使用", value: 3 }, { label: "禁用", value: 4 }] },
        ],
        submitFormsRoles: {
            // termical_id: [{ roleKey: 'required', required: true, trigger: "change" }],
            state: [{ roleKey: 'required', required: true, type: "number", trigger: "change" }],
        }
    }
}

const getters = {
    bookings: (state) => {
        return state.bookings
    },
}

const mutations = {
    GET_BOOKINGS_LIST: (state, data) => {
        state.bookings.list = data

        console.log(state.bookings)
    },
}

const actions = {
    GET_BOOKINGS_LIST({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('GET_BOOKINGS_LIST', data).then(response => {
                resolve(response)
                commit('GET_BOOKINGS_LIST', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    CHANGE_BOOKINGS_STATE({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('CHANGE_BOOKINGS_STATE', data).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    BOOKING_TERMICAL_ORDER_UPDATE({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('BOOKING_TERMICAL_ORDER_UPDATE', data).then(response => {
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