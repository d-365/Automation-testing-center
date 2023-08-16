<template>
    <!--计划运行结果详情页-->
    <div class="reportDetail">
        <div class="top">
            <el-collapse model-value="first"  accordion>
                <el-collapse-item name="first">
                    <template #title>
                        <span style="font-size: 13px;color: #303133;font-weight: bold">测试报告概述</span>
                    </template>
                    <div class="top-left">
                        <planReportTab :resultDetail="report_planResult"/>
                    </div>
                    <!--饼图-->
                    <div class="top-right">
                        <div class="case_statistics">
                            <pieTools v-if="showPie" :title="'场景用例数据统计'" :series_name="'个数'" :legend_data="legend_data" :series_data="series_dataCase"/>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="bottom">
            <div class="bottom-left">
                <el-tabs>
                    <el-tab-pane >
                        <template #label>
                            <div><el-badge :value="caseRunResult.length" type="primary" class="item">
                                <span>自动化场景用例</span>
                            </el-badge></div>
                        </template>
                        <ApiTree :TreeData="caseRunResult" labelName="caseName" @apiInfo="reportInfo"/>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="bottom-right" :style="showReportInfo">
                <el-tabs>
                    <el-tab-pane label="用例信息">
                        <div id="caseDataStep">
                            <el-table :data="caseDataStep" style="width: 100%" :header-cell-style="commonUtils.tabRowStyle('left')" :row-style="commonUtils.tabRowStyle('left')">
                                <el-table-column type="expand">
                                    <template #default="props">
                                        <div id="assert-detail" v-if="props.row.assertType !==null">
                                            <el-tag >断言方式:{{props.row.assertType}}</el-tag>
                                            <el-tag >断言值:{{props.row.assertValue}}</el-tag>
                                        </div>

                                    </template>
                                </el-table-column>
                                <el-table-column prop="sort" label="步骤ID">
                                    <template #default="scope">
                                        {{scope.row.id}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="stepDescribe" label="步骤描述" width="180" />
                                <el-table-column prop="actionSummary" label="操作描述" />
                                <el-table-column prop="elementId" label="操作元素" />
                                <el-table-column prop="actionValue" label="操作值" />
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane  label="用例执行信息">
                        <div class="web-case-console">
                            <div v-for="(item,i) in consoleData">
                                <div v-if="item.code ===0" style="color: #67C23A;font-weight: bold">{{i+1}}
                                    <el-tag type="success">success</el-tag>
                                </div>
                                <div v-if="item.code ===1" style="color: #F56C6C;font-weight: bold">{{i+1}}
                                    <el-tag type="danger">success</el-tag>
                                </div>
                                <div>{{item.msg}}</div>
                                <div style="height: 20px"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="断言结果">
                        <div id="webCase-assert">
                            <el-table :data="assertConsole" style="width: 100%" :header-cell-style="commonUtils.tabRowStyle('left')" :row-style="commonUtils.tabRowStyle('left')">
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
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import pieTools from "../../components/common/pieTools";
    import caseTree from "../componets/plan/caseTree";
    import planReportTab from "../componets/plan/planReportTab";
    import ApiTree from "../componets/plan/ApiTree";
    import request from "../../utils/request";
    import responseLine from "../componets/api/responseLine";
    import debugApi_response from "../componets/api/debug/debugApi_response";
    import commonUtils from "../../utils/commonUtils";
    import {ref} from "vue";
    import webApi from "./webApi";
    export default {
        name: "planReport",
        components:{planReportTab,ApiTree,responseLine,debugApi_response,caseTree,pieTools},
        data() {
            return{
                commonUtils:commonUtils,
                showPie:false,
                series_dataCase:[],
                legend_data:["成功","失败"],
                report_planResult:{},
                planResultId:null,
                caseRunResult:[],
                showReportInfo:"display: none",
                // 用例执行结果控制台信息
                consoleData:[],
                // 用例执行步骤信息
                caseDataStep:[],
                assertConsole:[],
                assertTypeOptions :[]
            }
        },
        watch:{
            $route: "getRouterParam",
        },
        created() {
            this.getRouterParam()
        },
        methods:{
            // 获取当前路由参数,解析报告
            getRouterParam(){
                this.planResultId = this.$route.query.id
                // 加载当前计划执行报告
                if (this.planResultId!==undefined){
                    request.post("/api/planResult/web/report/"+this.planResultId).then(res=>{
                        this.report_planResult = res.data.planResult
                        this.caseRunResult = res.data.caseRunResult
                        let caseFailedCount = res.data.planResult.caseFailedCount
                        let caseSuccessCount = res.data.planResult.caseSuccessCount
                        this.series_dataCase.push({value:caseSuccessCount, name:'成功'})
                        this.series_dataCase.push({value:caseFailedCount, name:'失败'})
                        this.showPie = true
                    })
                }
                webApi.assertType(res=>{
                    this.assertTypeOptions = res.data
                })
            },
            reportInfo(data){
                this.assertConsole = data.assertResult
                this.caseDataStep = data.caseSteps
                this.consoleData = data.resultConsole
                this.showReportInfo = "display: block"
            },
            reportTabsClick(data){
                this.showReportInfo = data
            }
        },
    }
</script>

<style scoped>
    #caseDataStep{
        position: relative;
        overflow: auto;
        height: 500px;
    }
    .web-case-console{
        position: relative;
        color: white;
        background-color: #111111;
        height: 550px;
        overflow: auto;
        right: 10px;
        padding: 10px 0 0 10px;
    }
    #webCase-assert{
        position: relative;
        overflow: auto;
        height: 500px;
    }
    .top{
        height:30%;
        width: calc(100vw - 220px);
        overflow: auto;
        margin-left: 10px;
        right: 10px;
        border-bottom: 1px solid #dcdfe6;
    }
    .bottom{
        height: 60%;
        width: calc(100vw - 220px);
        overflow: auto;
        margin-left: 10px;
        padding-top: 10px;
    }
    .top-left{
        float: left;
        height: 100%;
        width: 30%;
        overflow: auto;
    }
    .top-right{
        float: left;
        height: 100%;
        width: 70%;
        overflow: auto;
    }
    .bottom-left{
        float: left;
        height: 100%;
        width: 30%;
        overflow: auto;

    }
    .bottom-right{
        float: left;
        height: 100%;
        width: 70%;
        overflow: auto;
    }
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
    #assert-detail{
        text-align: center;
    }

</style>