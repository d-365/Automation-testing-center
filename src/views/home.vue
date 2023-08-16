<!--测试平台首页-->
<template>
    <div class="homeBody">
        <div class="topCollect">
            <div class="topCollect-item"><my-card>
                <template v-slot:header>
                    <span style="font-weight: bolder">API自动化统计</span>
                </template>
                <template v-slot:body>
                    <div class="card-body">
                        <div>
                            <el-descriptions
                                    :column="3"
                                    direction="vertical"
                            >
                                <el-descriptions-item :label="apiAutoStatics.apiCount" align="center" label-class-name="card-label">
                                    <div style="border-right: #303133 solid 1px ;">
                                        <div class="item_value">Api用例数</div>
                                        <div class="item_value">本周新增：{{apiAutoStatics.newApiCount}} 个</div>
                                    </div>
                                </el-descriptions-item>
                                <el-descriptions-item :label="apiAutoStatics.caseCount" align="center" label-class-name="card-label">
                                    <div style="border-right: #303133 solid 1px ;">
                                        <div class="item_value">场景用例数</div>
                                        <div class="item_value">本周新增：{{apiAutoStatics.newCaseCount}} 个</div>
                                    </div>
                                </el-descriptions-item>
                                <el-descriptions-item :label="apiAutoStatics.planCount" align="center" label-class-name="card-label">
                                    <div>
                                        <div class="item_value">计划总数</div>
                                        <div class="item_value">本周新增：{{apiAutoStatics.newPlanCount}} 个</div>
                                    </div>
                                </el-descriptions-item>
                            </el-descriptions>
                        </div>
                        <div class="card_bottom">
                            <el-descriptions :column="2">
                                <el-descriptions-item  align="center" label-class-name="myDescriptions" label="当前定时任务数:">
                                    {{apiAutoStatics.clockCount}}
                                </el-descriptions-item>
                                <el-descriptions-item label-class-name="myDescriptions" align="center" label="定时总执行数:">
                                    {{apiAutoStatics.clockExecCount}}
                                </el-descriptions-item>
                                <el-descriptions-item label-class-name="myDescriptions" align="center" label="计划执行成功率:">
                                    {{apiAutoStatics.successRatio}}%
                                </el-descriptions-item>
                                <el-descriptions-item label-class-name="myDescriptions" align="center" label="计划执行失败率:">
                                    {{apiAutoStatics.failedRatio}}%
                                </el-descriptions-item>

                            </el-descriptions>
                        </div>
                    </div>
                </template>
            </my-card></div>
            <div class="topCollect-item"><my-card>
                <template v-slot:header>
                    <span style="font-weight: bolder">Web自动化统计</span>
                </template>
                <template v-slot:body>
                    <div class="card-body">
                        <div>
                            <el-descriptions
                                    :column="2"
                                    direction="vertical"
                            >
                                <el-descriptions-item :label="webAutoStatics.caseCount" align="center" label-class-name="card-label">
                                    <div style="border-right: #303133 solid 1px ;">
                                        <div class="item_value">用例数</div>
                                        <div class="item_value">本周新增：{{webAutoStatics.newCaseCount}} 个</div>
                                    </div>
                                </el-descriptions-item>
                                <el-descriptions-item :label="webAutoStatics.planCount" align="center" label-class-name="card-label">
                                    <div>
                                        <div class="item_value">测试计划总数</div>
                                        <div class="item_value">本周新增：{{webAutoStatics.newPlanCount}} 个</div>
                                    </div>
                                </el-descriptions-item>
                            </el-descriptions>
                        </div>
                        <div class="card_bottom">
                            <el-descriptions :column="2">
                                <el-descriptions-item  align="center" label-class-name="myDescriptions" label="当前定时任务数:">
                                    {{webAutoStatics.clockCount}}
                                </el-descriptions-item>
                                <el-descriptions-item label-class-name="myDescriptions" align="center" label="定时总执行数:">
                                    {{webAutoStatics.clockExecCount}}
                                </el-descriptions-item>
                                <el-descriptions-item label-class-name="myDescriptions" align="center" label="计划执行成功率:">
                                    {{webAutoStatics.successRatio}}%
                                </el-descriptions-item>
                                <el-descriptions-item label-class-name="myDescriptions" align="center" label="计划执行失败率:">
                                    {{webAutoStatics.failedRatio}}%
                                </el-descriptions-item>
                            </el-descriptions>
                        </div>
                    </div>
                </template>
            </my-card></div>
            <div class="topCollect-item"><my-card>
                <template v-slot:header>
                    <span style="font-weight: bolder">APP自动化统计</span>
                </template>
                <template v-slot:body>
                    <div class="card-body">
                        <div>
                            <el-descriptions
                                    :column="3"
                                    direction="vertical"
                            >
                                <el-descriptions-item :label="appAutoStatics.apiCount" align="center" label-class-name="card-label">
                                    <div style="border-right: #303133 solid 1px ;">
                                        <div class="item_value">APP页面元素数</div>
                                        <div class="item_value">本周新增：{{appAutoStatics.newApiCount}} 个</div>
                                    </div>
                                </el-descriptions-item>
                                <el-descriptions-item :label="appAutoStatics.caseCount" align="center" label-class-name="card-label">
                                    <div style="border-right: #303133 solid 1px ;">
                                        <div class="item_value">场景用例数</div>
                                        <div class="item_value">本周新增：{{appAutoStatics.newCaseCount}} 个</div>
                                    </div>
                                </el-descriptions-item>
                                <el-descriptions-item :label="appAutoStatics.planCount" align="center" label-class-name="card-label">
                                    <div>
                                        <div class="item_value">计划总数</div>
                                        <div class="item_value">本周新增：{{appAutoStatics.newPlanCount}} 个</div>
                                    </div>
                                </el-descriptions-item>
                            </el-descriptions>
                        </div>
                        <div class="card_bottom">
                            <el-descriptions :column="2">
                                <el-descriptions-item  align="center" label-class-name="myDescriptions" label="当前定时任务数:">
                                    {{appAutoStatics.clockCount}}
                                </el-descriptions-item>
                                <el-descriptions-item label-class-name="myDescriptions" align="center" label="定时总执行数:">
                                    {{appAutoStatics.clockExecCount}}
                                </el-descriptions-item>
                                <el-descriptions-item label-class-name="myDescriptions" align="center" label="计划执行成功率:">
                                    {{appAutoStatics.successRatio}}%
                                </el-descriptions-item>
                                <el-descriptions-item label-class-name="myDescriptions" align="center" label="计划执行失败率:">
                                    {{appAutoStatics.failedRatio}}%
                                </el-descriptions-item>

                            </el-descriptions>
                        </div>
                    </div>
                </template>
            </my-card></div>
        </div>
    </div>
    <div class="echartData">
        <div class="echartData-item1">
            <el-card>
                <slot name="body">
                    <myEcharts v-if="showPie" title="API自动化成功率" :legend="apiLegend" :xAxisData="xData" :yAxis="yAxis" :series="series"/>
                </slot>
            </el-card>
        </div>
        <div class="echartData-item2">
            <el-card>
                <slot name="body">
                    <myEcharts v-if="showPie" title="Web自动化成功率" :legend="apiLegend" :xAxisData="xData" :yAxis="yAxis" :series="webSeries"/>
                </slot>
            </el-card>
        </div>
    </div>
