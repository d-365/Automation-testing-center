<template>
    <!--计划列表-->
    <div>
        <el-table :data="planList" border :header-cell-style="$root.tableHeaderStyle()" :cell-style="'text-align:center'">
            <el-table-column prop="name" label="任务名" width="150" />
            <el-table-column prop="planType" label="任务类型" width="150" >
                <template #default="scope">
                    <span v-show="scope.row.planType === 0">
                            <el-tag>接口自动化</el-tag>
                    </span>
                    <span v-show="scope.row.planType === 1">
                            <el-tag>Web自动化</el-tag>
                    </span>
                    <span v-show="scope.row.planType === 2">
                            <el-tag>App自动化</el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="定时状态" width="100" >
                <template #default="scope">
                   <el-tag v-if="scope.row.status === '0'" type="danger">暂停</el-tag>
                   <el-tag v-if="scope.row.status === '1'" type="success">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="clock" label="Clock表达式" width="150"/>
            <el-table-column prop="remark" label="备注"/>
            <el-table-column label="操作" >
                <template #default="scope">
                    <slot name="runCase" :data="scope.row">
                        <el-button size="small" type="primary" @click="runAlter = true"> 执行</el-button>
                        <!--执行确认弹窗-->
                        <el-dialog v-model="runAlter" title="温馨提示" width="20%" center>
                            <!-- 若自定义插槽内容为空，则显示mainTitle-->
                            <slot name="title">
                                <span>确定要执行吗?</span>
                            </slot>
                            <template #footer>
                          <span class="dialog-footer">
                            <el-button @click="runAlter = false">取消</el-button>
                            <el-button type="primary" @click="runPlan(scope.row)">确认</el-button>
                          </span>
                            </template>
                        </el-dialog>
                    </slot>
                    <el-button style="margin-left: 5px" v-if="scope.row.status ==='0' " size="small" type="danger" @click="suspended(scope.row,1)"><el-icon :size="13"><VideoPause/></el-icon>恢复</el-button>
                    <el-button  style="margin-left: 5px" v-if="scope.row.status ==='1' " size="small" type="success" @click="suspended(scope.row,0)"><el-icon :size="13"><VideoPlay/></el-icon>暂停</el-button>
                    <slot name="editCase" :data="scope.row">
                        <el-button size="small" type="info" @click="updatePlan(scope.row)"> 修改</el-button>
                    </slot>
                    <el-button size="small" type="danger" @click="delPlan(scope.row.id)"> 删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import request from "../../utils/request";
    import {VideoPlay,VideoPause} from "@element-plus/icons"
    import commonUtils from "../../utils/commonUtils";

    export default {
        name: "planList",
        components:{
            VideoPlay,VideoPause
        },
        props:{
            planList:{
                default : []
            }
        },
        data(){
            return{
                runAlter:false
            }
        },
        methods:{
            // 删除测试计划
            delPlan(planId){
                commonUtils.messageBox(res=>{
                    request.delete("/api/plan/delete/"+planId).then(res=>{
                        this.$root.toast(res)
                        this.$parent.load()
                    })
                })
            },
            // 修改测试计划
            updatePlan(data){
                this.$router.push({
                    path:"/case/newPlan",
                    query:{
                        plan:JSON.stringify(data)
                    }
                })
            },
            // 关闭/打开 自动化定时任务
            suspended(data,type){
                if(type === 0){
                    data.status = "0"
                }else {
                    data.status = "1"
                }
                request.post("/api/plan/save",data)
            },
            //执行计划
            runPlan(planInfo){
                request.post("/api/plan/runPlan",planInfo).then(res=>{
                })
                this.runAlter = false
                this.$root.my_toast()
                this.$router.push("/case/result")
            }
        }
    }
</script>

<style scoped>

</style>