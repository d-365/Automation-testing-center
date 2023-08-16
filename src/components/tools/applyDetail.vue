<template>
    <!--填单详情-->
    <div id="applyDetail" style="width: 480px">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <slot name="title">
                        <span style="color: #64ABF5;font-weight: bold">已注册用户填单</span>
                    </slot>
                    <el-button style="float: right" class="button" type="text" @click="dialog=true">填单</el-button>
                </div>
            </template>
            <div class="card-body" style="height: 200px">
                <el-input v-model="applyData.phone" style="width: 200px" placeholder="请输入手机号" maxlength="11"/>
                <el-input v-model="applyData.city" style="padding: 5px 5px;width: 200px" placeholder="请选择城市" maxlength="12"/>
                <el-alert show-icon type="warning" :closable="false" style="width: 400px;margin-top: 15px">
                    <template #title>
                        {{msg}}<br>
                        <el-tooltip placement="right" effect="light">
                            <template #content>
                                <json-viewer :value="responseDetail" copyable boxed sort />
                            </template>
                            <el-button type="text">查看订单详情</el-button>
                        </el-tooltip>
                    </template>
                </el-alert>
            </div>
        </el-card>
    </div>
    <!-- 二次确认-->
    <div>
        <el-dialog
                v-model="dialog"
                title="确认"
                width="20%"
                center
        >
            <span>确定进行填单吗？</span>
            <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialog = false">取消</el-button>
                    <el-button type="primary" @click="apply()">确认</el-button>
                  </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import request from "../../utils/request";
    import {hideLoading, showLoading} from "../../utils/loading";

    export default {
        name: "applyDetail",
        data(){
            return{
                dialog:false,
                applyData:{
                    phone:"18397858213",
                    city:"杭州市",
                },
                responseDetail:"请先进行填单",
                msg:""
            }
        },
        methods:{
            apply(){
                showLoading()
                this.dialog = false
                request.post("/api/tools/qyhApply",this.applyData).then(res=>{
                    hideLoading()
                    this.$root.toast(res)
                    this.responseDetail= res.data
                    this.msg = "订单ID: "+res.data.loanId
                })
            }
        },

    }
</script>

<style scoped>

</style>