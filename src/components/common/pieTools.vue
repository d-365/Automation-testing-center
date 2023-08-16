<template>
    <div class="pie">
        <div id="pie1">
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div id="main1"  ref="myPie" style="float:left;width:400px;height: 200px"></div>
        </div>
    </div>
</template>

<script>
    // import * as echarts from 'echarts';
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入饼状图组件
    require('echarts/lib/chart/pie')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require("echarts/lib/component/legend");

    export default {
        props:{
            // 主标题
            title:{
                default:"主标题"
            },
            // 图标刻印文字
            legend_data:{
                default: ['成功','失败'],
                type: Array
            },
            // 饼图悬浮文案
            series_name:{
                default:"series_name",
                type:String
            },
            // 饼图数据
            series_data:{
                default:[
                    {value:0, name:'成功'},
                    {value:0, name:'失败'},
                ],
                type:Array
            },
            // 饼图颜色
            color:{
                default:["#91cc75","#F56C6C"]
            }

        },
        created(){
        },
        data(){
            return {
                option:{
                    title : {
                        text: this.title,//主标题
                        // subtext: '个',//副标题
                        x:'center',//x轴方向对齐方式
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        top:20,
                        x:"right",
                        y:"top",
                        orient: 'vertical',
                        // bottom: 'center',
                        data: this.legend_data,
                    },
                    series : [
                        {
                            name: this.series_name,
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:this.series_data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                        }},
                    ],
                    color:this.color
                }
            }
        },
        mounted(){
            this.initData();
        },
        watch:{
            option:{
                handle(newVar, oldVar) {
                    this.series_data = newVar
                    this.initData();
                },
                deep:true
            }
        },
        methods:{
            //初始化数据
            initData() {
                let myChart = echarts.init(this.$refs.myPie);
                //数据为零时隐藏线段
                let data = this.series_data
                let opt = this.option.series[0];
                lineHide(opt);
                function lineHide(opt) {
                    data.forEach(function (item,i) {
                        if (item.value === 0) {
                            item.value = null
                        }
                    });
                }
                myChart.setOption(this.option,true);
            },
        }
    }
</script>