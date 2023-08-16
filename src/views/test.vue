<template>
    <div id="testDemo">
        <myEcharts v-if="showChart"  title="轻易花订单对接趋势图" :legend="apiLegend" :xAxisData="xData" :yAxis="yAxis" :series="series"/>
    </div>
</template>

<script>

    import request from "../utils/request";
    import {onBeforeMount, reactive, ref} from "vue"
    import myEcharts from "../components/common/echarts/myEcharts";

    export default {
        components:{
            myEcharts
        },
        data(){
            return{
                showChart:false,
                series: [
                    {
                        name: '总对接',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '个';
                            }
                        },
                        data: []
                    },
                    {
                        name: 'CRM对接',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '个';
                            }
                        },
                        data: []
                    },
                    {
                        name: '展位对接',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' 个';
                            }},
                        data: []
                    }
                ],
                apiLegend: ['对接成功数', 'CRM', '展位'],
                yAxis: [
                    {
                        type: 'value',
                        name: '',
                        min: 0,
                        max: 120,
                        interval: 10,
                        axisLabel: {
                            formatter: '{value} 个'
                        }
                    }] ,
                xData : []
            }
        },
        methods:{
            getChartData(){
                request.get("/api/test/chart").then(res=>{
                    const  chartData = res.data
                    this.xData = Object.keys(chartData).sort()
                    let totalChart = []
                    let CRMChart = []
                    let BoothChart = []
                    this.xData.forEach((item,i)=>{
                        const charMap = chartData[item]
                        totalChart.push(charMap["total"])
                        CRMChart.push(charMap["crm"])
                        BoothChart.push(charMap["booth"])
                    })
                    this.series[0]["data"] = totalChart
                    this.series[1]["data"] = CRMChart
                    this.series[2]["data"] = BoothChart
                    this.showChart = true

                })
            }
        },
        created() {
            this.getChartData()
        }
    }

</script>

<style scoped>
    #testDemo{
        margin-top: 50px;
    }
</style>