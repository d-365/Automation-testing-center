/**
 * 全局loading效果：合并多次loading请求，避免重复请求
 * 当调用一次showLoading，则次数+1；当次数为0时，则显示loading
 * 当调用一次hideLoading，则次数-1; 当次数为0时，则结束loading
 */
import { ElLoading } from 'element-plus';

// 定义一个请求次数的变量，用来记录当前页面总共请求的次数
let loadingRequestCount = 0;
// 初始化loading
let loadingInstance;

// 编写一个显示loading的函数 并且记录请求次数 ++
const showLoading = (target) => {
    if (loadingRequestCount === 0) {
        loadingInstance = ElLoading.service({ target });
    }
}

// 编写一个隐藏loading的函数，并且记录请求次数 --
const hideLoading = () => {
    loadingRequestCount = 0
    loadingInstance.close();
}

export {
    showLoading,
    hideLoading
}