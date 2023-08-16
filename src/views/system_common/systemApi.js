import request from "../../utils/request";

// 添加项目
function addPrt(prt, callback) {
    request.post("/api/prt/update",prt).then(
        function (res) {
            callback(res)
        }
    )
}
// 添加项目
function prtList(callback,param) {
    request.get("/api/prt/list", {params:param}).then(
        function (res) {
            callback(res)
        }
    )
}
// 删除项目
function delPrt(id,callback) {
    request.delete("/api/prt/delete/"+id).then(
        function (res) {
            callback(res)
        }
    )
}
// 环境列表
function envList(callback) {
    request.get("/api/env/list").then(
        function (res) {
            callback(res)
        }
    )
}
// 保存项目对应域名信息
function updatePrtDomain(domainList,callback) {
    request.post("/api/prt/domain/update",domainList).then(
        function (res) {
            callback(res)
        }
    )
}
// 删除项目对应域名信息
function delPrtDomain(id,callback) {
    request.delete("/api/prt/domain/del/"+ id).then(
        function (res) {
            callback(res)
        }
    )
}

// 手机配置列表
function mobilePhoneList(callback,param) {
    request.get("/api/mobilePhone/list",{params:param}).then(
         (res)=> {
            callback(res)
        }
    )
}

//--------------APP配置
// 列表
function appConfigList(callback,param)  {
    request.get("/api/appConfig/list",{params:param}).then(
         (res)=> {
            callback(res)
        }
    )

}
// 删除
function delAppConfig(callback,id) {
    request.delete("/api/appConfig/del/"+id).then((r) => callback(r))
}
// 添加更新APP配置
function updateAppConfig(callback,data) {
    request.post("/api/appConfig/update",data).then(r=>{
        callback(r)
    })
}

// 钉钉机器人列表
function dingRobotList(callback,param) {
    request.get("/api/dingRobot/list",{params:param}).then(r => callback(r))
}

// 创建修改机器人
function updateRobot(callback,param) {
    request.post("/api/dingRobot/update",param).then(r => callback(r))
}
// 删除机器人
function delRobot(callback,id) {
    request.delete("/api/dingRobot/delete/"+id).then(r => callback(r))
}

export default {
    addPrt,prtList,delPrt,envList,updatePrtDomain,delPrtDomain,mobilePhoneList,appConfigList,delAppConfig,updateAppConfig,dingRobotList,updateRobot,delRobot
}