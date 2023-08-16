<template>
    <div class="r-echarts-line">
        <div id="myEchArt" ref="myEchArt" style="height:400px;"></div>
    </div>
</template>
<script>
    let echarts = require('echarts/lib/echarts')
    import {
        TitleComponent,
        ToolboxComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent
    } from 'echarts/components';
    import { BarChart, LineChart } from 'echarts/charts';
    import { UniversalTransition } from 'echarts/features';
    import { CanvasRenderer } from 'echarts/renderers';
    echarts.use([
        TitleComponent,
        ToolboxComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        BarChart,
        LineChart,
        CanvasRenderer,
        UniversalTransition
    ]);
    export default {
        name: '',
        props:{
                title: {
                    type: Object || String // 标题，可以只传入标题，其他属性使用默认值，也可自定义title属性，默认无标题
                },
                theme: {
                    type: String // dom参数属性，传入theme字符串，theme暂时支持dark和light两种，默认light
                },
                width: String, // dom的宽度，默认600
                height: String, // dom的高度，默认400
                legend: {
                    required: true, // 必传，图表上方标识每个颜色柱/线代表什么意思
                    type: Array,
                    default:['legend1', 'legend2', 'legend3']
                },
                xAxisData:{
                    default: []
                },
                yAxis:{
                    default:[
                        {
                            type: 'value',
                            name: '',
                            min: 0,
                            max: 250,
                            interval: 50,
                            axisLabel: {
                                formatter: '{value} 个'
                            }
                        },
                    ]
                },
                series:{
                    default:[
                        {
                            name: 'legend1',
                            type: 'line',
                            tooltip: {
                                valueFormatter: function (value) {
                                    return value + ' ml';
                                }
                            },
                            data: [
                                2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                            ]
                        },
                        {
                            name: 'legend2',
                            type: 'line',
                            tooltip: {
                                valueFormatter: function (value) {
                                    return value + ' ml';
                                }
                            },
                            data: [
                                2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                            ]
                        },
                        {
                            name: 'legend3',
                            type: 'line',
                            tooltip: {
                                valueFormatter: function (value) {
                                    return value + ' °C';
                                }
                            },
                            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                        }
                    ]
                }
        },
        data() {
            // 默认title属性
            let baseTitle = {
                text: '', // 主标题
                subtext: '', // 副标题
                textStyle: {
                    // 文字颜色
                    color: '#000000',
                    // 字体风格,'normal','italic','oblique'
                    fontStyle: 'normal',
                    // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                    fontWeight: 'bold',
                    // 字体系列
                    fontFamily: 'sans-serif',
                    // 字体大小
                    fontSize: 18
                }
            }
            const tempTitle = this.title
            if (typeof (this.title) === 'string') {
                baseTitle.text = tempTitle
            } else if (typeof (tempTitle) === 'object') {
                if (tempTitle.text) {
                    baseTitle.text = tempTitle.text
                }
                if (tempTitle.subtext) {
                    baseTitle.subtext = tempTitle.subtext
                }
                if (tempTitle.left) {
                    baseTitle.left = tempTitle.left
                }
                if (tempTitle.textStyle) {
                    // 标题字体颜色
                    if (tempTitle.textStyle.color) {
                        baseTitle.textStyle.color = tempTitle.textStyle.color
                    }
                    // 字体风格,'normal','italic','oblique'
                    if (tempTitle.textStyle.fontStyle) {
                        baseTitle.textStyle.fontStyle = tempTitle.textStyle.fontStyle
                    }
                    // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                    if (tempTitle.textStyle.fontWeight) {
                        baseTitle.textStyle.fontWeight = tempTitle.textStyle.fontWeight
                    }
                    // 字体系列
                    if (tempTitle.textStyle.fontFamily) {
                        baseTitle.textStyle.fontFamily = tempTitle.textStyle.fontFamily
                    }
                    // 字体大小
                    if (tempTitle.textStyle.fontSize) {
                        baseTitle.textStyle.fontSize = tempTitle.textStyle.fontSize
                    }
                }
            }
            // 默认toolbox值
            let baseToolbox = {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            }

            return {
                titleProperty: baseTitle, // title属性值
                toolboxProperty: baseToolbox,// toolbox属性

            }
        },
        methods: {
            setEchArt(){
                let myChart = echarts.init(this.$refs.myEchArt);
                let option = {
                    // 标题
                    title: this.titleProperty,
                    // 悬浮显示
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    // 工具组件
                    toolbox: this.toolboxProperty ,
                    // 图例组件
                    legend: {
                        data:this.legend
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.xAxisData,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: this.yAxis,
                    series: this.series
                };
                myChart.setOption(option);
            }
        },
        mounted() {
            this.setEchArt()
        },
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>
