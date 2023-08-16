<template>
    <div id="new-plan">
        <div id="plan-left">
            <div class="case-info">
                <planInfo :planInfo="planDetail">
                    <template v-slot:form-item>
                        <el-form-item label="运行APP">
                            <el-select placeholder="运行的APP" v-model="planDetail.appId">
                                <el-option
                                        v-for="item in appOption"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                    </template>
                </planInfo>
            </div>
            <div class="case-info">
                <el-button  type="primary" @click="updateWebPlan">保存</el-button>
            </div>
        </div>
        <div id="plan-right">
            <el-tabs>
                <el-tab-pane label="用例">
                    <div id="addCase"><el-button type="primary" @click="addCaseDialog = true">添加用例</el-button></div>
                    <div id="case-list">
                        <myDialog :show_alter="addCaseDialog" @sonShowAlter="sonShowAlter">
                            <template v-slot:myBody>
                                <MyTree  :treeList="treeList" :defaultProps="defaultProps" @finalChecked="checkedCaseId" :selected-id="planDetail.planParam.caseIds"/>
                            </template>
                            <template v-slot:submit>
                                <el-button type="primary" @click="addCase">确认</el-button>
                            </template>
                        </myDialog>
                        <el-table id="tableRowDrop" :data="planCaseList" :cell-style="style_table"  :header-cell-style="style_table" row-key="id">
                            <el-table-column label="序号">
                                <template #default="scope">
                                    {{scope.row.dropId}}
                                </template>
                            </el-table-column>
                            <el-table-column label="用例Id" prop="id"></el-table-column>
                            <el-table-column label="用例名称" prop="name"></el-table-column>
                            <el-table-column label="用例描述" prop="remark"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="前置操作">
                    <div>
                        <setup_teardown :roundData="setupList" @SonRoundData="sonSetUp">
                            <template v-slot:func="scope">
                                <el-button @click="setupList.push({})">+</el-button>
                                <el-button v-if="scope.data.$index!==0" @click="delSetup(scope.data,0)">-</el-button>
                            </template>
                        </setup_teardown>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="后置操作">
                    <div><setup_teardown :roundData="tearDownList" @SonRoundData="sonTearDown">
                        <template v-slot:func="scope">
                            <el-button @click="tearDownList.push({})">+</el-button>
                            <el-button v-if="scope.data.$index!==0" @click="delSetup(scope.data,1)">-</el-button>
                        </template>
                    </setup_teardown></div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
    import myDialog from "../../components/common/alter/myDialog";
    import MyTree from "../../components/common/MyTree";
    import planInfo from "../../components/plan/planInfo";
    import {reactive,ref,onBeforeMount,onMounted} from  "vue"
    import request from "../../utils/request";
    import commonUtils from "../../utils/commonUtils";
    import { useRouter,useRoute } from 'vue-router';
    import Sortable from "sortablejs";
    import setup_teardown from "../componets/common/setup_teardown";
    import webApi from "../../views/WebAuto/webApi";

    const style_table = commonUtils.tabRowStyle("left")

    const router = useRouter()
    const route = useRoute()

    let planDetail = reactive({
        name:"",
        tryCount:1,
        isClock:0,
        clock:"0 0 0 1/1 * ?",
        isSendEmail:0,
        sendEmail:"",
        browserType:"",
        planType:2,
        planParam:{
            caseIds:[]
        },
        setUpId:[],
        tearDownId:[],
        appId:null
    })
    const deviceOption = [{
        name:"Chrome",
        value:"Chrome"
    },{
        name:"Firefox",
        value:"Firefox"
    }]

    // 更新保存测试计划
    const updateWebPlan = ()=>{
        updateSetup()
        request.post("/api/plan/save",planDetail).then(res=>{
            commonUtils.toast(res)
            router.go(-1)
        })

    }
    // 用例列表
    const treeList = ref([])
    const defaultProps ={
        children: 'children',
        label: 'name',
    }
    const treeListInit = ()=>{
        const payload = {
            "caseType":2
        }
        request.post("/api/webCase/caseList",payload).then(res=>{
            treeList.value = res.data
        })
    }

    // 获取树形结果中的用例ID
    const checkedCaseId = (data)=>{
        let checked = []
        planCaseList.value = []
        data.forEach((item,i)=>{
            checked.push(item.id)
            item.dropId = i + 1
            planCaseList.value.push(item)
        })
        planDetail.planParam.caseIds = checked
    }

    // planID
    const planId = ref(null)

    // 取到路由带过来的参数
    const getParams =()=>{
        const routerParams = route.query.plan
        if(routerParams!==undefined){
            const  data = JSON.parse(routerParams)
            planId.value = data.id
            planDetail.name =  data.name
            planDetail.browserType =  data.browserType
            planDetail.clock =  data.clock
            planDetail.clockExecCount =  data.clockExecCount
            planDetail.envId =  data.envId
            planDetail.id =  data.id
            planDetail.isClock =  data.isClock
            planDetail.isSendEmail =  data.isSendEmail
            planDetail.planType =  data.planType
            planDetail.remark =  data.remark
            planDetail.sendEmail =  data.sendEmail
            planDetail.status =  data.status
            planDetail.tryCount =  data.tryCount
            if (data.planParam!==null){
                caseId = data.planParam.caseIds
                planDetail.planParam =  data.planParam
            }
            planDetail.appId =  data.appId

        }
    }

    // 添加用例弹窗
    let addCaseDialog = ref(false);
    // 接收子组件弹窗中的值
    const sonShowAlter = (data)=>{
        addCaseDialog.value = data
    }

    let planCaseList = ref([])
    // 计划中添加用例
    const addCase = ()=>{
        addCaseDialog.value = false
    }
    let caseId = [];
    const planCaseListInit = ()=>{
        request.post("/api/plan/checked/case",caseId).then(res=>{
            res.data.forEach((item,i)=>{
                item.dropId = i+1
                planCaseList.value.push(item)
            })

        })
    }

    // 行拖拽
    const initSort = ()=> {
        const el = document.querySelector('#tableRowDrop tbody')
        const sortable = new Sortable(el,{
            animation: 200, //动画参数
            onEnd: function({oldIndex, newIndex}){
                const oldRaw = planCaseList.value[oldIndex]
                planCaseList.value[oldIndex] = planCaseList.value[newIndex]
                planCaseList.value[newIndex] = oldRaw
                planCaseList.value[oldIndex].dropId = oldIndex +1
                planCaseList.value[newIndex].dropId = newIndex +1
                const  newCaseId = []
                planCaseList.value.forEach((item,i)=>{
                    newCaseId.push(item.id)
                })
                planDetail.planParam.caseIds = newCaseId
            }
        })
    }

    // ----------------------------------前置后置操作-----------------------------------------
    const setupList = ref([{
        id:null,
        name:"",
        actionId:"",
        actionKey:"",
        actionValue:"",
        status:0,
        planId:planId.value,
        type:0
    }])
    const tearDownList = ref([{
        id:null,
        name:"",
        status:0,
        actionId:"",
        actionKey:"",
        actionValue:"",
        planId:planId.value,
    }])

    // 保存前置后置操作
    const updateSetup = ()=>{
        const payload = {
            setUp:setupList.value,
            tearDown:tearDownList.value,
        }
        request.post("/api/plan/round/update",payload).then(res=>{
            commonUtils.toast(res)
        })
    }

    // 删除前置后置操作
    const delSetup = (scope,type)=>{
        commonUtils.messageBox(res=>{
            const id = scope.row.id
            if ( id != null){
                webApi.delSetup(id,res=>{
                    console.log(res)
                })
            }
            if (type ===0){
                setupList.value.splice(scope.$index,1)
            }else if (type === 1){
                tearDownList.value.splice(scope.$index,1)
            }
        })
    }

    // 获取组件中前置动作
    const sonSetUp = (data)=>{
        data.forEach((item)=>{
            if (item.planId==null){
                item.planId = planId.value
            }
        })
        setupList.value =data
    }
    const sonTearDown = (data)=>{
        data.forEach((item)=>{
            if (item.planId==null){
                item.planId = planId.value
            }
        })
        tearDownList.value = data
    }

    // 初始化前置后置操作
    const setupInit = ()=>{
        if (planId.value!=null){
            webApi.setupInit(planId.value,res=>{
                if (res.data.setup.length !==0){
                    setupList.value = res.data.setup
                }
                if (res.data.tearDown.length !==0){
                    tearDownList.value = res.data.tearDown
                }
            })
        }

    }

    const appOption = ref([])
    const appOptionInit =()=>{
        webApi.appConfigOp(res=>{
            appOption.value = res.data
        })
    }

    //-------------------------------声明周期函数
    onBeforeMount(()=>{
        getParams()
        treeListInit()
        planCaseListInit()
        setupInit()
        appOptionInit()
    })
    onMounted(()=>{
        initSort()
    })


</script>

<style scoped>
    #new-plan{
        height: 100%;
        width: 100%;
    }
    .case-info{
        padding-top: 50px;
        padding-left: 50px;
    }
    #plan-left{
        width: 40%;
        height: 100%;
        position: absolute;
        left: 0;
    }
    #plan-right{
        padding-top: 50px;
        width: 60%;
        height: 100%;
        position: absolute;
        left: 40%;
    }
    .sortable-ghost {
        opacity: 0.4;
        background-color: #F4E2C9;
    }
</style>