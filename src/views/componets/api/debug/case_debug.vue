<template>
    <!--用例调试-->
    <el-drawer
            v-model="debugCase_drawer"
            title="用例调试"
            direction="rtl"
            size="80%"
    >
        <div class="debugCase">
            <div class="caseLeft" style="float: left;width: 30%;height: 100%">
                <div class="caseInfo" style="height:15%;">
                    <caseInfo :caseCategory="caseDetail"/>
                </div>
                <div class="caseStep" style="height: 85%;">
                    <el-divider content-position="left">测试步骤</el-divider>
                    <caseStep :stepList="caseDetail.step" @stepIndex="stepIndex"/>
                </div>
            </div>
            <div class="caseRight"  style="float: left;width: 70%;height: 100%;padding-left: 20px">
                <div>
                    <responseLine :debugResponse="caseDetail.step[currentStepIndex]"/>
                    <debugApi_response :apiDetail="caseDetail.step[currentStepIndex]" :debugResponse="caseDetail.step[currentStepIndex]"/>
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script>
    import caseInfo from "../../case/debug/caseInfo";
    import caseStep from "../../case/debug/caseStep";
    import responseLine from "../responseLine";
    import debug_response from "./debug_response";
    import debugApi_response from "./debugApi_response";
    export default {
        name: "case_debug",
        components:{
            caseInfo,caseStep,responseLine,debug_response,debugApi_response
        },
        props:{
            debugCase_drawer:{
                default:false
            },
            caseDetail:{
                default:{
                    caseGrade: null,
                    casePerson: null,
                    caseType: null,
                    categoryId: null,
                    categoryName : "",
                    createTime: null,
                    failContinue: null,
                    id: null,
                    loopCount: null,
                    params: null,
                    result: false,
                    step: []
                }
            }
        },
        watch:{
            "debugCase_drawer"(newVal,oldVar){
                this.$emit("newDebugCase_drawer",newVal)
            }
        },
        data(){
            return{
                currentStepIndex:0
            }
        },
        methods:{
            stepIndex(data){
                this.currentStepIndex = data
            }
        }
    }
</script>

<style scoped>

</style>