</template>

<script>
    import myCard from "../components/common/myCard";
    import request from "../utils/request";
    import {reactive,ref, toRefs} from "@vue/reactivity";
    import myEcharts from "../components/common/echarts/myEcharts";
    export default {
        components:{myCard,myEcharts},
        setup(props,content){
            // 加载首页统计数据
            let staticHomeData = reactive({
                // API自动化统计
                apiAutoStatics:{},
                apiLineChart:{},
                //web自动化统计
                webAutoStatics:{},
                webLineChart:{},
                //App自动化用例统计
                appAutoStatics:{},
            })
            let load =()=>{
                request.get("/api/statistics/home").then(res=>{
                    staticHomeData.apiAutoStatics = res.data.apiAutoStatics
                    staticHomeData.webAutoStatics = res.data.webAutoStatics
                    staticHomeData.appAutoStatics = res.data.appAutoStatics
                })
            }
            return {
                load,
                ...toRefs(staticHomeData)
            }
        },
        data () {
            return {
                xData :[],
                yAxis: [
                    {
                        type: 'value',
                        name: '',
                        min: 0,
                        max: 200,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} 个'
                        }
                    },
                ],
                series: [
                    {
                        name: '总用例',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '个';
                            }
                        },
                        data: []
                    },
                    {
                        name: '成功',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '个';
                            }
                        },
                        data: []
                    },
                    {
                        name: '失败',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' 个';
                            }
                        },
                        data: []
                    }
                ],
                apiLegend : ['总用例', '成功', '失败'],
                showPie: false,
                webSeries: [
                    {
                        name: '总用例',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '个';
                            }
                        },
                        data: []
                    },
                    {
                        name: '成功',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '个';
                            }
                        },
                        data: []
                    },
                    {
                        name: '失败',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' 个';
                            }
                        },
                        data: []
                    }
                ],
            }
        },
        methods:{
            loadLine(){
                request.get("/api/statistics/line").then(res=>{
                    // API 折线图统计
                    let  ApiLineData = res.data.apiLine
                    this.xData = Object.keys(ApiLineData).sort()
                    let values = []
                    for (let i = 0;i<this.xData.length;i++){
                        values.push(ApiLineData[this.xData[i]])
                    }
                    let count =[]
                    let success = []
                    let failed = []
                    for (let i = 0;i<this.xData.length;i++){
                        count.push(values[i]["count"])
                        success.push(values[i]["successCount"])
                        failed.push(values[i]["failedCount"])
                    }
                    this.series[0]["data"] = count
                    this.series[1]["data"] = success
                    this.series[2]["data"] = failed
                    this.showPie = true

                    // Web折线图统计
                    let WebLineData = res.data.webLine
                    let WebValues = []
                    for (let i = 0;i<this.xData.length;i++){
                        WebValues.push(WebLineData[this.xData[i]])
                    }
                    let WebCount =[]
                    let WebSuccess = []
                    let WebFailed = []
                    for (let i = 0;i<this.xData.length;i++){
                        WebCount.push(WebValues[i]["count"])
                        WebSuccess.push(WebValues[i]["successCount"])
                        WebFailed.push(WebValues[i]["failedCount"])
                    }
                    this.webSeries[0]["data"] = WebCount
                    this.webSeries[1]["data"] = WebSuccess
                    this.webSeries[2]["data"] = WebFailed
                })
            }
        },
        created() {
            this.load();
            this.loadLine();
        }
    }
