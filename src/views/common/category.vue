<template>
    <div class='left' style="width: 100%">
        <!-- 搜索框 -->
        <div>
            <el-input v-model="filterText" placeholder="过滤分类名称" style="width: 100%">
                <template #append>
                    <el-icon :size="25" style="color: #64ABF5;"  @click="load"><RefreshRight/></el-icon>
                </template>
            </el-input>

        </div>
        <!-- 分类列表-->
        <div class="categoryBody">
            <!-- 分类树形结构-->
            <el-tree
                ref="tree"
                :data="categoryList"
                :props="defaultProps"
                node-key="id"
                :default-checked-keys="selectedID"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                show-checkbox
                @check-change="treeCheckChange"
            >
                <template #default="{ node, data }">
                    <div class="custom-tree-node" style="width: 90%">
                        <span v-if="data.sourceType === 0">
                                <el-icon ><Files /></el-icon>
                                {{ node.label }}
                            </span>
                        <span v-if="data.sourceType === 1" style="color: #64ABF5;">
                                <el-icon><Coffee/></el-icon>
                                <el-button   type="text">
                                    <span v-if="data.method==='POST'" style="font-weight: bold;font-size: 14px">{{data.method}}</span>
                                    <span v-else-if="data.method==='GET'"  style="color:rgb(224, 141, 73);font-weight: bold;font-size: 14px">{{data.method}}</span>
                                    <span v-else-if="data.method==='DELETE'"  style="color:rgb(81, 141, 238);font-weight: bold;font-size: 14px">{{data.method}}</span>
                                    <span v-else style="color:rgb(81, 141, 238);font-weight: bold;font-size: 14px">{{data.method}}</span>

                                </el-button>
                                <el-button   type="text"><span style="font-weight: bold;font-size: 15px;color: #666666">{{ node.label }}</span></el-button>
                            </span>
                        <span v-if="data.sourceType === 2">
                                <el-icon><List/></el-icon>
                                <el-button style="font-weight: bold;font-size: 15px;color: #666666"  type="text" ><span>{{ node.label }}</span></el-button>
                            </span>
                    </div>
                </template>

            </el-tree>
        </div>

    </div>
</template>

<script>
    import {reactive, toRefs} from "@vue/reactivity"
    import {RefreshRight,Files,Coffee,List} from "@element-plus/icons"
    import request from "../../utils/request";

    export default {
        name: "category",
        components:{
            RefreshRight,Files,Coffee,List
        },
        setup(){
            let state = reactive({
                // 新增分类弹窗
                category_drawer :false,
                case_drawer:false,
                categoryList:[],
                defaultProps: {
                    children: 'children',
                    label: 'name',
                },
                filterText:"",
            });
            return{
                ...toRefs(state),
            }
        },
        props:{
            checkedApi:Array,
            selectedID: {
                default:[]
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            },
        },
        data(){
            return{
                finalCheckApi:[],

            }
        },
        created() {
            this.load()
        },
        methods:{
            load(){
                request.get("/api/categoryApi/list").then(res=>{
                    this.categoryList = res.data
                })
            },
            //树形结构过滤
            filterNode(value, data) {
                if (!value) return true
                return data.name.indexOf(value) !== -1
            },
            //获取已选择树形节点
            treeCheckChange(){
                this.finalCheckApi = []
                let checkData = this.$refs.tree.getCheckedNodes()
                checkData.forEach((item,i)=>{
                    if(item.sourceType === 2){
                        this.finalCheckApi.push(item)
                    }
                })
                this.$emit("finalCheckApi",this.finalCheckApi)
                },
            },
    }
</script>

<style scoped>

</style>