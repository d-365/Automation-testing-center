<template>
    <layout>
        <template v-slot:title>
            <el-col :span="22">
                <div>APP启动配置</div>
            </el-col>
            <el-col :span="2">
                <div><el-button type = "primary" @click="appAddDialog = true">添加APP</el-button></div>
            </el-col>
        </template>
        <template v-slot:fun>
            <div><el-row :gutter="4">
                <el-col :span="6">
                    <div class="fun-item">
                        APP名称: &ensp;<el-input placeholder="请输入APP名称" v-model="appName" style="width: 200px;"/>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="fun-item">
                        <el-button type="primary" @click="queryAppConfig()">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="fun-item">
                        <el-button type="warning" @click="appConfigListInit()">重置</el-button>
                    </div>
                </el-col>
            </el-row></div>
        </template>
        <template v-slot:list>
            <el-table :data="appConfigList" stripe border
                      :cell-style="tableStyle"
                      :header-cell-style="tableStyle"
                      :row-key="(row) =>{return row.id}"
                      :expand-row-keys="AppConfExpandedRowKeys"
            >
                <el-table-column type="expand">
                    <template #default="props">
                        <div class="app-others-fun">
                            <el-row :gutter="1">
                                <el-col :span="2">
                                    <el-button type="warning" @click="addOthers(props.row.others)">添加配置</el-button>
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="primary" @click="addAppConfig(props.row)">保存</el-button>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="app-others-fun">
                            <div v-for="(item,i) in props.row.others">
                                <el-row :gutter="3">
                                    <el-col :span="6">
                                        <el-tag>KEY：</el-tag> <el-input v-model="item.key"  style="width: 200px"/>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-tag>VALUE：</el-tag> <el-input v-model="item.value"  style="width: 200px"/>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-button type="danger" @click="delOthers(props.row.others,i)">删除</el-button>
                                    </el-col>
                                </el-row>
                                <br>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="序号" >
                    <template #default="scope">
                        {{scope.$index +1}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="APP名称"/>
                <el-table-column prop="appPackage" label="APP包名"/>
                <el-table-column prop="appActivity" label="App启动页"/>
                <el-table-column prop="automationName" label="APP启动引擎"/>
                <el-table-column prop="noReset" label="是否重置"/>
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="updateAppConf(scope.row)">编辑</el-button>
                        <el-button type="warning" @click="delAppConfig(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template v-slot:page>
            <pagination :total="dataTotal" :pageSize="pageSize" @paging="appPageChange"/>
        </template>
    </layout>
    <el-dialog v-model="appAddDialog" title="添加修改App配置" width="30%">

        <el-form :model="appConfigForm" label-width="120px">
            <el-form-item label="App名称">
                <el-input placeholder="app名称" v-model="appConfigForm.name"/>
            </el-form-item>
            <el-form-item label="App包名">
                <el-input placeholder="App包名" v-model="appConfigForm.appPackage"/>
            </el-form-item>
            <el-form-item label="App启动页">
                <el-input placeholder="App启动页" v-model="appConfigForm.appActivity"/>
            </el-form-item>
            <el-form-item label="自动化执行引擎">
                <el-select v-model="appConfigForm.automationName">
                    <el-option v-for="(data,index) in automationOption" :label="data.name" :value="data.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否重置APP">
                <el-select v-model="appConfigForm.noReset">
                    <el-option v-for="(data,index) in noResetOption" :label="data.name" :value="data.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
              <span class="dialog-footer">
                <el-button @click="appAddDialog = false">取消</el-button>
                <el-button type="primary" @click="addAppConfig(appConfigForm)">保存</el-button>
              </span>
        </template>
    </el-dialog>
</template>

<script setup>
    import layout from "../../views/componets/common/layout_one";
    import {ref,reactive,watch,onBeforeMount} from "vue";
    import pagination from "../../components/common/pagination";
    import commonUtils from "../../utils/commonUtils";
    import systemApi from "./systemApi";
    import {hideLoading, showLoading} from "../../utils/loading";

    // ---------------------------通用部分处理-------------------------
    const tableStyle = commonUtils.tabRowStyle()

    // ---------------------------APP配置列表信息-----------------------

    // app其他配置信息
    const AppConfExpandedRowKeys = ref([])
    const addOthers = (other)=>{
        const otherItem = {key:"",value:""}
        other.push(otherItem)
    }
    const delOthers = (other,i)=>{
        other.splice(i,1)
    }

    // 添加APP表单‘’
    const automationOption = [
        {name:"appium"},{name:"uiaotomator1"},{name:"uiaotomator2"}
    ]
    const noResetOption = [{name:"false",value:0},{name:"true",value:1}]
    let appAddDialog = ref(false)
    let appConfigForm = reactive({
        name:"",
        appPackage:"",
        appActivity:"",
        automationName:"",
        noReset:null,
        others:null
    })

    const addAppConfig = (appConfig)=>{
        systemApi.updateAppConfig(res=>{
                appConfigListInit()
                appAddDialog.value = false
                for (let key in appConfig) {
                    appConfigForm[key] = null
                }
            },appConfig)
    }
    const updateAppConf = (appConf)=>{
        for (let key in appConf) {
            appConfigForm[key] = appConf[key]
        }
        appAddDialog.value = true

    }

    // 列表
    const appConfigList = ref([])
    const appConfigListInit = (param)=>{
        systemApi.appConfigList(res=>{
            appConfigList.value = res.data.records
            pageSize.value = res.data.size
            dataTotal.value = res.data.total
        },param)
    }
    //删除app配置
    const delAppConfig = (id)=>{
        commonUtils.messageBox(()=>{
            systemApi.delAppConfig(
                res=>{
                    commonUtils.toast(res)
                    appConfigListInit()
                },id
            )
        })
    }

    // 筛选项处理
    const appName = ref(null)
    const queryAppConfig = ()=>{
        if (appName.value!=null){
            const query = {
                name:appName.value
            }
            appConfigListInit(query)
        }
    }

    // 分页处理
    const pageSize = ref(0)
    const dataTotal = ref(0)
    const appPageChange = (page)=>{
        const param = {current:page}
        appConfigListInit(param)
    }
    // ---------------------------监听
    watch(appAddDialog,(value, oldValue) => {
        if (value===false){
            for (let key in appConfigForm) {
                appConfigForm[key] = null
            }
        }
    })

    // ---------------------------生命周期函数-----------------------
    onBeforeMount(()=>{
        appConfigListInit()
    })

</script>

<style scoped>
    .app-others-fun{
        text-align: center;
        position:relative;
        margin-left: 200px;
    }
</style>