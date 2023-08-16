<template>
    <div>
        <el-tabs model-value="response">
            <el-tab-pane label="请求信息" name="header">
                <debug_apiReqInfo :apiDetail="apiDetail"/>
            </el-tab-pane>
            <el-tab-pane label="响应信息" name="response">
                <debug_response :debugResponse="debugResponse"/>
            </el-tab-pane>
            <el-tab-pane label="验证结果" name="result">
                <debug_verifyResult :debugResponse="debugResponse"/>
            </el-tab-pane>
            <el-tab-pane label="控制台" name="console">
                <debug_console :debugResponse="debugResponse" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import debug_apiReqInfo from "./debug_apiReqInfo";
    import debug_response from "./debug_response";
    import debug_verifyResult from "./debug_verifyResult";
    import debug_console from "./debug_console";
    export default {
        name: "debugApi_response",
        components:{debug_apiReqInfo,debug_response,debug_verifyResult,debug_console},
        props:{
            apiDetail:{
                default:{
                    //是否启用域名
                    "domainSwitch": true,
                    "id": null,
                    //接口名称
                    "name": "",
                    //标签
                    "labels": null,
                    "projectId": null,
                    //分类ID
                    "apiSuiteId": null,
                    //请求方法
                    "method": null,
                    "envId": null,
                    //请求域名信息
                    "domain": "",
                    //请求路径
                    "path": "",
                    // '类型 0公共接口  业务流接口'
                    "type": null,
                    "remark": null,
                    //接口状态
                    "status": null,
                    //前置
                    "beforeExec": [{}],
                    //后置
                    "afterExec": [{}],
                    //请求头
                    "reqHeader": [{}],
                    //请求参数
                    "reqParams": [{}],
                    "reqBodyData": [{}],
                    "reqBodyJson": "",
                    //请求体类型(0:none 1:form-data 2: json)
                    "reqBodyType": 0,
                    //参数提取
                    reqExtract: [{
                        dataSource:"bodyJson",
                        extractExpress:"",
                        realType: null,
                        realValue: "",
                        varName: "",
                    }],
                    //接口断言
                    reqAssert: [{
                        dataSource: "bodyJson",
                        extractType: "string",
                        extractExpress: "",
                        expectRelation: "等于",
                        expectValue: "",
                    }],
                    //请求cookies
                    "reqCookies":[{}],
                    "debugRsp": null,
                    "createBy": "system",
                    "createTime": null,
                    "updateBy": "system",
                    "updateTime": null,
                    "virtualResBody":[{}],
                    "virtualResBodyJson":"",
                    "virtualBodyType":""
                },
            },
            debugResponse:{
                default:{
                    rspBodyJson:"",
                    rspHeaders:"",
                    textBody:"",
                    rspStatusCode:404,
                    rspTime:0,
                    rspBodySize:0,
                    rspAsserts:null,
                    rspExtract:null,
                    log:null
                },

            }
        }
    }
</script>

<style scoped>

</style>