<template>
        <el-collapse>
            <div>
                <el-collapse-item name="1">
                    <template #title>
                        <div class="myCollapse">Headers</div>
                    </template>
                    <div class="reqInfo" v-for="map in reqHeader">
                        <span v-if="map[0]!== undefined" style="font-size: 14px;color: #303133;font-weight: bolder"> {{map[0] +":"+ "&nbsp&nbsp" }} </span>
                        <span v-if="map[1]!== undefined">{{map[1]}}</span>
                    </div>
                </el-collapse-item>
            </div>
            <div style="padding-top: 10px">
                <el-collapse-item title="Params" name="2">
                    <template #title>
                        <div class="myCollapse">Params</div>
                    </template>
                    <div class="reqInfo" v-for="map in reqParams">
                        <span style="font-size: 14px;color: #303133;font-weight: bolder"> {{map[0] +":"+ "&nbsp&nbsp" }} </span>
                        <span>{{map[1]}}</span>
                    </div>
                </el-collapse-item>
            </div>
            <div style="padding-top: 10px">
                <el-collapse-item title="Body" name="3">
                    <template #title>
                        <div class="myCollapse">Body</div>
                    </template>

                    <div class="reqInfo" v-if="apiDetail.reqBodyType==='1'" v-for="map in reqBodyData">
                        <span style="font-size: 14px;color: #303133;font-weight: bolder"> {{map[0] +":"+ "&nbsp&nbsp" }} </span>
                        <span>{{map[1]}}</span>
                    </div>
                    <div class="reqInfo" v-if="apiDetail.reqBodyType==='2'">
                        <span > {{apiDetail.reqBodyJson}}</span>
                    </div>
                </el-collapse-item>
            </div>
        </el-collapse>
</template>

<script>
    export default {
        name: "debug_apiReqInfo",
        data(){
            return{
                reqHeader:null,
                reqParams:null,
                reqBodyData:null
            }
        },
        props:{
            apiDetail:{
                default:{
                    reqHeader:[{
                       "HeadersKey": "Content-Type",
                        "HeadersValue": "application/json"
                    }],
                    reqParams:[{"paramKey": null, "paramValue": null}],
                    reqBodyData: [{ "dataKey": null, "dataValue": null }]
                }
            }
        },
        watch:{
            // 监听数据内值是否发生变化
            "apiDetail.reqHeader":{
                handler(newVal, oldVal) {
                    let headerMap = new Map();
                    newVal.forEach((item,i)=>{
                        let headerKey = item.HeadersKey
                        let value = item.HeadersValue
                        headerMap.set(headerKey,value)
                    })
                    this.reqHeader = headerMap
                },
                deep: true
            },
            "apiDetail.reqParams":{
                handler(newVal, oldVal) {
                    let paramsMap = new Map();
                    newVal.forEach((item,i)=>{
                        let paramKey = item.paramKey
                        let paramValue = item.paramValue
                        if(paramKey !== undefined || paramValue !== undefined){
                            paramsMap.set(paramKey,paramValue)
                        }

                    })
                    this.reqParams = paramsMap
                },
                deep: true
            },
            "apiDetail.reqBodyData":{
                handler(newVal, oldVal) {
                    let dataMap = new Map();
                    newVal.forEach((item,i)=>{
                        let dataKey = item.dataKey
                        let dataValue = item.dataValue
                        if(dataKey !== undefined || dataValue !== undefined){
                            dataMap.set(dataKey,dataValue)
                        }
                    })
                    this.reqBodyData = dataMap
                },
                deep: true
            }

        },
    }
</script>

<style scoped>
    .myCollapse{
        background-color: #f2f2f2;
        width: 100%;
        height: 33px;
        text-align: left;
        font-size:15px;
        line-height:33px
    }
    .reqInfo{
        padding-left: 10px;
    }
</style>