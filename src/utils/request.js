import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import {
    Message,
    Notification
} from 'element-ui'
import store from '@/store'
import storage from '@/utils/storage';

// import { getRootApi } from "@/utils/function";


// create an axios instance
const service = axios.create({
    timeout: 15000, // request timeout
})


service.interceptors.request.use(config => {
    // store.dispatch('SHOW_LOADING')
    //修复 基本路径修改不生效的bug
    // config.baseURL = '/api/';
    config.baseURL = GLOBAL_CONFIG.INIT_API_UPL();
    //每次 都将请求的 头部 进行取值 取保最新
    // config.data = qs.stringify(config.data);
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
    // store.dispatch('HIDE_LOADING')
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
})

service.interceptors.response.use(
    // response => response ,
    response => {
        var reStatus = response.status,
            notificationType = 'success',
            alertMsg = '';
        switch (reStatus) {
            case 200:
                //如果状态码小于0 就直接输出错误信息
                console.log(response.data.state)
                if (response.data.state && response.data.state == -1) {
                    alertMsg = response.data.message
                    notificationType = 'error'
                }
                break;
            default:
                break;
        }
        if (alertMsg != '') {
            Notification({
                title: '系统提示',
                message: alertMsg,
                duration: 3000,
                type: notificationType
            })
        }
        return response
    },
    error => {
        console.log(error.response.status, error.response.data)
            // store.dispatch('HIDE_LOADING')
        if (error && error.response && error.response.status) {
            var errorStatus = error.response.status,
                errorAlertMsg = '',
                errorAlertTitle = '警告';
            switch (errorStatus) {
                case 401:
                    // 取主动刷新token
                    // errorAlertTitle = '重新登录提示' + errorStatus;
                    // errorAlertMsg = '长时间为操作，自动退出'
                    // var uamConfigData = storage.get('uamConfigData');
                    // uamConfigData.token = "";
                    // storage.set('uamConfigData', uamConfigData);
                    // 退出登陆
                    store.dispatch('LOGOUT')
                    router.push('/login')
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
            window.location.href = '#/login'
                // console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
            return Promise.reject(error)
        }
        return error;
        // return Promise.reject(error)
    })

export default service