<template>
    <el-tabs model-value="qyh" :tab-position="tabPosition" style="height: 100%">
        <el-tab-pane label="电销填单" name="tmk">
            <template #label>
                <span>
                    <el-icon><Edit /></el-icon>电销填单
                </span>
            </template>
            <div class="tabs-body">
                <div id="tmk">
                    <!--填单详情-->
                    <div class="tmk_span">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>电销填单(订单详情)</span>
                                    <el-button class="button" type="text" @click="tmk_dialog=true">填单</el-button>
                                </div>
                            </template>
                            <div class="card-body">
                                <el-input v-on:blur="check_count($event)" v-model="tmkApplyData.phone" style="width: 200px" placeholder="请输入手机号" maxlength="11"/>
                                <el-input v-model="tmkApplyData.city" style="padding: 5px 5px;width: 200px" placeholder="请选择城市" maxlength="12"/>
                                <el-alert show-icon type="warning" :closable="false" style="width: 400px;margin-top: 15px">
                                    <template #title>
                                        {{tmk_msg}}<br>
                                        <el-tooltip placement="right" effect="light">
                                            <template #content>
                                                <json-viewer :value="tmk_dataDetail" copyable boxed sort />
                                            </template>
                                            <el-button type="text">查看订单详情</el-button>
                                        </el-tooltip>
                                    </template>
                                </el-alert>
                            </div>
                        </el-card>
                    </div>
                    <!--填单--循环-->
                    <div class="tmk_span">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>定制填单</span>
                                </div>
                            </template>
                            <div class="card-body">
                                <el-row>
                                    <el-input v-on:blur="check_count($event)" v-model="tmkApplyDataLoop.phone" style="width: 150px" placeholder="请输入手机号" maxlength="11"/>
                                    <el-input v-model="tmkApplyDataLoop.city" style="padding: 0 5px;width: 120px" placeholder="请选择城市" maxlength="12"/>
                                    <el-input-number v-model="tmkApplyDataLoop.loop" :step="1"  style="width: 120px" />
                                </el-row>
                                <el-row>
                                    <el-input v-model="tmkApplyDataLoop.step"
                                              style="width: 400px;padding: 10px 0"
                                              maxlength="6"
                                              show-word-limit
                                              oninput="value=value.replace(/[^\d]/g,'')"
                                    >
                                        <template #append>ms</template>
                                        <template #prepend>请求间隔</template>
                                    </el-input>
                                </el-row>
                                <el-row>
                                    <div style="float: left;padding: 10px 0">
                                        <el-button @click="tmkLoopApply_start()" type="primary" size="medium" :loading="tmk_loop_begin">开始</el-button>
                                    </div>
                                    <div style="float:left;padding: 10px 50px">
                                        <el-button @click="tmkLoopApply_end()" type="danger" size="medium">结束</el-button>
                                    </div>
                                </el-row>
                                <el-row  style="padding: 10px 0">
                                    <div ref="progress" style="display: none" >
                                        <el-progress
                                                :percentage="100"
                                                status="success"
                                                :indeterminate="tmk_loop_begin"
                                                :duration="5"
                                                style="width: 200px"
                                                :text-inside="true"
                                                :stroke-width="20"
                                                :color="progressColor"
                                        >
                                            <span>{{progressMsg}}</span>
                                        </el-progress>
                                    </div>
                                </el-row>
                                <el-row>
                                    <div ref="loopTmkApplyMsg" style="display:none;color: #E6A23C">
                                        生成的订单ID是：{{order_begin}} ~ {{order_end}}
                                    </div>
                                </el-row>
                            </div>

                        </el-card>
                    </div>
                    <!--填单---随机-->
                    <div class="tmk_span" style="padding: 20px 0;height: 300px;">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>随机填单</span>
                                </div>
                            </template>
                            <div class="card-body">
                                <el-row>
                                    <el-input-number v-model="tmkApplyRandom.loop" :step="1"  style="width: 120px" >
                                    </el-input-number>
                                    <el-input v-model="tmkApplyRandom.step"
                                              style="width: 300px;padding: 0 0 0 10px"
                                              maxlength="6"
                                              show-word-limit
                                              oninput="value=value.replace(/[^\d]/g,'')"
                                    >
                                        <template #append>ms</template>
                                        <template #prepend>请求间隔</template>
                                    </el-input>
                                </el-row>
                                <el-row>
                                    <div style="float: left;padding: 10px 0">
                                        <el-button @click="tmkLoopApply_start('random')" type="primary" size="medium" :loading="random_loading">开始</el-button>
                                    </div>
                                    <div style="float:left;padding: 10px 50px">
                                        <el-button @click="tmkLoopApply_end('random')" type="danger" size="medium">结束</el-button>
                                    </div>
                                </el-row>
                                <el-row  style="padding: 10px 0">
                                    <div ref="randomProgress" style="display: none" >
                                        <el-progress
                                                :percentage="100"
                                                status="success"
                                                :indeterminate="random_loading"
                                                :duration="5"
                                                style="width: 200px"
                                                :text-inside="true"
                                                :stroke-width="20"
                                                :color="progressColor"
                                        >
                                            <span>{{randomProgressMsg}}</span>
                                        </el-progress>
                                    </div>
                                </el-row>
                                <el-row>
                                    <div ref="RandomTmkApplyMsg" style="display:none;color: #E6A23C">
                                        生成的订单ID是：{{random_begin}} ~ {{random_end}}
                                    </div>
                                </el-row>
                            </div>
                        </el-card>
                    </div>

                </div>
            <!-- 二次确认-->
                <div>
                    <el-dialog
                            v-model="tmk_dialog"
                            title="确认"
                            width="20%"
                            center
                    >
                        <span>填单将会删除对应手机号之前的订单</span>
                        <template #footer>
                          <span class="dialog-footer">
                            <el-button @click="tmk_dialog = false">取消</el-button>
                            <el-button type="primary" @click="tmkApply()">确认</el-button>
                          </span>
                        </template>
                    </el-dialog>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="轻易花填单" name="qyh">
            <template #label>
                <span>
                    <el-icon><Edit /></el-icon>轻易花填单
                </span>
            </template>
            <div class="qyhApply">
                <applyDetail/>
            </div>
            <div class="qyhApply">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>轻易花填单</span>
                        </div>
                    </template>
                    <div class="card-body">
                        <el-row>
                            <el-input v-model="tmkApplyDataLoop.city" style="margin: 0 5px;width: 120px" placeholder="请选择城市" maxlength="12"/>
                        </el-row>
                        <el-row>
                            <div style="margin-top: 20px">
                                <el-input-number v-model="tmkApplyDataLoop.loop" :step="1"  style="width: 200px" />
                            </div>
                        </el-row>
                        <el-row>
                            <div style="float: left; margin:30px 0 10px 10px">
                                <el-button @click="tmkLoopApply_start('qyh')" type="primary" size="medium" :loading="tmk_loop_begin">开始</el-button>
                            </div>
                            <div style="float:left;margin:30px 0 10px 10px">
                                <el-button @click="tmkLoopApply_end('qyh')" type="danger" size="medium">结束</el-button>
                            </div>
                        </el-row>
                        <el-row  style="margin: 10px 0">
                            <div ref="progress" style="display: none" >
                                <el-progress
                                        :percentage="100"
                                        status="success"
                                        :indeterminate="tmk_loop_begin"
                                        :duration="5"
                                        style="width: 200px"
                                        :text-inside="true"
                                        :stroke-width="20"
                                        :color="progressColor"
                                >
                                    <span>{{progressMsg}}</span>
                                </el-progress>
                            </div>
                        </el-row>
                        <el-row>
                            <div ref="loopTmkApplyMsg" style="display:none;color: #E6A23C">
                                生成的订单ID是：{{order_begin}} ~ {{order_end}}
                            </div>
                        </el-row>
                    </div>
                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import { Edit } from "@element-plus/icons"
    import {reactive, toRefs} from "@vue/reactivity";
    import request from "../../utils/request";
    import applyDetail from "../../components/tools/applyDetail";
    export default {
        name: "CRM",
        components:{
            Edit,applyDetail
        },
        setup(){
            const state = reactive(
                {
                tmk_dialog: false,
                tmk_dataDetail:"请先进行填单",
                tmk_loop_begin: false,
                // 循环填单（电销）进度条初始值
                percentage: 0,
                customColors: [
                    { color: '#f56c6c', percentage: 20 },
                    { color: '#e6a23c', percentage: 40 },
                    { color: '#5cb87a', percentage: 60 },
                    { color: '#1989fa', percentage: 80 },
                    { color: '#6f7ad3', percentage: 100 },
                ],
                }
            )
            // 电销循环填单
            const tmkApplyLoop = reactive(
                {
                    progressMsg : "填单中",
                    progressColor : "#f56c6c",
                    order_begin: null,
                    order_end:null
                }
            )
            // 电销随机填单
            const tmkRandom = reactive(
                {
                    randomProgressMsg : "填单中",
                    randomProgressColor : "#f56c6c",
                    random_begin: null,
                    random_end:null,
                    random_loading: false
                }
            )

            return {
                ...toRefs(tmkApplyLoop),
                ...toRefs(state),
                ...toRefs(tmkRandom),
            }
        },
        data(){
            return{
                // el-tabs位置
                tabPosition:'left',
                //电销填单
                tmkApplyData:{
                    phone: 18397858200,
                    city: "杭州市",
                },
                // 定制循环填单
                tmkApplyDataLoop:{
                    phone: 18397858200,
                    city: "杭州市",
                    loop:1,
                    status:0,
                    step:0
                },
                // tmk返回内容
                tmk_msg: "不填写系统随机生成",
                // 随机电销填单
                tmkApplyRandom:{
                    loop:1,
                    status:0,
                    step:0
                }

            }
        },
        methods:{
            check_count: function(event) {
                const value = event.target.value;
                if (!/^\+?[1-9][0-9]/.test(value) || value.length!==11) {
                    event.target.placeholder = "手机号输入不合法"
                    event.target.value = '';
                }
            },
            //电销填单
            tmkApply(){
                request.post("/api/tools/tmkApply",this.tmkApplyData).then(res=>{
                    if(res.code ==="1"){
                        this.$message({
                            type:"error",
                            message:res.msg
                        })
                    }else {
                        this.$message({
                            type:"success",
                            message:"填单成功"
                        })
                    }
                    this.tmk_msg = "订单ID: "+res.data.loanId
                    this.tmk_dataDetail = res.data.payload

                })
                this.tmk_dialog = false
            },
            // 电销循环填单开始
            tmkLoopApply_start(type){
                //随机填单
                if(type==="random"){
                    this.random_loading = true
                    this.tmkApplyRandom.status = 0
                    this.$refs.randomProgress.style.setProperty("display" ,"block")
                    request.post("/api/tools/tmkRandom",this.tmkApplyRandom).then(res=>{
                        if(res.code === "0"){
                            this.randomProgressMsg = "填单完毕"
                            this.progressColor = "#67c23a"
                            this.random_loading = false
                            this.random_begin = res.data[0]
                            this.random_end = res.data[1]
                            this.$refs.RandomTmkApplyMsg.style.setProperty("display" ,"block")
                        }

                    })
                }else if (type === "qyh"){
                    // 轻易花填单
                    this.tmk_loop_begin = true
                    this.tmkApplyDataLoop .status = 0
                    this.$refs.progress.style.setProperty("display" ,"block")
                    request.post("/api/tools/qyhApply/start",this.tmkApplyDataLoop).then(res=>{
                        if(res.code === "0"){
                            this.progressMsg = "填单完毕"
                            this.progressColor = "#67c23a"
                            this.tmk_loop_begin = false
                            this.order_begin = res.data[0]
                            this.order_end = res.data[1]
                            this.$refs.loopTmkApplyMsg.style.setProperty("display" ,"block")
                        }else {
                            this.progressMsg = "填单失败"
                            this.progressColor = "#FA8072"
                            this.tmk_loop_begin = false
                            this.$refs.loopTmkApplyMsg.style.setProperty("display" ,"block")
                            this.order_begin = null
                            this.order_end = null
                        }
                    })
                }else {
                    // 定制填单
                    this.tmk_loop_begin = true
                    this.tmkApplyDataLoop .status = 0
                    this.$refs.progress.style.setProperty("display" ,"block")
                    request.post("/api/tools/tmkApplyLoop",this.tmkApplyDataLoop).then(res=>{
                        if(res.code === "0"){
                            this.progressMsg = "填单完毕"
                            this.progressColor = "#67c23a"
                            this.tmk_loop_begin = false
                            this.order_begin = res.data[0]
                            this.order_end = res.data[1]
                            this.$refs.loopTmkApplyMsg.style.setProperty("display" ,"block")
                        }
                    })
                }

            },
            // 电销循环填单结束
            tmkLoopApply_end(type){
                this.tmk_loop_begin = false
                this.tmkApplyDataLoop .status = 1
                this.progressMsg = "填单完毕"
                this.progressColor = "#67c23a"
                if (type === 'qyh'){
                    request.post("/api/tools//qyhApply/end")
                }else {
                    request.post("/api/tools/tmkApplyLoop",this.tmkApplyDataLoop).then(res=>{
                    })
                }
            },

        }
    }
</script>

<style scoped>

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