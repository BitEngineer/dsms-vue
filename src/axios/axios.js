import axios from 'axios'
import qs from 'qs'

// 通用配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:8090/dsms';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 拦截器
// request
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
      config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});
  
// response
axios.interceptors.response.use((res) =>{
    if(res.data.code != '200'){  // 前后端约定
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    //404等问题可以在这里处理
    return Promise.reject(error);
});

export default axios;



