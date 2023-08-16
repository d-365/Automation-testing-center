<template>
    <!--属性结构-->
    <div class="myTree">
        <!-- 搜索框 -->
        <div>
            <el-input v-model="filterText" placeholder="过滤分类名称">
                <template #append>
                    <el-icon :size="25" style="color: #64ABF5;"><RefreshRight/></el-icon>
                </template>
            </el-input>
        </div>
        <!-- 分类列表-->
        <div class="categoryBody">
            <!-- 分类树形结构-->
            <el-tree
                     ref="tree"
                    :data="treeList"
                    :props="defaultProps"
                     node-key="id"
                    :default-checked-keys="selectedId"
                    :expand-on-click-node="false"
                    :filter-node-method="filterNode"
                    show-checkbox
                    @check-change="treeCheckChange"
            >
                <template #default="{ node, data }">
                        <div style="float: left;padding-top: 5px">
                            <span v-if="data.type === 0">
                                <el-icon ><Files /></el-icon>
                                {{ node.label }}
                            </span>
                            <span v-if="data.type === 1" >
                                <span>
                                    <el-icon><Document/></el-icon>
                                </span>
                                <span>
                                    <el-button  type="text">
                                    <span style=" margin-left:5px;font-weight: bold;font-size: 13px;color: #666666">{{ node.label }}</span>
                                </el-button>
                                </span>
                            </span>
                    </div>
                </template>

            </el-tree>
        </div>
    </div>
</template>

<script>
    import {Coffee, Files, List, RefreshRight,Document} from "@element-plus/icons";
    import {reactive, toRefs} from "@vue/reactivity";
    import request from "../../utils/request";

    export default {
        name: "myTree",
        components:{
            RefreshRight,Files,Coffee,List,Document
        },
        setup(){
            let state = reactive({
                filterText:"",
            });
            return{
                ...toRefs(state),
            }
        },
        props:{
            // 属性结构数据
            treeList:{
                default: [],
                type:Array
            },
            // 已选择的用例列表
            selectedId:{
                default:[]
            },
            defaultProps: {
                default:{
                    children: 'children',
                    label: 'categoryName',
                }
            },
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            },
        },
        data(){
            return{
            }
        },
        created() {
        },
        methods:{
            //树形结构过滤
            filterNode(value, data) {
                if (!value) return true
                return data.name.indexOf(value) !== -1
            },
            //获取已选择树形节点
            treeCheckChange(){
                let checkCaseId = []
                let checkData = this.$refs.tree.getCheckedNodes()
                checkData.forEach((item,i)=>{
                    if(item.type === 1){
                        checkCaseId.push(item)
                    }
                })
                this.$emit("finalChecked",checkCaseId)
            },

        },
    }
</script>

<style scoped>

</style>