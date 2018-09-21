import axios from 'axios'
// import qs from 'qs'
import {Message} from 'iview'

// 通用配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:9090/dsms/api';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 拦截器
// request
axios.interceptors.request.use((config) => {
    // axios的默认请求格式是json
    // if(config.method  === 'post'){
    //   config.data = qs.stringify(config.data);
    // }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// response
axios.interceptors.response.use((res) => {
    // 成功的响应才会进入这个方法，通常就是：HTTP Status Code 是 200
    if (res.data.code !== '20000') { // 前后端约定
        Message.error(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    Message.error('发生异常，HTTP Status Code is：' + error.response.status);
    return Promise.reject(error);
});

export default axios;
