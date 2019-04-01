import request from '@/utils/request'
import API_TYPE from '../api/config'

export function requestMap(apiKey, data) {

    // console.log(data)
    let res;
    //如果是表单 formdata
    if (API_TYPE[apiKey]['hasData'] && API_TYPE[apiKey]['method'] == 'post') {
        res = {
            url: API_TYPE[apiKey]['url'],
            method: API_TYPE[apiKey]['method'],
            data: data,
            headers: {
                isAdmin: API_TYPE[apiKey]['isAdmin']
            }
        };
    } else if (API_TYPE[apiKey]['hasData'] && API_TYPE[apiKey]['method'] == 'get') {
        res = {
            url: API_TYPE[apiKey]['url'],
            method: API_TYPE[apiKey]['method'],
            params: data,
            headers: {
                isAdmin: API_TYPE[apiKey]['isAdmin']
            }
        };
    } else {
        res = {
            url: API_TYPE[apiKey]['url'],
            method: API_TYPE[apiKey]['method'],
            headers: {
                isAdmin: API_TYPE[apiKey]['isAdmin']
            }
        };
    }

    // if (API_TYPE[apiKey]['isAdmin']) {
    //     if (storage.get("uamAdminConfigData")['token']) {
    //         res['headers'] = {
    //             authorization: storage.get("uamAdminConfigData")['token']
    //         }
    //     }
    // } else {
    //     if (storage.get("uamConfigData")['token']) {
    //         res['headers'] = {
    //             authorization: storage.get("uamConfigData")['token']
    //         }
    //     }

    // }


    //获取当前url
    // console.log(document.location.hash,document.location.hash.indexOf('/admin/')!==-1)
    if(document.location.hash.indexOf('/admin/')!==-1){
        if (storage.get("uamAdminConfigData")['token']) {
            res['headers'] = {
                authorization: storage.get("uamAdminConfigData")['token']
            }
        }
    }else{
        if (storage.get("uamConfigData")['token']) {
            res['headers'] = {
                authorization: storage.get("uamConfigData")['token']
            }
        }
    }


    if (API_TYPE[apiKey]['formdata'] && API_TYPE[apiKey]['formdata'] == true && API_TYPE[apiKey]['method'] == 'post') {
        res['headers'] = {
            authorization: res['headers']['authorization'],
            'Content-Type': 'multipart/form-data'
        }
    }
    // console.log(res)
    return request(res)
}