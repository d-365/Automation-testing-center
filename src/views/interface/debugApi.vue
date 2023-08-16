<template>
    <div class="runApi">
        <div class="top" style="height: 10%">
            <span>
                <el-input v-model="ApiURI" placeholder="暂无数据" style="width: 80%" disabled size="large">
                    <template #prepend>{{apiDetail.method}}</template>
                </el-input>
                <el-button @click="debugApi()" style="margin-left:10px" type="primary" size="large">发送</el-button>
                <el-button  style="width: 5%;margin-left:15px" @click="saveAPI()" size="large">保存</el-button>
            </span>
        </div>
        <div class="body"  style="padding: 20px 0" >
            <apiInfoViewTabs :apiDetail="apiDetail"/>
        </div>
        <div class="bottom" v-show="showDebugApi" >
            <responseLine :debugResponse="debugResponse"/>
            <debugApi_response :apiDetail="apiDetail" :debugResponse="debugResponse"/>
        </div>
    </div>
</template>

<script>
    import apiInfoViewTabs from "../componets/api/apiInfoViewTabs";
    import afterOperation from "../componets/api/common/afterOperation";
    import {reactive, toRefs} from "@vue/reactivity";
    import request from "../../utils/request";
    import assertOption from "../componets/api/assertOption";
    import assertExpectRelation from "../componets/api/assertExpectRelation";
    import beforeOperation from "../componets/api/common/beforeOperation";
    import responseLine from "../componets/api/responseLine";
    import debugApi_response from "../componets/api/debug/debugApi_response";

    export default {
        name: "debugApi",
        components:{assertOption,assertExpectRelation,beforeOperation,responseLine,debugApi_response,afterOperation,apiInfoViewTabs},
        props:{
            apiId:{
                default:0,
            },
        },
        setup(){
            const state = reactive({
                ApiURI:"",
            })
            // 控制元素是否隐藏
            const displayElement = reactive({
                // 接口断言
                showDebugApi: false,
            })

            return {
                ...toRefs(state),
                ...toRefs(displayElement),
            }
        },
        data(){
            return{
                // 接口详情
                apiDetail:{
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
                    "reqExtract": [{
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
                //debug返回对象
                debugResponse:{
                    rspBodyJson:"",
                    rspHeaders:"",
                    textBody:"",
                    rspStatusCode:404,
                    rspTime:0,
                    rspBodySize:0,
                    rspAsserts:[],
                    rspExtract:null,
                    log:null
                },
            }
        },
        watch:{
            "apiId"(){
                this.currentApi();
            },
        },
        created() {
            this.currentApi()
        },
        methods:{
            //保存接口
            saveAPI(){
                request.post("/api/interface/save",this.apiDetail).then(res=>{
                    if(res.code ==="1"){
                        this.$message({
                            type:"error",
                            message:res.msg
                        })
                    }else {
                        this.$message({
                            type:"success",
                            message:"操作成功"
                        })
                    }
                })

            },
            // 调试接口
            debugApi(){
                this.showDebugApi = true
                request.post("/api/interface/debug",this.apiDetail).then(res=>{
                    // this.debugResponse.resBodyJson= res.data.resBody
                    // this.debugResponse.resHeaders = res.data.resHeaders
                    // this.debugResponse.textBody = res.data.textBody
                    if(res.code === "1"){
                        this.$message({
                            type:"error",
                            message:res.msg
                        })
                    }
                    this.debugResponse = res.data

                })

            },
            // 根据接口ID查询接口详情
            currentApi(){
                request.get("/api/interface/info/"+this.apiId).then(res=>{
                    this.apiDetail =res.data
                    this.ApiURI = res.data.domain + res.data.path
                })
            },

            // 获取子组件的值
            preFix(data){
               this.apiDetail.beforeExec = data
            },
            PostFix(data){
               this.apiDetail.afterExec = data
            },
        },
    }
</script>

<style scoped>

</style>