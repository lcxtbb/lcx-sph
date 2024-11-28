//二次封装axios

import axios from "axios";

// nprogress 进度条       start：进度条开始，end：进度条结束
import nProgress from "nprogress";
import 'nprogress/nprogress.css'


const mockRequest = axios.create({
    baseURL: '/mock',   //请求的基础路径
    // 超时事件为7s
    timeout: 7000 
})

//请求拦截器
mockRequest.interceptors.request.use((config) => {
    nProgress.start()
    //config: 配置对象，包含 header 请求头
    return config
})

//响应拦截器
mockRequest.interceptors.response.use(
    (res) => {
        nProgress.done()
        return res.data
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)

export default mockRequest