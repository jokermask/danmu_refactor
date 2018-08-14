/**
 * Created by 天俊sama on 2018/6/5.
 */
function data2Param(data) {
    let param = ""
    for (let key in data) {
        param += param==""? key+"="+data[key] : "&"+key+"="+data[key]
    }
    console.log(param)
    return param
}


/**
 * 真正的请求
 * @param url 请求地址
 * @param data 请求参数
 * @param method 请求方式
 */
function commonFetcdh(url, data, method = 'GET') {
    let option = {}
    if (method === 'GET') { // 如果是GET请求，拼接url
        let param = data2Param(data)
        url += '?' + param
        option = {
            method: method,
            credentials: 'include'
        }
    } else {
        option = {
            method: method,
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body:data2Param(data)
        }
    }
    var res = fetch(url, option).then((res) => {
        return res.json()
    })
    return res ;
}

/**
 * GET请求
 * @param url 请求地址
 * @param data 请求参数
 */
export const GET = function(url, data) {
    return commonFetcdh(url, data, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */
export const POST = function (url, data) {
    return commonFetcdh(url, data, 'POST')
}