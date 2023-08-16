<template>
    <div class="caseTree">
        <div style="text-align: left">
            <el-button-group>
                <el-button plain v-model="filterText" @click="filterText='' " type="primary">全部</el-button>
                <el-button plain v-model="filterText" @click="filterText= true" type="success">成功</el-button>
                <el-button plain v-model="filterText" @click="filterText= false" type="danger">失败</el-button>
            </el-button-group>

        </div>
        <div style="padding-top: 10px;text-align: left">
            <el-tree
                    :data="TreeData"
                    :props="defaultProps"
                    accordion
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                    ref="caseTree"
            >
                <template #default="{ node, data }">
                    <div class="custom-tree-node"  :style="treeColor(data)">
                        <div style="float: left;" :style="treeColor(data)">
                            <el-icon v-if="data.result === true"><CircleCheckFilled/></el-icon>
                            <el-icon v-else><CircleCloseFilled/></el-icon>
                        </div>
                        <div style="float: left;padding-left: 10px" >
                            <span :style="treeColor(data)">{{ node.label }}</span>
                        </div>
                    </div>
                </template>
            </el-tree>
        </div>

    </div>
    <div class="hidden">
        <case_debug :debugCase_drawer="debugCase_drawer" :caseDetail="currentCaseInfo" @newDebugCase_drawer="getDebugCase_drawer"/>
    </div>
</template>

<script>
    import {Coffee,CircleCheckFilled,CircleCloseFilled} from "@element-plus/icons";
    import case_debug from "../api/debug/case_debug";

    export default {
        name: "caseTree",
        components:{
            Coffee,case_debug,CircleCheckFilled,CircleCloseFilled
        },
        props:{
            TreeData:{
                default:[]
            },
            labelName:{
                default: "name"
            },


        },
        data(){
            return{
                // 树形结构过滤
                filterText:null,
                defaultProps : {
                    children: 'children',
                    label:this.labelName
                },
                debugCase_drawer:false,
                currentCaseInfo: {
                    caseGrade: null,
                    casePerson: null,
                    caseType: null,
                    categoryId: null,
                    categoryName: "",
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
            "filterText"(newVar){
                this.$refs.caseTree.filter(newVar)
            }
        },
        methods:{
            treeColor(data){
                if(data.result === false){
                    return "color:#F56C6C;font-weight: bold;font-size: 14px"
                }else {
                    return "color:#67c23a;font-weight: bold;font-size: 14px"
                }
            },
            handleNodeClick(data){
                this.debugCase_drawer= true
                this.currentCaseInfo = data
            },
            getDebugCase_drawer(data){
                this.debugCase_drawer = data
            },
            // 树形节点过滤
            filterNode(value, data, node) {
                return data.result === value || value === "";
            },

        }
    }
</script>

<style scoped>

</style>