</script>

<style scoped>

    .echartData-item1,.echartData-item2{
        box-shadow: 0 0 0 0 rgb(123,123,123);
    }
    .echartData-item1 ,.echartData-item2{
        margin-top:10px;
    }
    .echartData-item1:hover,.echartData-item2:hover{
        border-radius: 10px;
        box-shadow: 0 0 10px 2px rgb(0 0 0);
        transition: 0.3s;
    }

    .card-body{
        padding: 0 20px 10px 20px;
    }
    /deep/ .card-label{
        font-size: 40px;
        font-weight: 700;
        color: #303133;
        text-align: center;
    }
    .item_value{
        font-size:14px;
        color: #6f7577;
        padding-top: 10px;
    }
    .card_bottom{
        margin-top: 20px;
        padding: 20px 0 20px 0;
        border: 1px solid #ebeef5
    }
    /deep/.myDescriptions{
        font-size: 14px;
    }
    .echartData{
        padding: 20px 0 0 20px;
        display: flex;
    }
    .echartData-item1{
        width: calc(50vw - 150px);
        padding-left: 10px;
    }
    .echartData-item2{
        width: calc(50vw - 150px);
        padding-left: 10px;
    }
    .topCollect{
        display: flex;
    }
    .topCollect-item{
        padding-left: 20px;
    }
</style>