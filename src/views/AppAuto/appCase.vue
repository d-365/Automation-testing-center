<template>
    <!--WEB自动化--用例列表-->
    <div id="selenium-case">
        <!--用例列表-->
        <div id="case-List">
            <div class="caseList-top">
                <el-input v-model="caseFilterName" placeholder="过滤分类名称">
                    <template #append>
                        <el-button @click="addCaseFolder = true">
                            新增分类
                        </el-button>
                    </template>
                </el-input>
            </div>
            <div class="caseList-body">
                <el-tree
                        ref="treeRef"
                        :data="caseList"
                        node-key="id"
                        :filter-node-method="filterCaseList"
                >
                    <template #default="{ node, data }">
                        <div class="tree-node-left" @click="showCaseInfo(data)" style="width: 90%">
                            {{data.name}}
                        </div>
                        <div v-if="data.type === 0" class="tree-node-right">
                            <myDropdown>
                                <template v-slot:body>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="openAddFolder(data,0)">新增文件夹</el-dropdown-item>
                                        <el-dropdown-item @click="openAddFolder(data,1)">新增用例</el-dropdown-item>
                                        <el-dropdown-item @click="editFolder(data)">编辑</el-dropdown-item>
                                        <el-dropdown-item @click="copyCase(data)">复制</el-dropdown-item>
                                        <el-dropdown-item @click="delCase(data)">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </myDropdown>
                        </div>
                        <div v-else class="tree-node-right">
                            <myDropdown>
                                <template v-slot:body>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="copyCase(data)"> 复制</el-dropdown-item>
                                        <el-dropdown-item @click="delCase(data)">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </myDropdown>
                        </div>
                    </template>
                </el-tree>
            </div>
        </div>
        <div id="resize" title="收缩侧边栏"></div>
        <!--用例详情-->
        <div id="case-info" v-show="caseInfoShow">
            <div id="info-top">
                <!--用例详情--顶部功能区-->
                <div  class="caseInfo-top">
                    <div class="caseInfo-top-item">用例名称：<el-input v-model="currentCase.name" style="width: 200px"/></div>
                    <div class="caseInfo-top-item">备注：<el-input  v-model="currentCase.remark" style="width: 200px"/></div>
                    <div class="caseInfo-top-item"><el-button type="primary" @click="updateCaseInfo">保存</el-button></div>
                    <div class="caseInfo-top-item"><el-button type="warning" @click="debugAppCase(currentCase.id,0)">远程调试</el-button></div>
                    <div class="caseInfo-top-item"><el-button type="success" @click="debugAppCase(currentCase.id,1)">本地调试</el-button></div>
                </div>
                <!--用例详情--顶部功能区-->
                <div  class="caseInfo-total">
                </div>
                <!--用例详情--左侧Action操作区域-->
                <div  class="caseInfo-action">
                    <filterTree :treeData="actionTreeData">
                        <template v-slot:nodeRight='nodeData'>
                            <el-button  type="text" v-if="nodeData.nodeData.parentId!==0" @click="addCaseStep(nodeData.nodeData)">添加</el-button>
                            <el-button  type="text" v-if="nodeData.nodeData.parentId!==0" @click="">插入</el-button>
                        </template>
                    </filterTree>
                </div>
                <!--用例详情--用例详情列表-->
                <div  class="caseInfo-list">
                    <el-table :data="caseStepList" border
                          id="selenium-case-drop"
                          :header-cell-style="headerStyle"
                          :cell-style="cellStyle"
                          :row-key="(row) =>{return row.id}"
                          :expand-row-keys="expandRow"
                    >
                        <el-table-column type="expand">
                            <template #default="props">
                                <div id="stepAssert">
                                    <div class="web-assert">
                                        <el-tag>断言方式</el-tag>
                                        <el-select v-model="props.row.assertType" clearable>
                                            <el-option
                                                    v-for="item in assertTypeOptions"
                                                    :key="item.value"
                                                    :label="item.name"
                                                    :value="item.value"
                                            />
                                        </el-select>
                                    </div>
                                    <div class="web-assert"><el-tag >断言值</el-tag><el-input v-model="props.row.assertValue" clearable placeholder="请输入断言数据"/></div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column  width="50">
                            <template #default="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="describe" label="描述"  width="150">
                            <template #default="scope">
                                <el-input v-model="scope.row.stepDescribe"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="elementId" label="页面元素" width="200">
                            <template #default="scope">
                                <el-cascader
                                        :popper-options="{ boundariesElement: 'viewport', removeOnDestroy: true }"
                                        :show-all-levels="false"
                                        clearable
                                        filterable
                                        v-model="scope.row.elementId"
                                        :options="elementOption"
                                        :props="elementOptionProp">
                                    <template #default="{ node, data }">
                                        <div style="display: inline-flex">{{ data.name }} </div><div v-show="data.children.length!==0" style="display: inline-flex;color: #409EFF">({{data.children.length}})</div>
                                    </template>
                                </el-cascader>
                            </template>
                        </el-table-column>
                        <el-table-column prop="actionSummary" label="Action" width="100">
                            <template #default="scope">
                                <div style="text-align: center">
                                    <el-button type="success" disabled>{{scope.row.actionSummary}}</el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="actionValue" label="Action参数">
                            <template #default="scope">
                                <input v-if="scope.row.actionSummary === 'execPython' " type="file" @change="addFile" ref="inputer">
                                <el-input v-else  v-model="scope.row.actionValue"/>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作"  width="100">
                            <template #default="scope">
                                <div style="position:absolute;right:5px;top:10px;display: inline-flex">
                                    <div style="margin-top: 3px;"><el-icon @click="copyStep(scope.row)"><CopyDocument/></el-icon></div>
                                    <div style="padding-left: 5px;margin-top: 3px;"><el-icon @click="delCaseStep(scope.row,scope.$index)"><Delete/></el-icon></div>
                                    <div style="padding-left: 5px">
                                        <el-switch
                                                v-model="scope.row.status"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
                                                :active-value = 0
                                                :inactive-value = 1
                                        /></div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <div class="page-app-case">
                        <pagination :total="caseStepListTotal" :pageSize="caseStepPageSize" @paging="appCaseListCh"/>
                    </div>
                </div>
            </div>
            <div id="info-resize" title="收缩侧边栏"></div>
            <!--用例详情--顶部调试区域-->
            <div  id="Info-bottom">
                <el-select placeholder="请选择要调试的APP" v-model="execDevice">
                    <el-option
                            v-for="item in appOption"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                    />
                </el-select>
                <el-select placeholder="请选择要调试的手机" v-model="exec_phone">
                    <el-option
                            v-for="item in phoneOp"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.disabled"
                    />
                </el-select>
                <el-tag type="success">上拉查看用例调式结果</el-tag>
                <div v-show="showDebug" class="showConsole">
                    <el-tabs>
                        <el-tab-pane label="用例执行结果">
                            <div v-for="(item,i) in debugMsg" >
                                <div v-if="item.code ===0" style="color: #67C23A;font-weight: bold">{{i+1}}
                                    <el-tag type="success">success</el-tag>
                                </div>
                                <div v-if="item.code ===1" style="color: #F56C6C;font-weight: bold">{{i+1}}
                                    <el-tag type="danger">failed</el-tag>
                                </div>
                                <div>{{item.msg}}</div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="用例断言信息">
                            <el-table :data="assertMsg" style="width: 100%" :header-cell-style="cellStyle" :row-style="cellStyle">
                                <el-table-column prop="stepId" label="步骤ID">
                                    <template #default="scope">
                                        {{scope.row.stepId}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="assertType" label="断言方式" >
                                    <template #default="scope">
                                        <el-select disabled v-model="scope.row.assertType">
                                            <el-option
                                                    v-for="item in assertTypeOptions"
                                                    :key="item.value"
                                                    :label="item.name"
                                                    :value="item.value"
                                            />
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="expectValue" label="期望值" />
                                <el-table-column prop="realityValue" label="断言值" />
                                <el-table-column prop="result" label="断言结果" >
                                    <template #default="scope">
                                        <el-tag v-show="scope.row.result === true" type="success" effect="dark">{{scope.row.result}}</el-tag>
                                        <el-tag v-show="scope.row.result === false" type="danger" effect="dark">{{scope.row.result}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="msg" label="msg" />
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
    <div class="hidden">
        <el-dialog
                v-model="addCaseFolder"
                title="新增文件夹"
                width="30%"
        >
            <el-form >
                <el-form-item label="名称" >
                    <el-input  v-model="emptyCase.name"></el-input>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input  v-model="emptyCase.remark"  :rows="1" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                  <el-button @click="addCaseFolder = false">取消</el-button>
                  <el-button type="primary" @click="addFolder(0)">确认</el-button>
              </span>
            </template>
        </el-dialog>
        <el-dialog
                v-model="editCaseFolder"
                title="编辑文件夹"
                width="30%"
        >
            <el-form >
                <el-form-item label="名称" >
                    <el-input  v-model="editCaseData.name"></el-input>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input  v-model="editCaseData.remark"  :rows="1" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                  <el-button @click="editCaseFolder = false">取消</el-button>
                  <el-button type="primary" @click="updateCase">确认</el-button>
              </span>
            </template>
        </el-dialog>
        <el-dialog
                v-model="addCaseDialog"
                title="新增用例"
                width="30%"
        >
            <el-form >
                <el-form-item label="名称" >
                    <el-input  v-model="emptyCase.name"></el-input>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input  v-model="emptyCase.remark"  :rows="1" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                  <el-button @click="addCaseDialog = false">取消</el-button>
                  <el-button type="primary" @click="addFolder(1)">确认</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
    import pagination from "../../components/common/pagination";
    import {onBeforeMount, onMounted,onUnmounted,reactive, ref, watch, watchEffect} from "vue"
    import {More,CopyDocument,Delete} from "@element-plus/icons"
    import request from "../../utils/request";
    import myDropdown from "../../components/common/myDropdown";
    import myDialog from "../../components/common/myDialog";
    import commonUtils from "../../utils/commonUtils";
    import filterTree from "../../components/tree/filterTree"
    import webApi from "../../views/WebAuto/webApi";
    import Sortable from "sortablejs";

    // _________________________________公共方法区________________________________//
    //表头样式
    const headerStyle = commonUtils.tabRowStyle("center")
    // 表格样式
    const cellStyle = commonUtils.tabRowStyle("left")
    // 拖动事件
    const dragDiv_x =(myBox,myLeft,myMid,myResize) => {
        const resize = document.getElementById(myResize);
        const left = document.getElementById(myLeft);
        const mid = document.getElementById(myMid);
        const box = document.getElementById(myBox);
        // 鼠标按下事件
        resize.onmousedown = function(e) {
            const startX = e.clientX;
            const resizeLeft = resize.offsetLeft;
            // 鼠标拖动事件
            document.onmousemove = function(e) {
                const moveX = e.clientX;
                let moveLen = resizeLeft + (moveX - startX);
                const maxT = box.clientWidth - resize.offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
                moveLen = moveLen < 15 ? 15 : moveLen; //左边区域最小宽度为15px
                moveLen = moveLen > (maxT - 150) ? maxT - 150 : moveLen; //右边区域最小宽度为150px
                left.style.width = moveLen + 'px';
                mid.style.left = moveLen + 'px';
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
    // 拖动事件
    const dragDiv_y =(myBox,myLeft,myMid,myResize) => {
        const box = document.getElementById(myBox);
        const left = document.getElementById(myLeft);
        const resize = document.getElementById(myResize);
        const mid = document.getElementById(myMid);
        // 鼠标按下事件
        resize.onmousedown = function(e) {
            const startY = e.clientY;
            const resizeTop = resize.offsetTop;
            // 鼠标拖动事件
            document.onmousemove = function(e) {
                const moveY = e.clientY;
                let moveLen = resizeTop + (moveY - startY);
                const maxT = box.clientHeight - resize.offsetHeight; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
                moveLen = moveLen < 10 ? 10 : moveLen; //左边区域最小宽度为15px
                moveLen = moveLen > (maxT - 35) ? maxT - 35 : moveLen;
                left.style.height = moveLen + 'px';
                mid.style.top = moveLen + 'px';
                resize.style.top = (moveLen - 5) + 'px';
            };
            // 鼠标松开事件
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        };
    }

    // 用例详情行拖拽
    const initSort = ()=> {
        const el = document.querySelector('#selenium-case-drop tbody')
        const sortable = new Sortable(el,{
            animation: 200, //动画参数
            onEnd:function ({oldIndex, newIndex}) {
                const oldRawSort = caseStepList.value[oldIndex].sort
                const newRawSort = caseStepList.value[newIndex].sort
                caseStepList.value[oldIndex].sort = newRawSort
                caseStepList.value[newIndex].sort = oldRawSort
                // caseStepList.value[newIndex].sort = newRawSort
                // console.log(oldRawSort,newRawSort)
            }
        })
    }

    //_________________________________用例列表________________________________//
    // 新增用例文件夹弹窗
    let addCaseFolder = ref(false)
    // 新增用例弹窗
    let addCaseDialog = ref(false)
    // 编辑文件夹
    let editCaseFolder = ref(false)

    // 编辑用例
    let editCaseData = reactive({
        id:null,
        name:"",
        remark:"",
        parentId:0,
        type:0,
        children:[]
    })

    // 空的用例
    let emptyCase = reactive({
        id:null,
        name:"",
        remark:"",
        parentId:0,
        type:0,
        children:[],
        actionValue:""
    })
    const emptyCaseInit= ()=>{
        emptyCase.children= []
        emptyCase.id =  null
        emptyCase.name =""
        emptyCase.parentId = 0
        emptyCase.remark = ""
        emptyCase.type= 0
    }
    // 当前操作的caseId
    let currentCaseId = ref(null)
    // 用例列表
    const caseList = ref([])
    const caseListInit = ()=>{
        const param = {"caseType":2}
        request.post("/api/webCase/caseList",param).then(res=>{
            caseList.value = res.data
        })
    }

    // 用例列表过滤输入框
    const  caseFilterName = ref("");
    // 用例列表过滤
    const filterCaseList = (value, data)=> {
        return data.name.includes(value) || value === "";
    }
    const treeRef = ref();
    watch(()=>caseFilterName.value, (val) => {
        treeRef.value.filter(val)
    })

    // 开启新增用例弹窗
    const openAddFolder = (data,type)=>{
        console.log(data)
        emptyCaseInit()
        currentCaseId.value = data.id
        if (type===0){
            addCaseFolder.value = true
        }else {
            addCaseDialog.value = true
        }
    }
    // 编辑文件夹
    const editFolder = (data)=>{

        editCaseData.children= data.children
        editCaseData.id =  data.id
        editCaseData.name = data.name
        editCaseData.parentId = data.parentId
        editCaseData.remark = data.remark
        editCaseData.type= data.type
        editCaseFolder.value = true
    }
    const updateCaseApi = (data)=>{
        request.post("/api/webCase/update",data).then(res=>{
            caseListInit()
        })
    }
    // 修改用例
    const updateCase = ()=>{
        updateCaseApi(editCaseData)
        editCaseFolder.value = false
    }

    // 新增用例文件夹(单个)
    const addFolder = (type)=>{
        const newCase = {
            children: [],
            id: null,
            caseType:2,
            name: emptyCase.name,
            parentId: currentCaseId.value,
            remark: emptyCase.remark,
            type: type,
        }
        updateCaseApi(newCase)
        if (type===0){
            addCaseFolder.value = false
        }else {
            addCaseDialog.value = false
        }
    }

    // 删除用例或文件夹
    const  delCase = (data)=>{
        commonUtils.messageBox(()=>{request.post("/api/webCase/delete/",data).then(res=>{
            caseListInit()
        })},"确定要删除吗？")
    }
    // 复制用例或文件夹
    const copyCase = (data)=>{
        request.post("/api/webCase/deepCopy",data).then(res=>{
            caseListInit()
        })
    }

    //_________________________________用例详情________________________________//
    // 当前操作的用例信息
    let currentCase = reactive({
        id:null,
        name:"",
        remark:"",
        parentId:0,
        type:0,
        children:[]
    })

    // 查看用例详情
    const showCaseInfo = (data)=>{
        if (data.type ===1){
            currentCase.name = data.name
            currentCase.remark = data.remark
            currentCase.id = data.id
            currentCase.parentId = data.parentId
            currentCase.type = data.type
            currentCase.children = data.children
            ActionInit()
            caseStepInit(data.id)
            caseInfoShow.value = true
            appOptionInit()
            phoneOpInit()
        }
    }

    // ----action-----//
    let caseInfoShow = ref(false)
    // action树状数据
    const actionTreeData = ref([])
    // 加载Action操作
    const ActionInit = ()=>{
        const payload =  {type:1}
        webApi.actionTree(payload,res=>{
            actionTreeData.value = res.data
        })
    }

    // addCaseStep 添加用例步骤
    const addCaseStep = (data)=>{
        // 单个空步骤
        if (caseStepList.value.length === 0){
            const caseStep = {
                actionId: data.id,
                actionSummary: data.actionKey,
                caseId: currentCase.id,
                elementId: null,
                id: null,
                sort: 1,
                status: 0,
                stepDescribe: data.name,
                actionValue:""
            }
            caseStepList.value.push(caseStep)
        }else {
            const caseStep = {
                actionId: data.id,
                actionSummary: data.actionKey,
                caseId: currentCase.id,
                elementId: null,
                id: null,
                sort: (caseStepList.value[caseStepList.value.length-1].sort)+1,
                status: 0,
                stepDescribe: data.name,
                actionValue:""
            }
            caseStepList.value.push(caseStep)
        }
    }

    // 删除用例步骤
    const delCaseStep = (data,index) =>{
        if (data.id!==null){
            commonUtils.messageBox(()=>{webApi.delCaseStep(data.id,res=>{
                caseStepList.value.splice(index,1)
            })})
        }else {
            caseStepList.value.splice(index,1)
        }
    }
    // 复制用例步骤
    const copyStep = (data)=>{
        console.log(caseStepList.value.length)
        const caseStep = {
            actionId: data.actionId,
            actionSummary: data.actionSummary,
            caseId: data.caseId,
            elementId: data.elementId,
            id: null,
            sort: caseStepList.value.length +1,
            status: data.status,
            stepDescribe: data.stepDescribe,
            actionValue:data.actionValue
        }
        caseStepList.value.push(caseStep)
    }

    // ----用例步骤-----//
    const  expandRow = ref([])

    // 用例步骤详情列表分页请求
    const appCaseListCh = (page)=>{
        const param = {"current":page,"size":caseStepPageSize.value}
        webApi.getCaseStep(CaseID.value,res=>{
            caseStepList.value = res.data.records
            caseStepListTotal.value = res.data.total
        },param)
    }
    // caseStepList 用例详情列表
    const caseStepList = ref([]);
    const caseStepListTotal = ref(0)
    const caseStepPageSize = ref(12)
    const CaseID = ref()
    const caseStepInit = (caseId)=>{
        CaseID.value = caseId
        const param = {"current":1,"size":caseStepPageSize.value}
        webApi.getCaseStep(caseId,res=>{
            caseStepList.value = res.data.records
            caseStepListTotal.value = res.data.total
        },param)
    }

    // elementOptionProp配置
    const elementOptionProp  = {
        children: 'children',
        label: 'name',
        value: 'id'
    }
    //----elementOption--元素 级联选择器
    const elementOption = ref([])

    // 断言方式
    const assertTypeOptions = ref([])

    const elementOptionInit = ()=>{
        const param = {"type":2}
        webApi.getElementOption(res=>{
            elementOption.value = res.data
        },param)
        webApi.assertType(res=>{
            assertTypeOptions.value = res.data
        })
    }

    // 保存用例详情
    const updateCaseInfo = ()=>{
        // 更新用例信息
        updateCaseApi(currentCase)
        // 级联选择器数据二次处理
        caseStepList.value.filter(item=>{
            if (item.elementId!==null && item.elementId!==undefined ){
                if (item.elementId.length !== undefined){
                    item.elementId = item.elementId[item.elementId.length-1]
                }
            }
        })
        // 保存用例步骤
        webApi.upWebCaseStepList(caseStepList.value,res=>{
            commonUtils.toast(res)
            caseStepInit(currentCase.id)
        })
    }
    // 文件上传
    const formData = ref(new FormData())
    const inputer =ref()
    const addFile = ()=>{
        let file = inputer.value.files[0]
        formData.value.append("file",file)
        request.post("/api/test/upload",formData.value)
    }

    //用例调试APP
    const execDevice = ref("")
    let appOption = ref([])
    const appOptionInit =()=>{
        webApi.appConfigOp(res=>{
            appOption.value = res.data
        })
    }

    // 用例调试手机
    const exec_phone = ref("")
    let phoneOp = ref([])
    const phoneOpInit = ()=>{
        webApi.phoneOpInit(res=>{
            phoneOp.value = res.data
            phoneOp.value.forEach((item,i)=>{
                if (item["status"] !== 0){
                    item["disabled"] = true
                }
            })
        })
    }

    // APP用例调试(服务端调试)
    const debugAppCase = (caseId,debugType)=>{
        if (execDevice.value === ""||exec_phone.value ===""){
            commonUtils.myToast("warning","请先连接手机或选择对应APP")
        }else {
            if (debugType === 1){
                commonUtils.getLocalIP.then(clientIp=>{
                    const payload = {
                        app:execDevice.value,
                        phone:exec_phone.value,
                        type:2,
                        debugType:debugType,
                        clientIp:clientIp
                    }
                    webApi.debugCase(caseId,payload,res=>{
                        commonUtils.toast(res)
                        if (res.code === "0"){
                            debugMsg.value = res.data.result
                            assertMsg.value = res.data.assert
                            showDebug.value = true
                        }
                    })
                })
            }else {
                const payload = {
                    app:execDevice.value,
                    phone:exec_phone.value,
                    type:2,
                    debugType:debugType,
                }
                webApi.debugCase(caseId,payload,res=>{
                    commonUtils.toast(res)
                    if (res.code === "0"){
                        debugMsg.value = res.data.result
                        assertMsg.value = res.data.assert
                        showDebug.value = true
                    }
                })
            }
        }
    }

    // 是否展示用例debug页面
    const showDebug = ref(false)
    // debugMsg
    const debugMsg = ref()
    const assertMsg = ref()

    //--------------------------------生命周期函数-------------------------------//
    onMounted(()=>{
        dragDiv_x("selenium-case","case-List","case-info","resize")
        dragDiv_y("case-info","info-top","Info-bottom","info-resize")
        initSort();
    })
    onUnmounted(()=>{
    })
    onBeforeMount(()=>{
        caseListInit()
        elementOptionInit()
    })

</script>

<style scoped>
    .page-app-case{
        padding-top: 80px;
        position: absolute;
        right: 30%;
    }
    #selenium-case{
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #case-List{
        position: absolute;
        width: 300px;
        height: 100%;
        left: 0;
        bottom: 0;
        overflow: auto;
    }
    #resize{
        cursor: ew-resize;
        position: absolute;
        left: 300px;
        bottom: 0;
        width: 5px;
        height: 100%;
        background: linear-gradient(90deg,#d6d4d4 0,#e9e7e7 50%,#d6d4d4);
    }
    /*拖拽区鼠标悬停样式*/
    #resize:hover {
        background: #409EFF;
    }
    #case-info{
        position: absolute;
        height: 100%;
        left: 310px;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: auto;
    }
    .caseInfo-top{
        position: absolute;
        display: flex;
        top: 0;
        width: 100%;
        height: 30px;
    }
    .caseInfo-total{
        height: 30px;
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
    }
    .caseInfo-action{
        position: absolute;
        height: calc(100% - 55px);
        top: 60px;
        bottom: 50px;
        width: 300px;
        border-right: 5px solid #d6d4d4;
    }
    .caseInfo-list{
        position: absolute;
        top: 60px;
        bottom: 100px;
        right: 0;
        left: 300px;
    }
    .caseList-top{
        position: absolute;
        top: 0;
        height: 40px;
        right: 0;
        left: 0;
    }
    .caseList-body{
        position: absolute;
        top: 40px;
        bottom: 0;
        right: 0;
        left: 0;
    }
    .caseInfo-top-item{
        padding-left: 10px;
    }
    .tree-node-right{
        position: absolute;
        right: 5px
    }
    .caseInfo-top{
        position: absolute;
        width: 100%;
        height: 80%;
    }
    #info-top{
        position: absolute;
        height: calc(100% - 33px);
        width: 100%;
    }
    #info-resize{
        z-index: 10;
        cursor: ew-resize;
        position: absolute;
        bottom: 33px;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg,#d6d4d4 0,#e9e7e7 50%,#d6d4d4);
    }
    #info-resize:hover {
        background: #409EFF;
    }
    #Info-bottom{
        background-color: #f0f5f5;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        overflow-y: scroll;
        min-height: 30px;
    }
    .showConsole{
        height: calc(100% - 40px);

    }
    #stepAssert{
        display: inline-flex;
        padding: 0 200px 0 200px;
        text-align: center;
        color: #111111;
        font-size: 14px;
    }
</style>