<template>
    <div id="myTop">
        <div class="myTabs">
            <myTabs/>
        </div>
<!--        选择环境下拉框-->
        <div class="top-env">
            <el-select v-model="currentEnv" placeholder="请选择环境" @change="envChange(currentEnv)">
                <el-option
                        v-for="item in envList"
                        :key="item.envInfo.id"
                        :label="item.envInfo.envName"
                        :value="item.envInfo.id"
                >
                    <div style="border-radius: 10px" v-if="item.envInfo.id==='tester'" @click="dialogVisible=true">
                       <el-button type="text" > 添加环境</el-button>
                    </div>
                </el-option>
            </el-select>
        </div>
<!--        右侧用户信息-->
        <div class="top-user">
            <el-dropdown>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    {{userName}}
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item  @click="loginOut()" divided>退出</el-dropdown-item>
                            <span @click.stop="toggleDark()">暗黑模式</span>
                            <el-switch size="small" v-model="isDark"/>
                        </el-dropdown-menu>
                    </template>
            </el-dropdown>
        </div>
    </div>
    <el-dialog
            v-model="dialogVisible"
            title="添加环境"
            width="80%"
    >
        <div style="height: 80%;overflow: auto;">
<!--左侧域名列表-->
            <div style="width: 20%;float: left; height:100%; background-color: rgb(238, 241, 246)">
                <div>
                     <div style="float: left;color: #606266;font-size:14px;padding: 10px 10px">环境配置</div>
                     <div style="float: right;background-color: transparent;border:hidden;font-size: 15px"><el-button @click="addEnvInput"  type="text"><el-icon><Plus/></el-icon></el-button></div>
                </div>
                <div v-for="(item,i) of envList">
                    <el-input v-if="item.envInfo.id!=='tester'"  @focus="envDetail(i)"  v-model="item.envInfo.envName" :key="i" style="width: 100%" placeholder="请输入环境名称">
                        <template #suffix>
                                <el-button type="text">
                                    <el-icon @click="copyEnv(item)">
                                        <DocumentCopy/>
                                    </el-icon>
                                </el-button>
                                <el-button type="text" @click="delEnvDialogVisible=true">
                                    <el-icon style="margin: auto">
                                        <Delete/>
                                    </el-icon>
                                </el-button>
                                <!--删除确认弹窗-->
                                <el-dialog
                                        v-model="delEnvDialogVisible"
                                        title="提示"
                                        width="30%"
                                        destroy-on-close
                                        center
                                >
                                <span>
                                    <strong>
                                        确认要删除吗
                                    </strong>
                                </span>
                                    <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="delEnvDialogVisible = false">取消</el-button>
                                        <el-button type="primary" @click="delEnv(i,item)">确认</el-button>
                                    </span>
                                    </template>
                                </el-dialog>
                        </template>
                    </el-input>
                </div>
            </div>
