import storage from '@/utils/storage';
import {
    GET_BOOKINGS_LIST,
    CHANGE_BOOKINGS_STATE,
} from '../mutation-types'


import {
    requestMap
} from '@/utils/requestMap'


const state = {
    bookings: {
        list: {
            "data": [],
            "meta": { "pagination": { "count": 0, "current_page": 1, "total_pages": 0 ,"per_page":15} },
        },
        searchData: { "btime": "", "etime": "", "pageNum": 1, "pageSize": 15, "order_by": "", "order": "", "userName": "", "idNumber": "", "phone": "" },
        
        columns: [{
            prop: "termical_id",
        },{
            prop: "name",
        },{
            prop:"btime",
        },{
            prop:"etime",
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
            edit: false,
            add: false,
            detail: false,
            hide: false
        },
        //数据item key
        deleteKey: "id",
        //删除过程中的请求参数的key
        deleteParamsKey: "id",
        // addAction: USERS_STORE,
        // updateAction: USERS_UPDATE,
        // deleteAction: USERS_UPDATE,
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
            { prop: "idNumber", type: "input", },
            { prop: "phone", type: "input" },
            // { prop: "jurisdiction", type: "input"},
            { prop: "jurisdiction", type: "radio", option: [{ label: "管理员", value: 1 }, { label: "用户", value: 2 }] },
        ],
        submitFormsRoles: {
            loginName: [{ roleKey: 'required', required: true, trigger: "change" }],
            idNumber: [{ roleKey: 'required', required: true, trigger: "change" }],
            userName: [{ roleKey: 'required', required: true, trigger: "change" }],
            phone: [{ roleKey: 'required', required: true, trigger: "change" }],
            jurisdiction: [{ roleKey: 'required', required: true, type: "number", trigger: "change" }],
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
}


export default {
    state,
    getters,
    mutations,
    actions
}