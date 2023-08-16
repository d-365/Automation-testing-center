<template>
    <div id="myAction">
        <el-tabs v-model="currentAction" @tab-click="ActionClick">
            <el-tab-pane label="Web-Action" name="Web">
                <div class="ActionList">
                    <div class="addAction">
                        <el-input v-model="actionFilter" placeholder="Please input">
                            <template #append>
                                <el-icon color="#409EFC">
                                    <Plus @click="ActionDetailDialog = true"/>
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                    <div class="list">
                        <el-table :data="actionList" :show-header="false" @row-click="showDetail" highlight-current-row :row-style="headerStyle">
                            <el-table-column prop="name" label="name">
                               <template #default="scope">
                                   <el-input v-show="scope.row.show" v-model="scope.row.name"></el-input>
                                   <span v-show="!scope.row.show">{{scope.row.name}}</span>
                               </template>
                            </el-table-column>
                            <el-table-column label="Edit">
                                <template #default="scope">
                                    <div v-show="!scope.row.show" style="padding-right: 10px;text-align: right">
                                        <el-icon color="#409EFC">
                                            <Edit @click="scope.row.show = true"/>
                                        </el-icon>
                                        <el-icon color="#409EFC">
                                            <Delete @click="delAction(scope.row.id)"/>
                                        </el-icon>
                                    </div>
                                    <el-button v-show="scope.row.show" @click="updateAction(scope.row),scope.row.show=false" type="primary" size="small">save</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="ActionDetail" v-show="ActionDetailShow">
                    <div class="addAction">
                        <el-button type="primary" @click="addActionDetail">添加Action</el-button>
                    </div>
                    <div class="list">
                        <el-table :data="actionDetailList" :header-row-style="headerStyle" :cell-style="cellStyle">
                            <el-table-column prop="name" label="Action名称"  width="150"/>
                            <el-table-column prop="actionKey" label="ActionKey" width="150"/>
                            <el-table-column prop="remark" label="描述" width="500">
                                <template #default="scope">
                                    <el-popover placement="top-start"
                                                :width="400"
                                                trigger="hover">
                                        <template #reference>
                                            <div style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; margin-left: 15px; width: 490px">{{scope.row.remark}}</div>
                                        </template>
                                        <div style="color: #409EFF">{{scope.row.remark}}</div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column label="Edit" header-align="center" align="center">
                                <template #default="scope">
                                    <div>
                                        <el-button type="primary" @click="updateActionDialog = true , updateActionData=scope.row">修改</el-button>
                                        <el-button type="warning" @click="delAction(scope.row.id,scope.row)">删除</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="App-Action" name="App">
                <div class="ActionList">
                    <div class="addAction">
                        <el-input v-model="actionFilter" placeholder="Please input">
                            <template #append>
                                <el-icon color="#409EFC">
                                    <Plus @click="ActionDetailDialog = true"/>
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                    <div class="list">
                        <el-table :data="actionList" :show-header="false" @row-click="showDetail" highlight-current-row :row-style="headerStyle">
                            <el-table-column prop="name" label="name">
                                <template #default="scope">
                                    <el-input v-show="scope.row.show" v-model="scope.row.name"></el-input>
                                    <span v-show="!scope.row.show">{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Edit">
                                <template #default="scope">
                                    <div v-show="!scope.row.show" style="padding-right: 10px;text-align: right">
                                        <el-icon color="#409EFC">
                                            <Edit @click="scope.row.show = true"/>
                                        </el-icon>
                                        <el-icon color="#409EFC">
                                            <Delete @click="delAction(scope.row.id)"/>
                                        </el-icon>
                                    </div>
                                    <el-button v-show="scope.row.show" @click="updateAction(scope.row),scope.row.show=false" type="primary" size="small">save</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="ActionDetail" v-show="ActionDetailShow">
                    <div class="addAction">
                        <el-button type="primary" @click="addActionDetail">添加Action</el-button>
                    </div>
                    <div class="list">
                        <el-table :data="actionDetailList" :header-row-style="headerStyle" :cell-style="cellStyle">
                            <el-table-column prop="name" label="Action名称"  width="150"/>
                            <el-table-column prop="actionKey" label="ActionKey" width="150"/>
                            <el-table-column prop="remark" label="描述" width="500">
                                <template #default="scope">
                                    <el-popover placement="top-start"
                                                :width="400"
                                                trigger="hover">
                                        <template #reference>
                                            <div style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; margin-left: 15px; width: 490px">{{scope.row.remark}}</div>
                                        </template>
                                        <div style="color: #409EFF">{{scope.row.remark}}</div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column label="Edit" header-align="center" align="center">
                                <template #default="scope">
                                    <div>
                                        <el-button type="primary" @click="updateActionDialog = true , updateActionData=scope.row">修改</el-button>
                                        <el-button type="warning" @click="delAction(scope.row.id,scope.row)">删除</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Api-Action" name="Api">
                <div class="ActionList">
                    <div class="addAction">
                        <el-input v-model="actionFilter" placeholder="Please input">
                            <template #append>
                                <el-icon color="#409EFC">
                                    <Plus @click="ActionDetailDialog = true"/>
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                    <div class="list">
                        <el-table :data="actionList" :show-header="false" @row-click="showDetail" highlight-current-row :row-style="headerStyle">
                            <el-table-column prop="name" label="name">
                                <template #default="scope">
                                    <el-input v-show="scope.row.show" v-model="scope.row.name"></el-input>
                                    <span v-show="!scope.row.show">{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Edit">
                                <template #default="scope">
                                    <div v-show="!scope.row.show" style="padding-right: 10px;text-align: right">
                                        <el-icon color="#409EFC">
                                            <Edit @click="scope.row.show = true"/>
                                        </el-icon>
                                        <el-icon color="#409EFC">
                                            <Delete @click="delAction(scope.row.id)"/>
                                        </el-icon>
                                    </div>
                                    <el-button v-show="scope.row.show" @click="updateAction(scope.row),scope.row.show=false" type="primary" size="small">save</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="ActionDetail" v-show="ActionDetailShow">
                    <div class="addAction">
                        <el-button type="primary" @click="addActionDetail">添加Action</el-button>
                    </div>
                    <div class="list">
                        <el-table :data="actionDetailList" :header-row-style="headerStyle" :cell-style="cellStyle">
                            <el-table-column prop="name" label="Action名称"  width="150"/>
                            <el-table-column prop="actionKey" label="ActionKey" width="150"/>
                            <el-table-column prop="remark" label="描述" width="500">
                                <template #default="scope">
                                    <el-popover placement="top-start"
                                                :width="400"
                                                trigger="hover">
                                        <template #reference>
                                            <div style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; margin-left: 15px; width: 490px">{{scope.row.remark}}</div>
                                        </template>
                                        <div style="color: #409EFF">{{scope.row.remark}}</div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column label="Edit" header-align="center" align="center">
                                <template #default="scope">
                                    <div>
                                        <el-button type="primary" @click="updateActionDialog = true , updateActionData=scope.row">修改</el-button>
                                        <el-button type="warning" @click="delAction(scope.row.id,scope.row)">删除</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="前置后置" name="前置后置">
                <div class="ActionList">
                    <div class="addAction">
                        <el-input v-model="actionFilter" placeholder="Please input">
                            <template #append>
                                <el-icon color="#409EFC">
                                    <Plus @click="ActionDetailDialog = true"/>
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                    <div class="list">
                        <el-table :data="actionList" :show-header="false" @row-click="showDetail" highlight-current-row :row-style="headerStyle">
                            <el-table-column prop="name" label="name">
                                <template #default="scope">
                                    <el-input v-show="scope.row.show" v-model="scope.row.name"></el-input>
                                    <span v-show="!scope.row.show">{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Edit">
                                <template #default="scope">
                                    <div v-show="!scope.row.show" style="padding-right: 10px;text-align: right">
                                        <el-icon color="#409EFC">
                                            <Edit @click="scope.row.show = true"/>
                                        </el-icon>
                                        <el-icon color="#409EFC">
                                            <Delete @click="delAction(scope.row.id)"/>
                                        </el-icon>
                                    </div>
                                    <el-button v-show="scope.row.show" @click="updateAction(scope.row),scope.row.show=false" type="primary" size="small">save</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="ActionDetail" v-show="ActionDetailShow">
                    <div class="addAction">
                        <el-button type="primary" @click="addActionDetail">添加Action</el-button>
                    </div>
                    <div class="list">
                        <el-table :data="actionDetailList" :header-row-style="headerStyle" :cell-style="cellStyle">
                            <el-table-column prop="name" label="Action名称"  width="150"/>
                            <el-table-column prop="actionKey" label="ActionKey" width="150"/>
                            <el-table-column prop="remark" label="描述" width="500">
                                <template #default="scope">
                                    <el-popover placement="top-start"
                                                :width="400"
                                                trigger="hover">
                                        <template #reference>
                                            <div style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; margin-left: 15px; width: 490px">{{scope.row.remark}}</div>
                                        </template>
                                        <div style="color: #409EFF">{{scope.row.remark}}</div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column label="Edit" header-align="center" align="center">
                                <template #default="scope">
                                    <div>
                                        <el-button type="primary" @click="updateActionDialog = true , updateActionData=scope.row">修改</el-button>
                                        <el-button type="warning" @click="delAction(scope.row.id,scope.row)">删除</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <div class="hidden">
        <el-dialog
                v-model="ActionDetailDialog"
                title="添加Action"
                width="50%"
                center
        >
            <el-form :model="newAction" label-width="150px">
                <el-form-item label="ActionName">
                    <el-input style="width: 400px;" placeholder="place input" v-model="newAction.name"></el-input>
                </el-form-item>
                <el-form-item label="ActionKey">
                    <el-input style="width: 400px;" placeholder="place input" v-model="newAction.actionKey"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input style="width: 400px;" placeholder="place input" v-model="newAction.remark"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="ActionDetailDialog = false">关闭</el-button>
                <el-button type="primary" @click="addAction(newAction,1)">确认</el-button>
              </span>
            </template>
        </el-dialog>
        <el-dialog
                v-model="updateActionDialog"
                title="添加Action"
                width="50%"
                center
        >
            <el-form :model="updateActionData" label-width="150px">
                <el-form-item label="ActionName">
                    <el-input style="width: 400px;" placeholder="place input" v-model="updateActionData.name"></el-input>
                </el-form-item>
                <el-form-item label="ActionKey">
                    <el-input style="width: 400px;" placeholder="place input" v-model="updateActionData.actionKey"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input style="width: 400px;" placeholder="place input" v-model="updateActionData.remark"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="updateActionDialog = false">关闭</el-button>
                <el-button type="primary" @click="addAction(updateActionData,1)">确认</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
    import {Plus,Edit,Delete} from "@element-plus/icons";

    import commonUtils from "../../utils/commonUtils";
    import {onBeforeMount, reactive, ref, watch} from "vue"
    import request from "../../utils/request";
    import webApi from "../WebAuto/webApi";


    let updateActionDialog = ref(false)
    let updateActionData = reactive({
        id: null,
        name: "",
        type: 0,
        actionKey: "",
        remark: "",
        parentId: 0
    })

    const headerStyle = ref(commonUtils.tabRowStyle())
    const cellStyle = ref(commonUtils.tabRowStyle("left"))
    // 添加ActionDetail
    let ActionDetailDialog = ref(false)
    const actionFilter = ref("")
    // 当前选中的action
    const currentAction = ref("Web")
    // 点击对应tab-Action
    const ActionClick = (tab,event)=>{
        ActionDetailShow.value = false
        if (tab.props.name ==="Web"){
            actionType.value = 0
            init()
        }else if(tab.props.name==="App"){
            actionType.value = 1
            init()
        }else if(tab.props.name==="Api"){
            actionType.value = 2
            init()
        }else if (tab.props.name==="前置后置"){
            actionType.value = 3
            init()
        }
    }
    // actionList
    const actionList = ref([])
    // actionDetailList
    const actionDetailList = ref([])
    const actionType = ref(0)
    // 初始化数据
    const init = (payload)=>{
        if (payload === undefined){
            payload =  {type:actionType.value,parentId:0}
        }
        // request.post("/api/action/actionList", payload).then(res=>{
        //     actionList.value = res.data
        // })
        webApi.getActionList(payload,res=>{
            actionList.value = res.data
        })
    }
    onBeforeMount(()=>{
        init()
    })
    const emptyAction = {
        name:"",
        type:actionType.value,
        actionKey:"",
        remark:"",
        parentId:0
    }
    // 空Action
    let newAction = reactive({
        id:null,
        name:"",
        type:actionType.value,
        actionKey:"",
        remark:"",
        parentId:0
    })
    const parentAction = ref(0);
    // 添加action
    const  addAction = (action,type)=>{
        action.type = actionType.value
        if (type === 0){
            action.parentId = 0
        // }else {
        //     actionDetailList.value.push(action)
        // }
        }
        ActionDetailDialog.value = false
        updateActionDialog.value = false
        const myAction = {
            id:action.id,
            name:action.name,
            type:action.type,
            actionKey:action.actionKey,
            remark:action.remark,
            parentId:action.parentId
        }
        updateAction(myAction)
    }
    // 删除Action type 0 列表  1 详情
    const delAction = (id,action)=>{
        commonUtils.messageBox(()=>request.delete("/api/action/delAction/"+id).then(res=>{
            init()
            if (action.parentId !==0){
                actionDetailList.value.filter((item,i)=>
                    {
                        if (item.id === action.id){
                            actionDetailList.value.splice(i,1)
                        }
                    }
                )
            }
        }),"删除Action后,用例中所有相关的操作都会失效,确定要删除吗？")
    }
    // 更新Action
    const updateAction = (action)=>{
        request.post("/api/action/update",action).then(res=>{
            init()
        })
    }
    // ActionDetailShow
    let ActionDetailShow = ref(false)
    // 加载showDetail 数据
    const showDetail = (row)=>{
        ActionDetailShow.value = true
        const  id  = row.id
        parentAction.value = row.id
        const  payload = {type:actionType.value,parentId:id}
        request.post("/api/action/actionList", payload).then(res=>{
            actionDetailList.value = res.data
        })
    }
    const addActionDetail = ()=>{
        newAction.id = null
        newAction.name = ""
        newAction.remark = ""
        newAction.actionKey = ""
        newAction.parentId= parentAction
        ActionDetailDialog.value = true
    }
    // 过滤数据监听
    watch(()=>actionFilter.value,(newVar,oldVar)=>{
        if (newVar!==""){
            actionList.value = actionList.value.filter((item) => item.name.includes(newVar))
        }else {
            init()
        }
    })
    watch(()=>actionType.value,(newVar,oldVar)=>{
        actionType.value = newVar
    })

</script>

<style scoped>
    #myAction{
        padding: 20px;
        position: relative;
    }
    .ActionList{
        width: 30%;
        border: 1px solid #ebeef5;
        float: left;
        padding: 5px;
        height: calc(100vh - 200px);
        overflow:auto;
    }
    .ActionDetail{
        padding: 5px;
        width: 70%;
        height: calc(100vh - 200px);
        border: 1px solid #ebeef5;
        float: right;
        overflow:auto;
    }
    .el-tooltip__popper {
        max-width: 800px;
    }
</style>