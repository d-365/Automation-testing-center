<template>
    <el-tabs model-value="new" :tab-position="tabPosition" style="height: 100%">
        <el-tab-pane label="CRM" name="new">
            <template #label>
                <span>
                    <el-icon><Edit /></el-icon> 新系统验证码
                </span>
            </template>
            <div class="tabs-body">
                <!--填单--循环-->
                <div class="tmk_span">
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>轻易花后台项目</span>
                                <el-button class="button" type="text" @click="updateSmsCode">重置</el-button>
                            </div>
                        </template>
                        <div class="card-body">
                            <el-row>
                                <el-input v-on:blur="check_count($event)" v-model="phone" style="width: 200px" placeholder="请输入手机号" maxlength="11"/>
                                <el-input v-model="smsCode" style="padding: 0 20px;width: 150px" placeholder="验证码" maxlength="6"/>
                            </el-row>
                            <el-row>
                                <div style="float: left;padding: 10px 0">
                                    <el-button @click="querySmsCode" type="primary" size="medium">查询</el-button>
                                </div>
                            </el-row>
                            <el-row>
                                <div ref="loopSMSCode" style="display:none;padding-top: 20px">
                                    <el-descriptions :column="2" border>
                                        <el-descriptions-item align="center" label="CRM" width="100px">{{allCode.CRM}}</el-descriptions-item>
                                        <el-descriptions-item align="center" label="DRK" width="100px">{{allCode.DRK}}</el-descriptions-item>
                                        <el-descriptions-item align="center" label="QS" width="100px">{{allCode.QS}}</el-descriptions-item>
                                    </el-descriptions>
                                </div>
                            </el-row>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
    import { Edit } from "@element-plus/icons"
    import {ref,reactive,onBeforeMount,computed} from "vue"
    import commonUtils from "../../utils/commonUtils";
    import toolsApi from "./toolsApi";

    // ----------------- 通用字段处理
    const  tabPosition =  ref("left")
    // -----------------  验证码字段
    const  allCode = reactive({
        CRM:null,
        DRK:null,
        QS: null
    })
    const  phone = ref(null)
    const  smsCode = ref(123456)
    const  loopSMSCode = ref()
    // 手机号校验
    const check_count= (event)=> {
        const value = event.target.value;
        if (!/^\+?[1-9][0-9]/.test(value) || value.length!==11) {
            event.target.placeholder = "手机号输入不合法"
            event.target.value = '';
        }
    }
    // 查询手机号验证码
    const querySmsCode =()=>{
        if (phone.value === null){
            commonUtils.myToast("error","手机号不能为空 ！")
        }else {
            const payload = {
                "phone": phone.value,
                "type": 0
            }
            toolsApi.querySmsCode(payload,res=>{
                if (res.code === "0"){
                    allCode.CRM = res.data.crm
                    allCode.DRK = res.data.drk
                    allCode.QS = res.data.qs
                }
                loopSMSCode.value.style.setProperty("display" ,"block")
                commonUtils.toast(res)
            })
        }
    }
    // 修改手机号验证码
    const updateSmsCode = ()=>{
        commonUtils.messageBox(res=>{
            if (phone.value == null || smsCode.value == null){
                commonUtils.myToast("error","手机号或验证码不能为空 ！")
            }else {
                const payload = {
                    "phone": phone.value,
                    "smsCode":smsCode.value,
                    "type": 0
                }
                toolsApi.updateSmsCode(payload,res=>{
                    if (res.code === "1"){
                        commonUtils.toast(res)
                    }else {
                        querySmsCode()
                    }
                })
            }
        },"确定将QYH后台项目验证码进行重置 ?")
    }
    // -----------------生命周期函数
    onBeforeMount(()=>{

    })

</script>

<style scoped>
    /deep/ .el-descriptions__cell{
        color: #409EFF;
        font-weight: 500;
    }
    /deep/ .el-tabs__item.is-active{
        color:rgb(73,178,82) !important
    }
    /deep/ .el-tabs__active-bar{
        background-color:rgb(73,178,82) !important
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #64ABF5;
        font-weight: bold;
    }

    .box-card {
        width: 480px;
    }

    .tmk_span{
        display: flex;
        float: left;
        padding: 10px 50px 0 5px;
        height: 300px;
    }
    .qyhApply{
        display: flex;
        float: left;
        padding: 10px 50px 0 5px;
        height: 320px;
    }
</style>