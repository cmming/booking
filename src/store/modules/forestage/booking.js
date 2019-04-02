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
        queryFormData: { dayMark: '', applyTiems: '', id: "", pageIndex: "", pageSize: "", startTime: "", endTime: "" },
        list: {
            "pageNum": 0,
            "pageSize": 0,
            "totalNumber": 0,
            "data": []
        },
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
        console.log(data)
            // state.booking.queryDate = data.days.length
        state.booking.queryTime = data.times
            //时间的范围
            // state.booking.queryDate = data.times
        state.booking.pickerOptions = {
                disabledDate(time) {
                    return (
                        time.getTime() <= data.days.times - 8.64e7 ||
                        time.getTime() >= data.days.times + (data.days.length - 1) * 24 * 60 * 60 * 1000
                        // time.getTime() <= Date.now() - 8.64e7 ||
                        // time.getTime() >= Date.now() + (state.booking.queryDate - 1) * 24 * 60 * 60 * 1000
                    ); //如果没有后面的-8.64e6就是不可以选择今天的
                }
            }
            // console.log(data)
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
                commit('GET_BOOKING_TIME', response.data.data)
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
                commit('GET_COMPUTER_LIST', response.data.data)
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