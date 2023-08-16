<template>
    <div>
        <el-descriptions>
            <el-descriptions-item label="状态码:">
                <span>{{debugResponse.rspStatusCode}}</span>
            </el-descriptions-item>
            <el-descriptions-item  label="耗时:">
                {{debugResponse.rspTime}} ms
            </el-descriptions-item>
            <el-descriptions-item  label="大小:">
                {{debugResponse.rspBodySize}}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
    export default {
        name: "responseLine",
        props:{
            debugResponse:{
                default:{
                    result:false,
                    rspBodyJson:"",
                    rspHeaders:"",
                    textBody:"",
                    rspStatusCode:404,
                    rspTime:0,
                    rspBodySize:0,
                    rspAsserts:null,
                    rspExtract:null,
                    log:null
                },
            }
        },
        data(){
            return{

            }
        },
        methods:{

        },
    }
</script>

<style scoped>
    /deep/ .el-descriptions__label{
        color: #303133;
        font-size: 14px;
        font-weight: bold;
    }
    /deep/ .el-descriptions__content{
        color: #E6A23C;
        font-size: 14px;
        font-weight: bold;
    }
</style>