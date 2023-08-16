import {ElMessage, ElMessageBox} from 'element-plus'

// 数组深拷贝
function deepClone(obj, newObj) {
    newObj = newObj || {};
    for (let key in obj) {
        if (typeof obj[key] == 'object') {
            let isArray = Array.isArray(obj[key]);//判断是否数组
            newObj[key] = (isArray === true ? [] : {})
            deepClone(obj[key], newObj[key]);
        } else {
            newObj[key] = obj[key]
        }
    }
    return newObj;
}

// 全局toast 提示
function toast(res){
    try {
        if (res.code === "0"){
            ElMessage({
                type: 'success',
                message: res.msg,
            })
        }else {
            ElMessage({
                type: 'error',
                message: res.msg,
            })
        }
    }catch (e) {
        ElMessage({
            type: 'error',
            message: "出错啦",
        })
    }
}

function myToast(type="success",msg) {
    ElMessage({
        type: type,
        message: msg,
    })
}

// elTable中单元格表头样式
function tabRowStyle(position="center"){
    return { "color":"#303133",'font-size':'13px',"text-align":position}
}

//确认弹窗
function messageBox(callback,content="确定要进行删除吗?") {
        ElMessageBox.confirm(
            content,
            "提示",
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            // ElMessage({
            //     type: 'success',
            //     message: '操作成功',
            // })
            callback()
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消操作',
            })

        })
}

// 执行Cmd命令
function execCmd(command) {
    const cmd = new ActiveXObject("WScript.Shell");
    cmd.run("cmd.exe /c start"+command)
}

//下载文件
function downloadFile(res,fileName) {
    //注意：如果res是二进制流字符串而不是blob，则需要通过new Blob([res])转化成blob
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(new Blob([res])); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = fileName; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.style.display = 'none'
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
}

// X轴水平拖动div
const dragDiv_x =(myBox,myLeft,myResize,myRight) => {
    const box = document.getElementById(myBox);
    const left = document.getElementById(myLeft);
    const resize = document.getElementById(myResize);
    const right = document.getElementById(myRight);
    // 鼠标按下事件
    resize.onmousedown = function(e) {
        const startX = e.clientX;
        const resizeLeft = resize.offsetLeft;
        // 鼠标拖动事件
        document.onmousemove = function(e) {
            const moveX = e.clientX;
            let moveLen = resizeLeft + (moveX - startX);
            const maxT = box.clientWidth - resize.offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
            moveLen = moveLen < 30 ? 30 : moveLen; //左边区域最小宽度为15px
            moveLen = moveLen > (maxT - 15) ? maxT - 15 : moveLen; //右边区域最小宽度为150px
            left.style.width = moveLen + 'px';
            right.style.left = moveLen + 'px';
            resize.style.left = (moveLen - 5) + 'px';
        };
        // 鼠标松开事件
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false;
    };
}

// 判断一个对象中值有没有为空的
const myObjValueNotNull = (data)=>{
    let flag = true
    if (data === undefined || data === null){
        flag = false
    }else {
        for (let key in data) {
            if (data[key]===null){
                flag = false
            }
        }
    }
    return flag;
}

// 获取本地IPV4
const getLocalIP = new Promise((resolve,reject) => {
    let recode = {};
    let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    // 如果不存在则使用一个iframe绕过
    if (!RTCPeerConnection) {
        // 因为这里用到了iframe，所以在调用这个方法的script上必须有一个iframe标签
        // <iframe id="iframe" sandbox="allow-same-origin" style="display:none;"></iframe>
        let win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
    }

    //创建实例，生成连接
    let pc = new RTCPeerConnection();

    // 匹配字符串中符合ip地址的字段
    function handleCandidate(candidate) {
        let ip_regexp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|([a-f0-9]{1,4}((:[a-f0-9]{1,4}){7}|:+[a-f0-9]{1,4}){6}))/;
        let ip_isMatch = candidate.match(ip_regexp)[1];
        if (!recode[ip_isMatch]) {
            resolve(ip_isMatch)
            recode[ip_isMatch] = true;
        }
    }

    //监听icecandidate事件
    pc.onicecandidate = (ice) => {
        if (ice.candidate) {
            handleCandidate(ice.candidate.candidate);
        }
    };
    //建立一个伪数据的通道
    pc.createDataChannel('');
    pc.createOffer((res) => {
        pc.setLocalDescription(res);
    }, () => {});

    //延迟，让一切都能完成
    setTimeout(() => {
        let lines = pc.localDescription.sdp.split('\n');
        lines.forEach(item => {
            if (item.indexOf('a=candidate:') === 0) {
                handleCandidate(item);
            }
        })
    }, 1000);
})



export  default {toast,tabRowStyle,messageBox,myToast,downloadFile,dragDiv_x,myObjValueNotNull,getLocalIP}