import request from '@/utils/request'
import API_TYPE from '../api/index'

export function requestMap(apiKey, data) {

    // console.log(data)
    let res;
    //如果是表单 formdata
    if (API_TYPE[apiKey]['hasData'] && (API_TYPE[apiKey]['method'] == 'post') || API_TYPE[apiKey]['method'] == 'put') {
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

    if (API_TYPE[apiKey]['method'] == 'put' || API_TYPE[apiKey]['method'] == 'delete') {
        if (data && data['resource_id']) {
            res.url += ('/' + data['resource_id'])
        }
    }


    //    console.log(res)
    return request(res)
}