<template>
    <!--计划执行结果-->
    <div class="planResult">
        <!--筛选项-->
        <div class="planTop" style="font-size: 14px; color: #606266;font-weight:600">
            <el-row :gutter="2">
                <el-col :span="5">
                    计划名称：&#12288<el-input style="width: 200px" v-model="filterPlanResult.planName"></el-input>
                </el-col>
                <el-col :span="5">
                    任务状态：&#12288
                    <el-select v-model="filterPlanResult.resultStatus" placeholder="Select">
                        <el-option
                                v-for="item in filterOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    开始时间：&#12288
                    <el-date-picker
                            v-model="filterPlanResult.startTime"
                            type="date"
                            placeholder="Pick a Date"
                            format="YYYY/MM/DD"
                            value-format="YYYY-MM-DD"
                    >
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                    &#12288<el-button @click="filterPlanResultList()" type="primary">查询</el-button>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" @click="planResultListReSet()">重置</el-button>
                </el-col>
                <el-col :span="1" :push="1">
                    <el-button type="primary" :disabled="delDisabled" @click="delAlter= true">批量删除</el-button>
                </el-col>

            </el-row>
        </div>
        <!--计划列表-->
        <div class="planList">
            <planResultLists :planResultList="planResultList" @checkResultId="TableCheckResult">
                <template v-slot:api>0</template>
                <template v-slot:reportDetail="rowData">
                    <el-button size="small" type="primary" @click="planResultDetail(rowData)">详情</el-button>
                </template>
            </planResultLists>
        </div>
        <!--分页-->
        <div class="bottom">
            <pagination :total="planListTotal" @paging="paging"/>
        </div>
        <!--删除确认弹窗-->
        <el-dialog v-model="delAlter" title="温馨提示" width="20%" center>
            <!-- 若自定义插槽内容为空，则显示mainTitle-->
            <slot name="title">
                <span>确定要删除吗?</span>
            </slot>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="delAlter = false">取消</el-button>
                <el-button type="primary" @click="deletePlanResult()">确认</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from "../../components/common/pagination";
    import request from "../../utils/request";
    import planResultLists from "../../components/plan/planResultLists";
    export default {
        name: "planResult",
        components:{
            pagination,planResultLists
        },
        data(){
            return{
                // 当前页面过滤后的计划列表数量
                planListTotal:0,
                // 计划执行结果过滤
                filterPlanResult:{
                    planName:null,
                    resultStatus:null,
                    startTime:null

                },
                filterOption:[
                    {
                        value: 0,
                        label: '执行中',
                    },
                    {
                        value: 1,
                        label: "执行成功",
                    },
                    {
                        value: 2,
                        label: '执行失败',
                    },
                    {
                        value: 3,
                        label: '执行超时',
                    },
                ],
                // 计划执行结果列表,
                planResultList:[],
                // 已选择的计划结果id
                checkResultId:[],
                delDisabled:true,
                delAlter:false,
                currentPag:1
            }
        },
        methods:{
            // 查看报告详情
            planResultDetail(rowData){
                const  planResultId = rowData.data.id
                this.$router.push({
                    path: "/web/report",
                    query:{id:planResultId}
                })
            },
            // 初始化加载数据
            load_init(){
                this.filterPlanResult["page"] = this.currentPag
                this.filterPlanResult["planType"] = 1
                request.get("/api/planResult/list",
                    {
                        params:this.filterPlanResult
                    }
                ).then(res=>{
                    this.planResultList = res.data
                    this.planListTotal = res.total
                })
            },
            // 页面顶部筛选项查询
            filterPlanResultList(){
                this.load_init();
            },
            planResultListReSet(){
                this.filterPlanResult = {}
                this.load_init();
            },
            // 接收子组件 选中的 计划执行结果ID
            TableCheckResult(checkResult){
                this.delDisabled = false
                this.checkResultId = checkResult;
            },
            // 删除计划结果
            deletePlanResult(){
                request.post("/api/planResult/delPlanResult",this.checkResultId).then(res=>{
                    this.$root.toast(res)
                    this.checkResultId = []
                    this.load_init()
                })
                this.delAlter = false
            },
            //
            paging(data){
                this.currentPag = data
                this.load_init()
            }

        },
        created() {
            this.load_init()
        }
    }
</script>

<style scoped>
    .planTop{
        height: 50px;
        width: 100%;
        border: 1px solid #ebeef5;
        padding: 10px;
    }
    .planList {
        height: 100%;
        width: 100%;
        border: 1px solid #ebeef5;
        overflow: auto;
        padding: 20px;
    }
    .bottom{
        height: 10px;
        padding: 10px;
        text-align: center;
    }
</style>