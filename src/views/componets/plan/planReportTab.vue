<template>
    <!--计划详情-->
    <div>
        <el-descriptions :column="1" border>
            <el-descriptions-item
                    label="任务名称："
                    label-align="right"
                    align="center"
                    label-class-name="my-label"
                    class-name="my-content"
            >
                {{resultDetail.planName}}
            </el-descriptions-item>

            <el-descriptions-item label="开始时间：" label-align="right" align="center">
                {{resultDetail.startTime}}
            </el-descriptions-item>
            <el-descriptions-item label="耗时：" label-align="right" align="center">
                {{ totalTime+"ms"}}
            </el-descriptions-item>
            <el-descriptions-item label="用例总数：" label-align="right" align="center">
                {{caseCounts}}
            </el-descriptions-item>
            <el-descriptions-item label="用例通过率：" label-align="right" align="center">
                {{passRate + "%"}}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
    export default {
        name: "planReportTab",
        props:{
            resultDetail:{
                default:{
                    apiFailedCount: null,
                    apiSuccessCount: null,
                    caseFailedCount: null,
                    caseSuccessCount: null,
                    endTime: null,
                    id: null,
                    planId: null,
                    planName: null,
                    remark: null,
                    result: null,
                    resultStatus: null,
                    startTime: null,
                }
            }
        },
        data(){
            return{
            }
        },
        computed:{
            caseCounts: function(){
                return this.resultDetail.apiFailedCount + this.resultDetail.apiSuccessCount+this.resultDetail.caseSuccessCount+this.resultDetail.caseFailedCount
            },
            passRate:function () {
                let failed = this.resultDetail.apiFailedCount+this.resultDetail.caseFailedCount
                let success = this.resultDetail.apiSuccessCount+ this.resultDetail.caseSuccessCount
                if(success === 0){
                    return 0
                }
                if (failed === 0){
                    return 100
                }else if (success===0){
                    return 0.00
                }
                return  (failed / success).toFixed(2)
            },
            totalTime:function () {
                let startTime = new Date(this.resultDetail.startTime)
                let endTime = new Date(this.resultDetail.endTime)
                return  endTime - startTime
            }

        }

    }
</script>

<style scoped>
    /deep/ .my-label{
        width: 100px;
    }

</style>