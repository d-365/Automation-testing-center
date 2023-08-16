import request from "../../utils/request";

// ActionList(非树形结构)
function getActionList(payload,callback) {
    request.post("/api/action/actionList", payload).then(
        function (res) {
            callback(res)
        }
    )
}

// ActionList(树形结构)
function actionTree(payload,callback) {
    request.post("/api/action/actionTree", payload).then(
        function (res) {
            callback(res)
        }
    )
}

// 获取用例步骤列表
function getCaseStep(caseId,callback,param) {
    request.get("/api/webCase/steps/"+caseId,{params:param}).then(
        function (res) {
            callback(res)
        }
    )
}

// 用例级联选项
function getElementOption(callback,param) {
    request.post("/api/webPage/webPageElement",param).then(
        function (res) {
            callback(res)
        }
    )
}

// 保存用例步骤列表 payload == List<caseStep>
function upWebCaseStepList(payload,callback) {
    request.post("/api/webPage/caseStep/update",payload).then(
        function (res) {
            callback(res)
        }
    )
}

//删除用例步骤
function delCaseStep(stepId,callback) {
    request.delete("/api/webCase/caseStep/delete/"+stepId).then(
        function (res) {
            callback(res)
        }
    )

}

//调试用例
function debugCase(caseId,payload,callback){
    request.post("/api/webCase/debug/"+caseId,payload).then(
        function (res) {
            callback(res)
        }
    )
}

// 下载seleniumGrid
function downloadGrid(callback) {
    request.post("/api/webCase/seleniumServer","",{responseType:'blob'}).then(
        function (res) {
            callback(res)
        }
    )
}

// 运行Web自动化用例
function runWebCase(planId,callback) {
    request.post("/api/plan/webRun/"+planId).then(
        function (res) {
            callback(res)
        }
    )

}

// 断言方式
function assertType(callback) {
    request.post("/api/webCase/assertType").then(
        function (res) {
            callback(res)
        }
    )
}

// 获取测试计划中前置后置动作
function setupInit(planId,callback) {

    request.post("/api/plan/setup/"+planId).then(
        function (res) {
            callback(res)
        }
    )

}

// 删除前置后置操作
function delSetup(id,callback) {
    request.delete("/api/plan/round/delete/"+id).then(
        function (res) {
            callback(res)
        }
    )


}

// 获取APP配置列表option下拉选项
function appConfigOp(callback) {
    request.get("/api/appConfig/option/list").then(r=>{callback(r)})
}

// 获取手机配置列表Option下拉框
function phoneOpInit(callback) {
    request.get("/api/mobilePhone/option/list").then(r=>{callback(r)})
}

function execAppPlan(planId,callback) {
    request.post("/api/plan/execute/appPlan/"+planId).then(res=>{
        callback(res)
    })

}

export default {
    getActionList,actionTree,getCaseStep,getElementOption,upWebCaseStepList,
    delCaseStep,debugCase,downloadGrid,runWebCase,assertType,setupInit,delSetup,appConfigOp,phoneOpInit,execAppPlan
}