<!--右侧域名详情 域名配置+数据库配置-->
            <div ref="envDetail" style="display:none;width: 80%;float: right; height:100%;">
                <div class="env-name" style="margin: 10px 40px">
                    <el-row :gutter="5">
                        <el-col :span="8">
                               <el-input v-if="showDetail" v-model="envList[envIndex].envInfo.envName"/>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" @click="saveEnv(envList[envIndex])">保存</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div style="padding: 0 20px">
                    <el-tabs>
                        <el-tab-pane label="数据库配置">
                            <div class="dbConfig">
                                <div class="dbDetail" style="padding: 20px;border: 1px solid #ebeef5">
                                    <el-form
                                            ref="ruleForm"
                                            :model="dbInfo"
                                            :rules="dbFormRules"
                                            label-width="120px"
                                    >
                                        <el-form-item label="数据库名称" prop="dbName">
                                            <el-input  v-model="dbInfo.dbName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="数据库类型" prop="dbType">
                                            <el-select  v-model="dbInfo.type">
                                                <el-option
                                                    v-for="item in dbTypeOption"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="JDBC_URL" prop="jdbcUrl">
                                            <el-input  v-model="dbInfo.jdbcUrl"></el-input>
                                        </el-form-item>
                                        <el-form-item label="账户名称" prop="dbUserName">
                                            <el-input  v-model="dbInfo.account"></el-input>
                                        </el-form-item>
                                        <el-form-item label="账户密码" prop="dbPwd">
                                            <el-input v-model="dbInfo.pwd"></el-input>
                                        </el-form-item>
                                        <el-form-item   label="备注" prop="dbRemark">
                                            <el-input  v-model="dbInfo.remark"></el-input>
                                        </el-form-item>
                                        <div style="float: right;padding: 20px">
                                            <el-form-item>
                                                <el-button type="primary" @click="dbDebug(dbInfo)">测试</el-button>
                                                <el-button type="primary" @click="addDb('ruleForm')">新增</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-form>
                                </div>
                                <div class="dbList">
                                    <el-table :data="envList[envIndex].dbInfo" style="width: 100%" max-height="300" empty-text="数据为空!" :row-style="tableRowStyle">
                                        <el-table-column prop="dbName" label="数据库名称" width="150" />
                                        <el-table-column prop="type" label="数据库类型" width="120" >
                                            <template #default="scope">
                                                <div v-if="scope.row.type===0">mysql</div>
                                                <div v-if="scope.row.type===1">redis</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="jdbcUrl" label="数据库连接" width="120" >
                                            <template #default="scope">
                                                <el-tooltip placement="top" effect="light">
                                                    <template #content>
                                                        <div class="short_show" >
                                                            {{scope.row.jdbcUrl}}
                                                        </div>
                                                    </template>
                                                    <el-button type="text"  style="width: 100px">{{scope.row.jdbcUrl}}</el-button>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="account" label="账户名称" width="120" />
                                        <el-table-column prop="pwd" label="密码" width="120" />
                                        <el-table-column prop="remark" label="备注" width="120" >
                                            <template #default="scope">
                                                <el-tooltip placement="top" effect="light">
                                                    <template #content>
                                                        <div class="short_show" >
                                                            {{scope.row.dbRemark}}
                                                        </div>
                                                    </template>
                                                    <el-button type="text"  style="width: 100px">{{scope.row.dbRemark  }}</el-button>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="120">
                                            <template #default="scope">
                                                <el-button type="text" @click="dbInfo = scope.row">编辑</el-button>
                                                <el-popconfirm title="确定要删除吗" @confirm="envList[envIndex].dbInfo.splice(scope.$index,1)">
                                                    <template #reference>
                                                        <el-button type="text" >删除</el-button>
                                                    </template>
                                                </el-popconfirm>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">关闭</el-button>
            <el-button type="primary" @click="saveEnv(envList[envIndex])">保存</el-button>
          </span>
        </template>
    </el-dialog>
</template>

