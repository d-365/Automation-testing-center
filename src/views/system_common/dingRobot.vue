<template>
    <layout>
        <template v-slot:title>
            <el-col :span="22">
                <div>钉钉机器人</div>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="addRobot">添加机器人</el-button>
            </el-col>
        </template>
        <template v-slot:fun>
            <div><el-row :gutter="4">
                <el-col :span="6">
                    <div class="fun-item">
                        机器人名称: &ensp;
                        <el-input v-model="robotName"  style="width: 200px" placeholder="请输入机器人名称" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="fun-item">
                        机器人状态: &ensp;
                        <el-select v-model="robotStatus">
                            <el-option
                                    v-for="(data,index) in robotStatusOp"
                                    :label="data.text"
                                    :key="data.value"
                                    :value="data.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="fun-item">
                        <el-button type="primary" @click="queryMobilePhone()">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="fun-item">
                        <el-button type="warning" @click="mobilePhoneListInit()">重置</el-button>
                    </div>
                </el-col>
            </el-row></div>
        </template>
        <template v-slot:list>
            <div id="robotList" v-if="robotList.value!==[]">
                <el-row :gutter="20">
                    <el-col
                            v-for="(data,index) in robotList"
                            :span="8"
                            id="robotList-data"
                    >
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span v-if="data.status ===0" style="color: #67C23A">启用</span>
                                    <span v-if="data.status ===1" style="color: #F56C6C">禁用</span>
                                </div>
                            </template>
                            <div>
                                <el-descriptions :column="1" border>
                                    <el-descriptions-item
                                            label="机器人编号"
                                            label-align="left"
                                            align="left"
                                            width="150px"

                                    >{{data.id}}</el-descriptions-item>
                                    <el-descriptions-item
                                            label="机器人名字"
                                            label-align="left"
                                            align="left"
                                            width="150px"

                                    >{{data.name}}</el-descriptions-item>
                                    <el-descriptions-item label="@" label-align="left" align="left">
                                        <span style="text-overflow: ellipsis; overflow: hidden;">{{data.atPhone}}</span>
                                        </el-descriptions-item>
                                    <el-descriptions-item label="机器人地址" label-align="left" align="left">
                                        <el-popover placement="top-start"
                                                    :width="400"
                                                    trigger="hover">
                                            <template #reference>
                                                <div class="robot-item" style="white-space:nowrap;text-overflow:ellipsis;">{{data.robotAddress}}</div>
                                            </template>
                                            <span style="color: #409EFF">{{data.robotAddress}}</span>
                                        </el-popover>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="机器人执行时机" label-align="left" align="left">
                                        <span v-if="data.robotType ===0">测试计划执行前</span>
                                        <span v-if="data.robotType ===1">测试计划执行后</span>
                                    </el-descriptions-item>
                                </el-descriptions>
                            </div>
                            <el-divider/>
                            <div id="robotList-data-bottom">
                                <el-button type="primary" @click="editRobot(data)">编辑</el-button>
                                <el-button type="primary" @click="delRobot(data.id)">删除</el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </template>
        <template v-slot:page>
            <div>
                <pagination :total="dataTotal" :pageSize="pageSize" @paging="PageChange"/>
            </div>
        </template>
    </layout>
    <div class="hidden">
        <el-dialog v-model="robotAlert" title="机器人配置" width="30%">
            <el-form :model="robotForm" label-width="120px">
                <el-form-item label="机器人名称">
                    <el-input placeholder="机器人名称" v-model="robotForm.name"/>
                </el-form-item>
                <el-form-item label="需要@的人">
                    <el-input placeholder="需要@的人" v-model="robotForm.atPhone"/>
                </el-form-item>
                <el-form-item label="机器人地址">
                    <el-input placeholder="机器人地址" v-model="robotForm.robotAddress"/>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="robotForm.status">
                        <el-option v-for="(data,index) in robotStatusOp" :label="data.text" :value="data.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="执行时机">
                    <el-select v-model="robotForm.robotType">
                        <el-option v-for="(data,index) in robotTypeOp" :label="data.text" :value="data.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="robotAlert = false">取消</el-button>
                <el-button type="primary" @click="updateRobot(robotForm)">保存</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
    import layout from "../../views/componets/common/layout_one"
    import {ref,reactive,onBeforeMount,computed} from "vue"
    import pagination from "../../components/common/pagination";
    import systemApi from "./systemApi";
    import commonUtils from "../../utils/commonUtils";

    // ---------------------筛选项功能区域---------------------
    const  robotStatusOp = reactive([
        {text:"启用",value:0},{text:"禁用",value:1}
    ])
    const robotStatus = ref(null)
    const robotName = ref("")
    // ---------------------列表数据区域-----------------------

    const robotList = ref([])
    const robotListInit = ()=>{
        const param = {
            pageSize:pageSize.value,
            current:current.value,
        }
        if (robotName.value !== ""){
            param["name"] = robotName.value
        }if (robotStatus.value!=null){
            param["status"] = robotStatus.value
        }
        systemApi.dingRobotList((res)=>{
            robotList.value = res.data.records
            dataTotal.value = res.data.total
        },param)
    }
    const delRobot = (id)=>{
        commonUtils.messageBox(systemApi.delRobot(res=>{
            robotListInit()
        },id))
    }
    // --------------------- 创建修改机器人弹窗-----------------
    const  robotTypeOp = reactive([
        {text:"测试计划执行前",value:0},{text:"测试计划执行后",value:1}
    ])
    let robotAlert = ref(false)
    let robotForm = reactive({
        id:null,
        name:null,
        status:null,
        robotType:null,
        atPhone:null,
        robotAddress:null,
        type:null
    })
    const addRobot = ()=>{
        robotForm["id"] = null
        robotForm["name"] = null
        robotForm["status"] = null
        robotForm["robotType"] = null
        robotForm["atPhone"] = null
        robotForm["robotAddress"] = null
        robotForm["type"] = null
        robotAlert.value = true
    }
    const editRobot = (entity)=>{
        robotForm["id"] = entity["id"]
        robotForm["name"] = entity["name"]
        robotForm["status"] = entity["status"]
        robotForm["robotType"] = entity["robotType"]
        robotForm["atPhone"] = entity["atPhone"]
        robotForm["robotAddress"] = entity["robotAddress"]
        robotForm["type"] = entity["type"]
        robotAlert.value = true
    }
    const updateRobot = (entity)=>{
        systemApi.updateRobot((res)=>{
            commonUtils.toast(res)
            robotAlert.value = false
            robotListInit()
        },entity)
    }
    //------------------------- 分页数据----------------------
    const dataTotal = ref(0)
    const pageSize = ref(10)
    const current = ref(1)
    const PageChange = (page)=>{
       current.value = page
        robotListInit()
    }
    // ---------------声明周期函数----------------
    onBeforeMount(
        ()=>{
            robotListInit()
        }
    )

</script>

<style scoped>
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .el-card{
        width: 350px !important;
    }
    #robotList-data-bottom{
        padding-left: 50px;
        justify-content: space-between;
        align-items: center;
    }
    /deep/ .el-descriptions__label{
        height: 10px !important;
    }

    .robot-item{
        position: relative;
        width: 10px;
    }
</style>