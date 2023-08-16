<template>
    <div style="text-align: left">
        <el-button-group>
            <el-button plain v-model="filterText" @click="filterText='' " type="primary">全部</el-button>
            <el-button plain v-model="filterText" @click="filterText= true" type="success">成功</el-button>
            <el-button plain v-model="filterText" @click="filterText= false" type="danger">失败</el-button>
        </el-button-group>

    </div>
    <div class="apiTree" style="text-align: left">
        <el-tree
                :filter-node-method="filterNode"
                ref="webTree"
                :data="TreeData"
                :props="defaultProps"
                accordion
        >
            <template #default="{ node, data }">
                <div class="custom-tree-node"  :style="treeColor(data)" @click="currentApiData(data)">
                    <div style="float: left;" :style="treeColor(data)">
                        <el-icon v-if="data.result === true"><CircleCheckFilled/></el-icon>
                        <el-icon v-else><CircleCloseFilled/></el-icon>
                        <span :style="treeColor(data)">{{data.method}}</span>
                    </div>
                    <div style="float: left" >
                        <span :style="treeColor(data)">{{ node.label }}</span>
                    </div>
                </div>
            </template>
        </el-tree>
    </div>
</template>

<script>
    import {Coffee,CircleCheckFilled,CircleCloseFilled} from '@element-plus/icons'

    export default {
        name: "ApiTree",
        components:{
            Coffee,CircleCheckFilled,CircleCloseFilled
        },
        props:{
            TreeData:{
                default:[]
            },
            labelName:{
                default: "name"
            }
        },
        data(){
            return{
                defaultProps : {
                    children: 'children',
                    label:this.labelName
                },
                filterText:""
            }
        },
        watch:{
            "filterText"(newVar){
                this.$refs.webTree.filter(newVar)
            }
        },
        methods:{
            currentApiData(data){
                this.$emit("apiInfo",data)
            },
            treeColor(data){
                if(data.result === false){
                    return "color:#F56C6C;font-weight: bold;font-size: 14px"
                }else {
                    return "color:#67c23a;font-weight: bold;font-size: 14px"
                }
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