<script>
    import { useDark, useToggle } from '@vueuse/core'
    import request from "utils/request";
    import {Delete, DocumentCopy, Plus} from '@element-plus/icons'
    import myTabs from 'views/inc/myTabs'
    import commonUtils from "../../utils/commonUtils";

    export default {
        name: "Header",
        inject:['reload'],
        components:{
            Plus,
            Delete,
            DocumentCopy,myTabs
        },
        data(){
            return{
                showDetail: true,
                //数据库连接类型
                dbTypeOption:[
                    {
                        label:"mysql",
                        value: 0
                    },
                    {
                        label:"redis",
                        value: 1
                    }
                ],
                //删除环境确认弹窗
                delEnvDialogVisible:false,
                //当前环境ID
                currentEnv:null,
                dialogVisible:false,
                //数据库配置 form表单
                // 环境信息
                envIndex : 0,
                // 数据库配置form规则
                dbFormRules: {
                    dbName: [
                        {
                            required: true,
                            message: 'Please input dbName name',
                            trigger: 'blur',
                        },
                    ],
                    type: [
                        {
                            required: true,
                            message: 'Please input dbType',
                            trigger: 'blur',
                        },
                    ],
                    jdbcUrl: [
                        {
                            required: true,
                            message: 'Please input jdbcUrl',
                            trigger: 'blur',
                        },
                    ],
                    account: [
                        {
                            required: true,
                            message: 'Please input dbUserName',
                            trigger: 'blur',
                        },
                    ],
                    pwd: [
                        {
                            required: true,
                            message: 'Please input dbPwd',
                            trigger: 'blur',
                        },
                    ],
                },
                userName:"",
                // 环境信息
                envInfo:{},
                dbInfo:{
                    dbName: "",
                    account: "",
                    pwd: "",
                    type: 0,
                    jdbcUrl: "",
                    remark: ""
                },
                envList:[],
                isDark:useDark()
            }
        },
        created(){
            this.envListInit()
            this.getUserName()
        },
        methods:{
            toggleDark (){
                useToggle(this.isDark)
            },
            //初始化
            envListInit(){
                //加载 环境列表
                request.get("/api/env/envList").then(res=>{
                    this.envList = res.data
                    const emptyEnv ={
                        envInfo:{
                            id : 'tester',
                            envName : '请添加环境'
                        },
                        dbInfo:[]
                    }
                    this.envList.push(emptyEnv)
                })
                this.currentEnv = Number(localStorage.getItem("envId"))
            },
            //添加环境输入框
            addEnvInput(){
                const emptyEnv ={
                    envInfo:{},
                    dbInfo:[]
                }
                this.envList.push(emptyEnv)
            },
            //环境详情
            envDetail(index){
                this.$refs.envDetail.style.setProperty("display" ,"block")
                this.envIndex = index
                this.dbInfo  = {}
            },
            //保存环境信息
            saveEnv(item){
                if(item.envInfo.id === 'tester'){
                    this.envList.splice(i, 1)
                }
                request.post("/api/env/update",item).then(res=>{
                    commonUtils.toast(res)
                    this.envListInit()
                })

            },
            //删除环境信息
            delEnv(i,item){
                if(item.id != null){
                    request.delete("/api/env/del/env/"+item.id).then(res=>{
                        commonUtils.toast(res)
                        this.envListInit();
                    })
                }else {
                    this.showDetail = false
                    this.$refs.envDetail.style.setProperty("display" ,"none")
                    this.delEnvDialogVisible = false
                    this.envList.splice(i,1)
                }
            },
            //修改当前环境信息
            envChange(envId){
                if(envId!=="tester"){
                    localStorage.setItem('envId',envId);
                    const userId = localStorage.getItem('userId')
                    const payload = {
                        id:userId,
                        envId:envId
                    }
                    request.post("/api/env/user/bind",payload).then(res=>{})
                    this.$root.reload()
                }
            },
            tableRowStyle () {
                return {
                    "background-color": "#ecf5ff",
                    "font-size": "14px",
                    "color": "#141415"
                }
            },
            // dbDetail 字段输入规则校验
            addDb(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.envList[this.envIndex].dbInfo.push(this.dbInfo)
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            // 数据库测试运行
            dbDebug(dbDetail){
                request.post("/api/common/ebDebug",dbDetail).then(res=>{
                    if (res.code === "0"){
                        this.$message({
                            type:"success",
                            message:res.msg
                        })
                    }else {
                        this.$message({
                            type:"error",
                            message:res.msg
                        })
                    }
                })
            },
            //复制环境信息
            copyEnv(item){
                let copyEnv = {
                    envName:item.envName,
                    DBDetail:item.DBDetail
                }
                this.envList.push(copyEnv)
            },
            loginOut(){
                this.$router.push('/loginPlus')
            },
            getUserName(){
                const user =  localStorage.getItem("userInfo")
                const userInfo = JSON.parse(user)
                if (userInfo == null){
                    this.userName = "null"
                }else {
                    this.userName = userInfo.nickName
                }
            }
        }
    }
</script>

<style scoped>
    #myTop{
        display: flex;
        height: 100%;
        width: 100%;
        border-bottom: 1px solid #e9e9eb;
    }
    .myTabs{
        width: calc(100vw - 600px);
    }
    .top-env{
        padding: 10px 0 10px 50px;
    }
    .top-user{
        position: absolute;
        right: 20px;
    }
</style>