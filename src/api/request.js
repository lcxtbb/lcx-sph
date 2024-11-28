//二次封装axios

import axios from "axios";

// nprogress 进度条       start：进度条开始，end：进度条结束
import nProgress from "nprogress";
import 'nprogress/nprogress.css'

import pinia from "../store/store";
import { useDetailStore } from "../store/useDetailStore";
import { useTokenStore } from "../store/useTokenStore";

// 从pinia拿到uuid
// console.log(pinia)
const { uuid_token } = useDetailStore(pinia)
let token

const request = axios.create({
    baseURL: '/api',   //请求的基础路径
    // 超时事件为7s
    timeout: 7000 
})

//请求拦截器
request.interceptors.request.use((config) => {
    if( uuid_token ) {
        config.headers.userTempId = uuid_token 
    } 
    //从pinia拿到token
    token = useTokenStore().token
    if(token) {
        config.headers.token = token
    }
    nProgress.start()
    //config: 配置对象，包含 header 请求头
    return config
})

//响应拦截器
request.interceptors.response.use(
    (res) => {
        nProgress.done()
        return res.data
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)

export default request