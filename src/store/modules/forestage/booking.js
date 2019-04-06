import storage from '@/utils/storage';
import {
    GET_BOOKING_TIME,
    GET_COMPUTER_LIST,
    STORE_COMPUTER_BOOKING
} from '../mutation-types'


import {
    requestMap
} from '@/utils/requestMap'


const state = {
    booking: {
        // 用户信息
        queryDate: 0,
        queryTime: {
            start: '08:00',
            step: '01:00',
            end: '18:30'
        },
        pickerOptions: {},
        // 用户的表单
        queryFormData: { page: "", limit: "", end_time: "", start_time: "", date: '', applyTiems: '', id: "", },
        list: {
            "data": [],
            "meta": { "pagination": { "count": 0, "current_page": 1, "total_pages": 0 ,"per_page":15} },
        },
        //用户选择资源的参数
        storeOrderFormData:{"start_time":'',"end_time":"","date":"","termical_id":""}
    }
}

const getters = {
    booking: (state) => {
        return state.booking
    },
}

const mutations = {
    GET_BOOKING_TIME: (state, data) => {
        // state.user.userInfo = data
        //日期范围
        // console.log(data)
        // state.booking.queryDate = data.days.length
        state.booking.queryTime = {
            start: data.start_time,
            step: data.time,
            end: data.end_time
        }
        //时间的范围
        state.booking.pickerOptions = {
            disabledDate(time) {
                return (
                    time.getTime() <= data.times * 1000 - 8.64e7 ||
                    time.getTime() >= data.times * 1000 + (data.date_length - 1) * 24 * 60 * 60 * 1000
                ); //如果没有后面的-8.64e6就是不可以选择今天的
            }
        }
        console.log(state.booking)
    },
    GET_COMPUTER_LIST: (state, data) => {
        state.booking.list = data
    },
}

const actions = {
    GET_BOOKING_TIME({
        commit
    }) {
        return new Promise((resolve, reject) => {
            requestMap('GET_BOOKING_TIME').then(response => {
                resolve(response.data)
                commit('GET_BOOKING_TIME', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    GET_COMPUTER_LIST({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('GET_COMPUTER_LIST', data).then(response => {
                resolve(response.data)
                commit('GET_COMPUTER_LIST', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    STORE_COMPUTER_BOOKING({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            requestMap('STORE_COMPUTER_BOOKING', data).then(response => {
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