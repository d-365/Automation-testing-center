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
                        <div class="api_statistics">
                            <pieTools v-if="showPie" :title="'api用例数据统计'" :series_name="'个数'" :legend_data="legend_data" :series_data="series_dataApi"/>
                        </div>
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
                            <div><el-badge :value="apiRunResult.length" type="primary" class="item">
                                <span>API用例</span>
                            </el-badge></div>
                        </template>
                        <ApiTree :TreeData="apiRunResult" :labelName="name" @apiInfo="reportApiInfo"/>
                    </el-tab-pane>
                    <el-tab-pane >
                        <template #label>
                            <div @click="reportTabsClick('display: none')">
                                <el-badge :value="caseRunResult.length" type="primary" class="item">
                                    <span >场景用例</span>
                                </el-badge>
                            </div>
                        </template>
                        <caseTree :TreeData="caseRunResult" labelName="categoryName"/>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="bottom-right" :style="showApiReportInfo">
                <responseLine :debugResponse="oneApiInfo"/>
                <debugApi_response :apiDetail="oneApiInfo" :debugResponse="oneApiInfo"/>
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
    export default {
        name: "planReport",
        components:{planReportTab,ApiTree,responseLine,debugApi_response,caseTree,pieTools},
        data() {
            return{
                showPie:false,
                series_dataCase:[],
                series_dataApi:[],
                legend_data:["成功","失败"],
                report_planResult:{},
                planResultId:null,
                apiRunResult:[],
                oneApiInfo:{},
                caseRunResult:[],
                showApiReportInfo:"display: none"
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
                    request.post("/api/planResult/report/"+this.planResultId).then(res=>{
                        this.report_planResult = res.data.planResult
                        this.apiRunResult= res.data.apiRunResult
                        this.caseRunResult = res.data.caseRunResult
                        let apiFailedCount = res.data.planResult.apiFailedCount
                        let apiSuccessCount = res.data.planResult.apiSuccessCount
                        let caseFailedCount = res.data.planResult.caseFailedCount
                        let caseSuccessCount = res.data.planResult.caseSuccessCount
                        this.series_dataApi.push({value:apiSuccessCount, name:'成功'})
                        this.series_dataApi.push({value:apiFailedCount, name:'失败'})
                        this.series_dataCase.push({value:caseSuccessCount, name:'成功'})
                        this.series_dataCase.push({value:caseFailedCount, name:'失败'})
                        this.showPie = true
                    })
                }
            },
            reportApiInfo(data){
                this.oneApiInfo = data
                this.showApiReportInfo = "display: block"
            },
            reportTabsClick(data){
                this.showApiReportInfo = data
            }
        },

    }
</script>

<style scoped>

    .top{
        height:30%;
        width: calc(100vw - 220px);
        overflow: auto;
        margin-left: 10px;
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

</style>