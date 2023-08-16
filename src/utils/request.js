import axios from 'axios'
import { showLoading, hideLoading } from './loading'
import {ElMessageBox,ElMessage} from "element-plus";
import router from "../router";
import platformInfoUtils from "./platformInfoUtils";
import commonUtils from "./commonUtils";

// 配置项
const options = {
    // // 接口最大超时时间
    // timeout: 5000
}
const request = axios.create(options)

// request 请求前拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    // 设置请求头
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // 将token传递给headers
    let token = localStorage.getItem('token');

    if (token) {
        config.headers['token'] = token;
    }

    // 请求拦截进来调用显示loading效果
    setTimeout(() => {
        // showLoading()
    }, 200)
    // 断网提示
    if (!navigator.onLine) {
        ElMessageBox.alert(
            '您的网络故障，请检查!',
            '温馨提示',
            {
                confirmButtonText: '好的',
                type: 'warning'
            }
        )
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response 响应后拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
        // setTimeout(() => {
        //     hideLoading()
        // }, 200)
        // 接口响应值
        let res = response.data;
        // 判断用户是否登录,未登录返回至登录页面
        if(res.code==="201004"||res.code==="2001"|| res.code === "401"){

            localStorage.removeItem('token');
            router.push({
                path: '/loginPlus'
            }).then(r => {})
        }
        // 判断用户是否登录,未登录返回至登录页面
        if(res.code==="403"){
            ElMessage({
                type: 'error',
                message: "用户权限不足",
            })
        }
        // 如果是返回的文件
        if (response.config.responseType==="blob") {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        ElMessage({
            type: 'error',
            message: "系统异常",
        })
        if (error.toString()==="Error: Network Error"){
            router.replace({
                path: '/loginPlus'
            }).then()
        }
        return Promise.reject(error)
    }
)

export default request

