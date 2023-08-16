<template>
<!--计划详情-->
    <div>
        <el-form
                label-position="left"
                :model="planInfo"
                style="max-width: 460px"
                :rules="rules"
                ref="ruleForm"
        >
            <el-form-item label="任务名" prop="name">
                <el-input v-model="planInfo.name" placeholder="请输入任务名"></el-input>
            </el-form-item>
            <el-form-item label="环境">
                <domainOption :currentEnvId="planInfo.envId" @newEnvId="newEnvId"/>
            </el-form-item>
            <slot name="form-item"></slot>
            <el-form-item label="重试次数">
                <el-input-number v-model="planInfo.tryCount" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="是否开启定时">
                <el-radio-group v-model="planInfo.isClock">
                    <el-radio :label="0" >否</el-radio>
                    <el-radio :label="1" >是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="clock" label="Cron表达式" v-if="planInfo.isClock === 1">
                <el-input  v-model="planInfo.clock"  placeholder="点击设置定时任务"></el-input>
            </el-form-item>
            <el-form-item label="是否发送邮件">
                <el-radio-group v-model="planInfo.isSendEmail">
                    <el-radio :label="0" >否</el-radio>
                    <el-radio :label="1" >是</el-radio>
                    <el-radio :label="2" >仅失败发送</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="sendEmail" label="邮件接收人" v-if="planInfo.isSendEmail !== 0">
                <el-input v-model="planInfo.sendEmail" placeholder="多个接收人用 ; 分开"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="planInfo.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import domainOption from "../api/domainOption";
    export default {
        name: "planInfo",
        components:{
            domainOption
        },
        props:{
            // 计划详情
            planInfo:{
                default:{
                    name:"",
                    tryCount:1,
                    isClock:0,
                    clock:"",
                    isSendEmail:0,
                    sendEmail:"",
                    planParam:{
                        apiIds:[],
                        caseIds:[]
                    }
                },
                type:Map
            }
        },
        data(){
            return{
                rules:{
                    name: [
                        {
                            required: true,
                            message: '请输入任务名',
                            trigger: 'blur',
                        },
                        {
                            min: 3,
                            max: 20,
                            message: 'Length should be 3 to 20',
                            trigger: 'blur',
                        },
                    ],
                    clock: [
                        {
                            required: true,
                            message: '请设置定时任务',
                            trigger: 'blur',
                        },
                        {
                            min: 1,
                            max: 100,
                            message: '最少1位有效字段',
                            trigger: 'blur',
                        },
                    ],
                    sendMail: [
                        {
                            required: true,
                            message: '请设置邮件接收人',
                            trigger: 'blur',
                        },
                        {
                            min: 1,
                            max: 100,
                            message: '最少1位有效字段',
                            trigger: 'blur',
                        },
                    ],
                }
            }
        },
        methods:{
            //子组件校验，传递到父组件
            validateForm () {
                let flag = null
                this.$refs['ruleForm'].validate(valid => {
                    flag = !!valid;
                })
                return flag
            },
            // 获取修改环境ID
            newEnvId(data){
                this.planInfo.envId = data
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-form-item__label{
        color: #494848;
        font-size: 13px;
        font-weight:600
    }
</style>