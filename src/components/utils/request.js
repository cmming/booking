import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import {
    Message,
    Notification
} from 'element-ui'
import store from '@/store'
import storage from '@/utils/storage';

import { getRootApi } from "@/utils/function";

import i18n from '@/lang/index'

// create an axios instance
const service = axios.create({
    baseURL: getRootApi(), // api的base_url
    // baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000, // request timeout
})


service.interceptors.request.use(config => {
    // config.baseURL = '/api/';
    console.log(config,111)
    if (!config.headers['Content-Type'] || config.headers['Content-Type'] && config.headers['Content-Type'] !== 'multipart/form-data') {

        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "delete"
        ) {
            // 序列化
            config.data = qs.stringify(config.data);
        }
    } else {
        config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
}, error => {
    store.dispatch('HIDE_LOADING')
        // Do something with request error
        // console.log(error) // for debug
    Promise.reject(error)
})

service.interceptors.response.use(
    // response => response ,
    response => {
        var reStatus = response.status,
            alertMsg = '';
        switch (reStatus) {
            case 200:
                let notifyKey = response.config.url.replace(response.config.baseURL, '')
                    // console.log(notifyKey)
                break;
            case 201:
                alertMsg = '数据添加成功'
                break;
            case 204:
                // delete 表示删除成功 put 或者 patch 表示 资源更新 成功
                if (response.config.method == 'delete') {
                    alertMsg = '数据删除成功'
                } else if (response.config.method == 'put' || 'patch') {
                    alertMsg = '数据更新成功'
                }
                break;
            default:
                break;
        }
        if (alertMsg != '') {
            Notification.success({
                title: '系统提示',
                message: alertMsg,
                //不关闭弹框
                duration: 3000,
            })
        }
        return response
    },
    error => {
        console.log(error.response.status, error.response.data)
        store.dispatch('HIDE_LOADING')
        if (error && error.response && error.response.status) {
            var errorStatus = error.response.status,
                errorAlertMsg = '',
                errorAlertTitle = '警告';
            switch (errorStatus) {
                case 401:
                    break;
                case 422:
                    errorAlertTitle = '参数错误';
                    errorAlertMsg = error.response.data.message ? error.response.data.message : '未知错误'
                    break;
                case 500:
                    errorAlertMsg = '服务器内部错误'
                    break;
                case 501:
                    errorAlertMsg = '服务未实现'
                    break

                case 502:
                    errorAlertMsg = '网关错误'
                    break

                case 503:
                    errorAlertMsg = '服务不可用'
                    break

                case 504:
                    errorAlertMsg = '网关超时'
                    // 清空 uamAdminConfigData
                    store.dispatch('ADMIN_LOGOUT')
                    // 添加一个异常的页面
                    // window.location.href ='#/admin/login'
                    break

                case 505:
                    errorAlertMsg = 'HTTP版本不受支持'
                    break
                default:
                    errorAlertTitle = '未知错误' + errorStatus;
                    errorAlertMsg = '未知错误'
                    break;
            }

            if (errorAlertMsg != '' && errorAlertTitle != '') {
                Notification.error({
                    title: errorAlertTitle,
                    message: errorAlertMsg,
                    //弹框 提示3秒
                    duration: 3000,
                    // customClass:""
                });
            }
        }
        console.log(error)
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            Notification.error({
                title: "error",
                message: "请求超时",
                //弹框 提示3秒
                duration: 3000,
            });
            window.location.href ='#/login'
            // console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
            return Promise.reject(error)
        }
        return error;
        // return Promise.reject(error)
    })

export default service