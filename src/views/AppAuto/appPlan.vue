<template>
    <!--计划列表-->
    <div class="plan">
        <!--筛选项-->
        <div class="planTop">
            <filterList @filterData="filterData"/>
        </div>
        <!--计划列表-->
        <div class="planList">
            <!--新增计划-->
            <div class="addPlan">
                <el-button @click="$router.push('/app/planDetail')">新增计划</el-button>
            </div>
            <!--计划列表-->
            <div class="list">
                <planList :planList="planList" >
                    <template v-slot:runCase="data">
                        <el-button type="primary" @click="runWebPlan(data.data)">运行</el-button>
                    </template>
                    <template v-slot:editCase="rowData">
                        <el-button size="small" type="info" @click="editCase(rowData)"> 修改</el-button>
                    </template>
                </planList>
            </div>
        </div>
        <!--分页-->
        <div class="bottom">
            <pagination :total="planList.length"/>
        </div>
    </div>
</template>

<script>
    import filterList from "../../components/plan/filterList";
    import planList from "../../components/plan/planList";
    import pagination from "../../components/common/pagination";
    import request from "../../utils/request";
    import {reactive, toRefs} from "@vue/reactivity";
    import commonUtils from "../../utils/commonUtils";
    import webApi from "../../views/WebAuto/webApi";
    import router from "../../router";

    export default {
        name: "appPlan",
        components:{
            filterList,planList,pagination
        },
        created() {
            this.load()
        },
        setup(){
            const params = reactive({
            })
            return{
                ...toRefs(params),
            }
        },
        data(){
            return{
                // 计划列表
                planList:[],
            }
        },
        methods:{
            // 初始化页面
            load(){
                // 计划列表
                const  payload = {planType:2}
                request.post("/api/plan/list",payload).then(res=>{
                    this.planList = res.data
                })
            },
            filterData(data){
                data.planType = 2
                request.post("/api/plan/list",data).then(res=>{
                    this.planList = res.data
                })
            },
            editCase(data){
                this.$router.push({
                    path:"/app/planDetail",
                    query:{
                        plan:JSON.stringify(data.data)
                    }
                })
            },
            // 执行App自动化计划
            runWebPlan(data){
                const planId = data.id
                commonUtils.messageBox(()=>{
                    webApi.execAppPlan(planId)
                    setTimeout(()=>{
                        // this.$router.push("/selenium/report")
                    },2000)
                },"确定要执行吗?")
            }
        },
    }
</script>

<style scoped>
    .planTop{
        height: 50px;
        width: 100%;
        border: 1px solid #ebeef5;
        padding: 10px;
    }
    .planList {
        height: 100%;
        width: 100%;
        border: 1px solid #ebeef5;
        overflow: auto;
        padding: 20px;
    }
    .list{
        padding-top: 20px;
    }
    .bottom{
        height: 10px;
        padding: 10px;
        text-align: center;
    }

</style>