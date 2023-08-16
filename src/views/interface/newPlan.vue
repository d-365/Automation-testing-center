<template>
    <!--新增接口执行计划-->
    <div class="newPlan">
        <!--顶部按钮-->
        <div class="planTop">
            <el-row :gutter="2">
                <el-col :span="1">
                    <el-button type="primary" @click="viewBack()">返回</el-button>
                </el-col>
                <el-col :span="2">
                    &#12288<el-button @click="savePlan" type="primary">保存</el-button>
                </el-col>
            </el-row>
        </div>
        <!--计划详情-->
        <div class="planBody">
            <!--计划详情--左-->
            <div class="planLeft">
                <planInfo :planInfo="planDetail" ref="childRules"/>
            </div>
            <!--计划详情--右-->
            <div class="planRight">
                <el-tabs>
                    <el-tab-pane label="Api用例">
                        <category @finalCheckApi="checkedApi" :selectedID="planDetail.planParam.apiIds"/>
                    </el-tab-pane>
                    <el-tab-pane label="场景用例">
                        <MyTree  :treeList="treeList" @finalChecked="checkedCaseId" :selected-id="planDetail.planParam.caseIds"/>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!--隐藏的弹窗-->
        <div>
            <myAlter :backAlter="backAlter" >
                <template v-slot:title>
                    <span>确定要不保存直接返回吗?</span>
                </template>
            </myAlter>
        </div>

    </div>
</template>

<script>
    import {reactive, toRefs} from "@vue/reactivity";
    import myAlter from "../../components/myAlter";
    import planInfo from "../../components/plan/planInfo";
    import MyTree from "../../components/common/MyTree";
    import Category from "../common/category";
    import caseCategory from "../common/categoryList";
    import request from "../../utils/request";
    export default {
        name: "newPlan",
        components:{
            caseCategory,
            Category,
            myAlter,planInfo,MyTree
        },
        setup(){
            const hidden = reactive({
                planDetail_isChange:false
            })
            return {
                ...toRefs(hidden),
            }
        },
        data(){
            return{
                treeList:[],
                backAlter:false,
                // 计划详情
                planDetail:{
                    envId:null,
                    name:"",
                    tryCount:1,
                    isClock:0,
                    clock:"",
                    isSendEmail:0,
                    sendEmail:"",
                    planType:0,
                    planParam:{
                        apiIds:[],
                        caseIds:[]
                    }
                }
            }
        },
        watch:{
            // 计划详情
            planDetail:{
                handler(newVal, oldVal) {
                    this.planDetail_isChange = true
                },
                deep: true
            },
            '$route': 'getParams'
        },
        created() {
            this.load()
            this.getParams()
        },
        methods:{
            load(){
                request.get("/api/caseCategory/list").then(res=>{
                    this.treeList = res.data
                })
            },
            // 返回上一页
            viewBack(){
                if(this.planDetail_isChange === true){
                    this.backAlter = true
                    this.planDetail_isChange = false
                }else {
                    this.$router.push("/case/plan")
                }

            },
            // 保存计划
            savePlan(){
                //保存校验
                let flag = this.$refs['childRules'].validateForm();
                if(flag){
                    request.post("/api/plan/save",this.planDetail).then(res=>{
                        this.$root.toast(res)
                        this.$router.go(-1)
                    })
                }else{this.$message.error('保全信息不完整，请继续填写完整');}
            },
            // 获取选择的api列表
            checkedApi(data){
                let checked = []
                data.forEach((item,i)=>{
                    checked.push(item.id)
                })
                this.planDetail.planParam.apiIds = checked
            },
            // 获取选择的用例列表
            checkedCaseId(data){
                let checked = []
                data.forEach((item,i)=>{
                    checked.push(item.id)
                })
                this.planDetail.planParam.caseIds = checked

            },
            getParams(){
                // 取到路由带过来的参数
                const routerParams = this.$route.query.plan
                if(routerParams!==undefined){
                    this.planDetail =  JSON.parse(routerParams)
                }
            }
        }

    }
</script>

<style scoped>
    .planTop{
        height: 50px;
        width: calc(100vw - 200px);
        border: 1px solid #ebeef5;
        padding: 10px;
    }
    .planBody{
        height: calc(100vh - 120px);
        width: calc(100vw - 200px);
        border: 1px solid #ebeef5;
        padding: 10px;
        overflow: auto;
    }
    .planLeft{
        padding: 20px;
        border: 1px solid #ebeef5;
        width: calc(30vw);;
        height: calc(100vh - 150px);
        float: left;

    }
    .planRight{
        padding: 20px;
        border: 1px solid #ebeef5;
        height: calc(100vh - 150px);
        width: calc(70vw - 300px);;
        float: left;
    }

</style>