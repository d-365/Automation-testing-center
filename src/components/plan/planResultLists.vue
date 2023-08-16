<template>
    <!--计划列表-->
    <div>
        <el-table
                :data="planResultList" border
                :header-cell-style="$root.tableHeaderStyle()"
                @selection-change="handleSelectionChange"
                :cell-style="$root.tab_row_style()">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="planName" label="计划名称" width="200" />
            <el-table-column prop="resultStatus" label="运行状态" width="150" >
                <template #default="scope">
                    <span v-show="scope.row.resultStatus === 0">
                            <el-tag   type="warning">执行中</el-tag>
                    </span>
                    <span v-show="scope.row.resultStatus === 1">
                            <el-tag   type="success">执行成功</el-tag>
                    </span>
                    <span v-show="scope.row.resultStatus === 2">
                            <el-tag type="danger">执行失败</el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="api" label="Api用例" width="100" >
                <template #default="scope" >
                    <slot name="api" :data="scope.row">
                        <el-tag  type="success">{{scope.row.apiSuccessCount}}</el-tag>
                        <el-tag style="margin-left: 3px;" type="danger">{{scope.row.apiFailedCount}}</el-tag>
                    </slot>
                </template>
            </el-table-column>
            <el-table-column prop="case" label="场景用例" width="100" >
                <template #default="scope">
                    <el-tag type="success">{{scope.row.caseSuccessCount}}</el-tag>
                    <el-tag style="margin-left: 3px;" type="danger">{{scope.row.caseFailedCount}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="150" />
            <el-table-column prop="endTime" label="结束时间" width="150" />
            <el-table-column prop="remark" label="备注" width="200"/>
            <el-table-column label="操作" >
                <template #default="scope">
                    <slot name="reportDetail" :data="scope.row">
                        <el-button size="small" type="primary" @click="planResultDetail(scope.row.id)">详情</el-button>
                    </slot>

                    <el-button size="small" type="primary" @click="openDelAlter(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="delAlter" title="温馨提示" width="20%" center>
        <!-- 若自定义插槽内容为空，则显示mainTitle-->
        <slot name="title">
            <span>确定要删除吗?</span>
        </slot>
        <template #footer>
              <span class="dialog-footer">
                <el-button @click="delAlter = false">取消</el-button>
                <el-button type="primary" @click="delPlanResult()">确认</el-button>
              </span>
        </template>
    </el-dialog>

</template>

<script>
    import request from "../../utils/request";

    export default {
        name: "planResultLists",
        props:{
            planResultList:{
                default : []
            }
        },
        data(){
            return{
                delAlter:false,
                delCheckId:[]
            }
        },
        methods:{
            // 打开删除确认弹窗
            openDelAlter(checkId){
                this.delCheckId.push(checkId)
                this.delAlter = true
            },
            // 获取选中的计划执行结果Id
            handleSelectionChange(planResultTable){
                let checkResultId = []
                planResultTable.forEach((item,i)=>{
                    checkResultId.push(item.id)
                })
                this.$emit("checkResultId",checkResultId)
            },
            // 删除执行报告
            delPlanResult(){
                request.post("/api/planResult/delPlanResult",this.delCheckId).then(res=>{
                    this.$root.toast(res)
                    this.$parent.load_init()
                })
                this.delAlter = false
            },
            // 查看报告详情
            planResultDetail(planResultId){
                this.$router.push({
                    path: "/plan/report",
                    query:{id:planResultId}
                })
            }

        }
    }
</script>

<style scoped>

</style>