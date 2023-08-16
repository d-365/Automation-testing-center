<template>
    <div class="box" ref="box">
        <div class='left'>
                <category-list @caseInfo = "sonData_caseInfo" @category="sonData_category" />
            </div>
        <div class="resize" title="收缩侧边栏"></div>
        <div class='right' ref="rightCaseInfo" style="display: none">
            <div class="caseTop">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <div class="grid-content">
                            用例名称：<el-input v-model="sonCategory.categoryName" style="width: 300px"/>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content">
                            <el-button type="primary" @click="saveCase()" size="small">保存</el-button>
                        </div>
                    </el-col>
                    <el-col :span="3"  :pull="1">
                        <div class="grid-content">
                            <el-button type="warning" @click="debugCase()">调试</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <!--用例状态-->
                        <div class="grid-content">
                            用例状态：
                            <el-select v-model="caseInfo.caseType" clearable placeholder="Select">
                                <el-option
                                        v-for="item in apiType_select"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="grid-content">
                            用例等级：
                            <el-select v-model="caseInfo.caseGrade" clearable placeholder="Select">
                                <el-option
                                        v-for="item in caseGrade_select"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            责任人:  <el-input v-model="caseInfo.casePerson" style="width: 200px"/>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <div class="grid-content">
                            描述:<el-input v-model="sonCategory.remark" type="textarea"/>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="caseBody">
                <el-row :gutter="20" style="border: 1px solid #EEE;">
                    <!--添加参数-->
                    <el-badge :value="caseInfo.params.length" class="item" type="primary">
                        <el-col :span="2">
                            <div class="grid-content">
                                <el-popover placement="bottom-start" :width="400" trigger="click">
                                    <template #reference>
                                        <el-button  type="text" size="small">用例参数</el-button>
                                    </template>
                                    <el-table :data="caseInfo.params" :header-cell-style="this.$root.tabStyle()">
                                        <el-table-column prop="name" label="name">
                                            <template #header>
                                                <el-icon @click="caseInfo.params.push({})" style="color: #64ABF5"><Plus/></el-icon> name
                                            </template>
                                            <template #default="scope">
                                                <el-input v-model="scope.row.name"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="value" label="Value">
                                            <template #default="scope">
                                                <el-input v-model="scope.row.value"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="description" label="描述">
                                            <template #default="scope">
                                                <el-input v-model="scope.row.description"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="right" label="操作">
                                            <template #default="scope">
                                                <el-icon @click="caseInfo.params.splice(scope.$index,1)"><Delete/></el-icon>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-popover>
                            </div>
                        </el-col>
                    </el-badge>
                    <!--调试用例参数-->
                    <el-badge :value="0" class="item" type="primary">
                        <el-col :span="2" :push="1">
                            <div class="grid-content">
                                <el-popover placement="bottom-start" :width="400" trigger="click">
                                    <template #reference>
                                        <el-button type="text">调试用例参数</el-button>
                                    </template>
                                    <el-table :data="caseInfo.allParams">
                                        <el-table-column prop="key" label="key"/>
                                        <el-table-column prop="value" label="value"/>
                                    </el-table>
                                </el-popover>
                            </div>
                        </el-col>
                    </el-badge>
                    <!--迭代次数-->
                    <el-col :span="10" :push="1">
                            <div class="grid-content" >
                                迭代次数：
                                <el-input-number
                                        style="width: 80px"
                                        size="mini"
                                        v-model="caseInfo.loopCount"
                                        :min="1"
                                        :max="10"
                                        controls-position="right"
                                />
                            </div>
                        </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="1">
                        <div class="grid-content">
                            <el-button @click="addApiCaseDialog = true"  type="text" size="small">添加API用例</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="caseBottom">
                <el-table
                      :data="apiCase_relation"
                      border
                      style="width: 100%"
                      :header-cell-style="{background:'#F3F4F7',color:'#555'}"
                      :row-style="{fontSize:'13px',color:'#555',fontFamily:'MicrosoftYaHeiUI'}"
                      row-key="id"
                >
                    <el-table-column type="index" width="50" />
                    <el-table-column  label="Name" width="180">
                        <template #default="scope">
                            <el-button @click="apiDetail(scope.row.id,scope.row.apiId)" type="text" size="large">{{scope.row.apiInfo.name}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column  label="type" width="100">
                        <template #default="scope">
                            <el-tag  v-if="scope.row.type === 0">API引用</el-tag>
                            <el-tag v-else type="danger">API复制</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="URL" width="600" >
                        <template #default="scope">
                            <span v-if="scope.row.apiInfo !==  undefined ">
                                {{scope.row.apiInfo.domain}}
                                {{scope.row.apiInfo.path}}
                            </span>

                        </template>
                    </el-table-column>
                    <el-table-column label="操作" >
                        <template #default="scope">
                            <span v-if="scope.row.apiInfo !==  undefined ">
                                <div style="float: left">
                                    <el-switch
                                            v-model="scope.row.status"
                                            active-color="#13ce66"
                                    />
                                </div>
                                <div style="float: left;margin-left: 10px;border: 1px solid #dcdfe6">
                                     <el-icon @click="deleteCaseApiVisible = true"><Delete/></el-icon>
                                </div>
                                <!--删除用例对应的接口-->
                                    <el-dialog
                                            v-model="deleteCaseApiVisible"
                                            title="Tips"
                                            width="30%"
                                    >
                                        <span>此操作将永久删除该步骤, 是否继续?</span>
                                        <template #footer>
                                          <span class="dialog-footer">
                                            <el-button @click="deleteCaseApiVisible = false">关闭</el-button>
                                            <el-button type="primary" @click="deleteCaseApi(scope.$index,scope.row.id)">确认</el-button>
                                          </span>
                                        </template>
                                    </el-dialog>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="hide">
                <!--添加API用例对话框-->
                <el-dialog
                        v-model="addApiCaseDialog"
                        title="添加API用例"
                        width="50%"
                >
                    <div class="dialog_body">
                        <div id="dialog_left" style="float: left;height: 100%; width:40%; border: 1px solid #EEE">
                            <category @finalCheckApi="getCheckApi" :checkedApi="checkedApi"/>
                        </div>
                        <div id="dialog_right" style="float: right;height: 100%;width:60%; border: 1px solid #EEE">
                            <el-table :data="checkedApi" border style="width: 100%">
                                <el-table-column label="id" width="180">
                                    <template #default="scope">
                                        {{scope.$index +1}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="用例名称" width="180" />
                                <el-table-column  label="操作" >
                                    <template #default="scope">
                                        <el-icon @click="checkedApi.splice(scope.$index,1)" style="color: indianred"><Delete/></el-icon>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="addApiCaseDialog = false">关闭</el-button>
                        <el-button type="primary" @click="addCaseStep()">引用</el-button>
                      </span>
                    </template>
                </el-dialog>
                <!--接口详情-->
                <el-drawer
                    v-model="apiDetail_drawer"
                    title="测试步骤"
                    direction="rtl"
                    size="75%"
                >
                    <debug-api :apiId ="apiId"/>
                </el-drawer>
                <!--用例调试-->
                <el-drawer
                        v-model="debugCase_drawer"
                        title="用例调试"
                        direction="rtl"
                        size="90%"
                >
                    <div class="debugCase">
                        <div class="caseLeft" style="float: left;width: 30%;height: 100%">
                            <div class="caseInfo" style="height:15%;">
                                <caseInfo :caseCategory="sonCategory"/>
                            </div>
                            <div class="caseStep" style="height: 85%;">
                                <el-divider content-position="left">测试步骤</el-divider>
                                <caseStep :stepList="resStep" @stepIndex="apiIndex"/>
                            </div>
                        </div>
                        <div class="caseRight"
                             style="float: left;width: 70%;height: 100%;padding-left: 20px">
                            <div>
                                <ResponseLine :debugResponse="resStep[currentIndex]"/>
                                <DebugApi_response :apiDetail="resStep[currentIndex]" :debugResponse="resStep[currentIndex]"/>
                            </div>
                        </div>
                    </div>
                </el-drawer>
            </div>
        </div>
    </div>

</template>
<script>
    import categoryList from "../common/categoryList";
    import {reactive, toRefs} from "@vue/reactivity";
    import { Plus,Delete,DocumentCopy } from  "@element-plus/icons"
    import category from "../common/category";
    import Sortable from "sortablejs";
    import request from "../../utils/request";
    import debugApi from "./debugApi";
    import caseInfo from "../componets/case/debug/caseInfo";
    import caseStep from "../componets/case/debug/caseStep";
    import DebugApi_response from "../componets/api/debug/debugApi_response";
    import ResponseLine from "../componets/api/responseLine";
    export default {
        name:'testCase',
        inject:["reload"],
        components:{
            ResponseLine,
            DebugApi_response,
            categoryList,Plus,Delete,category,DocumentCopy,debugApi,caseInfo,caseStep
        },
        setup(){
            let state = reactive({

                caseGrade_select:[
                    {label:"P0",value:"P0"},
                    {label:"P1",value:"P1"},
                    {label:"P2",value:"P2"},
                    {label:"P3",value:"P3"}
                ],
                addApiCaseDialog:false,
                deleteCaseApiVisible:false,

            });
            // 控制元素隐藏展示
            const displayElement = reactive({
                //接口状态下拉框
                apiType_select:[
                    {label:"未完成",value:"未完成"},
                    {label:"已完成",value:"已完成"}
                ],
                //接口详情抽屉
                apiDetail_drawer:false,
                // 调试用例
                debugCase_drawer:false
            })
            return{
                ...toRefs(state),
                ...toRefs(displayElement)
            }
        },
        data(){
            return{
                // 当前接口Id
                apiId:null,
                // 用例分类数据
                sonCategory:{
                    categoryName:"",
                    remark:""
                },
                // 用例详情
                caseInfo:{
                    id: "",
                    caseType:"",
                    caseGrade:"",
                    casePerson:"",
                    loopCount: 1,
                    params:[],
                    allParams:[],
                    step:[]
                },
                // 已选择的用例
                checkedApi:[],
                //用例 接口关系
                apiCase_relation:[],
                //响应步骤
                resStep:[
                    {}
                ],
                ResponseLine: {},
                currentIndex:0
            }
        },
        watch:{
            'caseInfo.id'(caseId){
                this.$refs.rightCaseInfo.style.setProperty("display" ,"block")
                request.post("/api/case/caseApiDetail",caseId).then(res=>{
                    this.apiCase_relation = res.data
                })
            },
        },
        mounted() {
            this.dragControllerDiv();
            this.initSort()
        },
        methods:{
            //滑块
            dragControllerDiv: function () {
                const resize = document.getElementsByClassName('resize');
                const left = document.getElementsByClassName('left');
                const mid = document.getElementsByClassName('right');
                const box = document.getElementsByClassName('box');
                for (let i = 0; i < resize.length; i++) {
                    // 鼠标按下事件
                    resize[i].onmousedown = function (e) {
                        //颜色改变提醒
                        resize[i].style.background = '#818181';
                        const startX = e.clientX;
                        // 鼠标拖动事件
                        document.onmousemove = function (e) {
                            resize[i].left = startX;
                            const endX = e.clientX;
                            let moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
                            const maxT = (box[i].clientWidth - resize[i].offsetWidth) ; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
                            if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
                            if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px
                            resize[i].style.left = moveLen; // 设置左侧区域的宽度
                            for (let j = 0; j < left.length; j++) {
                                left[j].style.width = (moveLen/document.body.clientWidth)*100 + '%';
                                mid[j].style.width = ((box[i].clientWidth+200 - moveLen )/document.body.clientWidth - 0.008)*100 + '%';
                            }
                        };
                        // 鼠标松开事件
                        document.onmouseup = function (evt) {
                            //颜色恢复
                            resize[i].style.background = '#d6d6d6';
                            document.onmousemove = null;
                            document.onmouseup = null;
                            resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
                        };
                        resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
                        return false;
                    };
                }
            },
            //接收子组件值(category)
            sonData_category(data){
                this.sonCategory = data
            },
            sonData_caseInfo(data){
                if(data.params===null){
                    data.params= []
                }
                this.caseInfo = data
            },
            // 接收子组件值(已选择用例)
            getCheckApi(data){
                this.checkedApi= data
            },
            // 行拖拽
            initSort() {
                const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
                const sortable = new Sortable(el, {
                    animation: 1000,
                    onEnd: (evt) => { // 监听拖动结束事件
                        // 这里就可以写我们需要传给后台的逻辑代码
                        // 我们有了 evt.oldIndex 和 evt.newIndex 这两个参数做索引，我们可以根据绑定在表格上面的 data 这个 Array 找到两个相应的记录。就可以针对数据进行操作啦。
                        // 下面将拖拽后的顺序进行修改
                        const currRow = this.apiCase_relation.splice(evt.oldIndex, 1)[0]
                        this.apiCase_relation.splice(evt.newIndex, 0, currRow)
                        const newData = []
                        const apiIdList = []
                        this.apiCase_relation.forEach((item, index) => {
                            newData[index] = {
                                id: item.id,
                                number: index+1,
                                caseId: item.caseId,
                                apiId: item.apiId,
                                apiInfo: item.apiInfo,
                                status: item.status
                            }
                            apiIdList[index] = item.apiId
                        })
                        // 保存 接口用例关联信息
                        this.apiCase_relation = newData
                        request.post("/api/case/apiCase",newData).then(res=>{
                            if(res.code ==="1"){
                                this.$message({
                                    type:"error",
                                    message:res.msg
                                })
                            }else {
                                this.$message({
                                    type:"success",
                                    message:"保存成功"
                                })
                            }
                        })
                    }
                })
            },
            // 将接口和用例进行关联(传入接口分类ID)
            addCaseStep(){
                //分类ID
                let checkedApiId = [], i
                this.checkedApi.forEach((item,i)=>{
                    checkedApiId.push(item.id)
                })
                request.post("/api/case/relation",checkedApiId).then(res=>{
                    for(i =0; i < res.data.length;i++){
                        if(this.apiCase_relation[i] === undefined){
                            this.apiCase_relation.push({id:null, apiId:null, caseId:null, status: true, apiInfo:null,number:i+1,type:0})
                        }
                        this.apiCase_relation[i].caseId = this.caseInfo.id
                        this.apiCase_relation[i].apiId = res.data[i].id
                        this.apiCase_relation[i].apiInfo = res.data[i]
                        this.apiCase_relation[i].status = true
                        this.apiCase_relation[i].number = i+1
                        this.apiCase_relation[i].type = 0; // 引用
                    }

                })
                this.addApiCaseDialog = false
            },
            // 保存用例信息
            saveCase(){
                this.caseInfo.params.forEach((item,i)=>{
                    let arr = Object.keys(item)
                    if(arr.length === 0){
                        this.caseInfo.params.splice(i,1)
                    }
                })
                // 保存用例标题信息
                request.post("/api/caseCategory/add",this.sonCategory).then(res=>{})
                // 保存用例基本信息
                request.post("/api/case/update",this.caseInfo).then(res=>{})
                // 保存 接口用例关联信息

                request.post("/api/case/apiCase",this.apiCase_relation).then(res=>{
                    if(res.code ==="1"){
                        this.$message({
                            type:"error",
                            message:res.msg
                        })
                    }else {
                        this.$message({
                            type:"success",
                            message:"保存成功"
                        })
                    }
                })

            },
            //删除用例对应的接口
            deleteCaseApi(index,CaseApiID){
                this.apiCase_relation.splice(index,1)
                request.delete("/api/case/deleteCaseApi/"+CaseApiID).then(res=>{})
                this.deleteCaseApiVisible = false
            },
            // 接口详情
            apiDetail(relationId,apiId){
                this.apiDetail_drawer = true
                this.apiId = apiId
            },
            // 调试运行用例
            debugCase(){
                this.debugCase_drawer = true
                // 将列表用例赋值给用例中的step
                let newStep = [];
                this.apiCase_relation.filter((item,i)=>{
                    newStep.push(item.apiInfo)
                })
                this.caseInfo.step = newStep
                let envId = localStorage.getItem("envId")
                request.post("/api/case/debugCase/"+envId,this.caseInfo).then(res=>{
                    this.resStep = res.data.step
                    this.ResponseLine = res.data.step
                })
            },
            apiIndex(data){
                this.currentIndex = data
            }
        },
    }
</script>
<style scoped>
    .left {
        width: 20%;
        height:100%;
        overflow-y:auto;
        overflow-x:hidden;
        float: left;
    }
    .resize {
        cursor: col-resize;
        float: left;
        position: relative;
        background-color: #d6d6d6;
        border-radius: 5px;
        width: 2px;
        height: 100%;
        background-size: cover;
        background-position: center;
        font-size: 32px;
        color: white;
    }
    /*拖拽区鼠标悬停样式*/
    .resize:hover {
        color: #444444;
    }
    .right {
        height:100%;
        overflow: auto;
        float: right;
        width:calc(80% - 5px);
    }
    .box {
        width: 100%;
        height: 98%;
        overflow: hidden;
        box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);
    }
    /*用例详情*/
    .caseTop{
        border: 1px solid #EEE;
        width: 100%;
        height: 20%;
        padding:10px 30px;
        font-size: 13px;
        font-weight: 600;
        color: #494848;
    }
    .caseBody{
        border: 1px solid #EEE;
        width: 100%;
        height: 10%;
        padding:5px 10px;
        font-size:13px;
        color: #64ABF5;
    }
    .caseBottom{
        border: 1px solid #EEE;
        width: 100%;
        height: 65%;
        padding:10px 10px;

    }

    .dialog_body{
        height: 500px;
        overflow:auto;
    }
    .collapse-title {
        flex: 1 0 90%;
        order: 1;
    }
    .el-collapse-item__header {
        flex: 1 0 auto;
        order: -1;
    }


</style>