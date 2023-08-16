<template>
    <!--通用类别列表-->
    <div class="categoryList">
        <div style="width: 100%">
            <el-input v-model="filterText" placeholder="过滤分类名称">
                <template #append>
                    <el-button @click="category_drawer = true">
                        新增分类
                    </el-button>
                </template>
            </el-input>
        </div>
        <!--分类title-->
        <div style="background-color: #d5ebfc;padding-left: 10px">
            <el-icon><Files /></el-icon>
            <el-button type="text" @click="load()" style="padding-left: 10px;font-size: 15px">全部分类</el-button>
        </div>
        <!-- 分类列表-->
        <div class="categoryBody" style="height: 80%;">
            <!-- 分类树形结构-->
            <el-tree
                    ref="tree"
                    :data="categoryList"
                    :props="defaultProps"
                    node-key="id"
                    :filter-node-method="filterNode"
            >
                <template #default="{ node, data }">
                    <div class="custom-tree-node" style="width: 90%">
                        <div style="float: left;padding-top: 5px" @click="case_Info(data)">
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
                        <div style="float: right;padding-top: 10px">
                            <el-dropdown v-if="data.type === 0">
                                <span class="el-dropdown-link" style="font-weight: bold; color: #64ABF5">...</span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item><el-button @click="createFolder(node,data)" type="text">新建文件夹</el-button></el-dropdown-item>
                                        <el-dropdown-item><el-button @click="editCategory(node,data)" type="text">编辑</el-button></el-dropdown-item>
                                        <el-dropdown-item>
                                            <el-popconfirm title="确认删除吗?" @confirm="categoryRemove(node, data)">
                                                <template #reference>
                                                    <el-button type="text">删除</el-button>
                                                </template>
                                            </el-popconfirm>
                                        </el-dropdown-item>
                                        <el-dropdown-item><el-button @click="createCase(node,data)" type="text">新建用例</el-button></el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-dropdown v-else>
                                <span style="margin-top: 20px">
                                    <el-popconfirm title="确认删除吗?" @confirm="categoryRemove(node, data)">
                                        <template #reference>
                                            <el-icon><DeleteFilled/></el-icon>
                                        </template>
                                    </el-popconfirm>
                                    <el-icon @click="copyCase(node,data)"><DocumentCopy/></el-icon>
                                </span>
                            </el-dropdown>
                        </div>
                    </div>
                </template>
            </el-tree>
        </div>
        <!-- 新增分类弹窗-->
        <el-drawer v-model="category_drawer" title="新增分类" :with-header="false">
            <el-form :model="categoryForm" label-width="120px">
                <el-form-item label="分类名称">
                    <el-input v-model="categoryForm.categoryName" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="categoryForm.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="category_drawer = false">取消</el-button>
                    <el-button type="primary" @click="saveCategory()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <!-- 新增用例弹窗-->
        <el-dialog
                title="新增用例"
                width="30%"
                v-model="case_drawer"
        >
            <el-form ref="form" :model="categoryForm" label-width="120px">
                <el-form-item label="接口名称">
                    <el-input v-model="categoryForm.categoryName" placeholder="请输入接口名称"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="categoryForm.remark" placeholder="备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="caseVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveCategory(1)">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {reactive, toRefs} from "@vue/reactivity";
    import { Files,DeleteFilled,DocumentCopy,Document } from "@element-plus/icons"
    import request from "../../utils/request";
    export default {
        name: "categoryList",
        inject:["reload"],
        components:{
            Files,DeleteFilled,DocumentCopy,Document,
        },
        props:{
        },
        setup(){
            let state = reactive({
                // 新增分类弹窗
                category_drawer :false,
                case_drawer:false,
                categoryList:[],
                defaultProps: {
                    children: 'children',
                    label: 'categoryName',
                },
                filterText:"",
            });
            return{
                ...toRefs(state),
            }
        },
        data(){
            return{
                // 用例分类
                categoryForm: {
                    parentId: 0
                },
                // 用例详情
                caseInfoData:{
                    id: "",
                    caseType:"",
                    caseGrade:"",
                    casePerson:"",
                    loopCount: 1,
                    params:[],
                    allParams:[],
                    apiId:[],
                },
            }
        },
        created() {
            this.load();
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            },
        },
        methods:{
            //新增用例类别
            saveCategory(type){
                if(type === 1 ){
                    this.categoryForm.type = 1
                }
                request.post("/api/caseCategory/add",this.categoryForm).then(res=>{
                    this.load();
                    this.category_drawer = false
                    this.case_drawer = false
                    this.categoryForm= {}
                })
            },
            // 新增文件夹
            createFolder(node,data){
                this.category_drawer = true
                this.categoryForm.parentId = data.id
            },
            // 新增用例
            createCase(node,data){
                this.case_drawer = true
                this.categoryForm.parentId = data.id
            },
            //加载用例分类列表
            load(){
                request.get("/api/caseCategory/list").then(res=>{
                    this.categoryList = res.data
                })
            },
            //树形结构过滤
            filterNode(value, data) {
                if (!value) return true
                return data.categoryName.indexOf(value) !== -1
            },
            //编辑用例分类
            editCategory(node,data){
                this.category_drawer = true
                this.categoryForm = data
            },
            //删除用例分类
            categoryRemove(node,data){
                const parent = node.parent
                const children = parent.data.children || parent.data
                const index = children.findIndex((d) => d.id === data.id)
                children.splice(index, 1)
                if(data.id != null){
                    request.delete("/api/caseCategory/delete/"+data.id).then(res=>{})
                }
            },
            // 复制用例
            copyCase(node,data){
            },
            // 用例详情
            case_Info(data){
                // 将用例详情数据传递父组件(传递分类ID)
                const  payload = {
                    categoryId:data.id
                }
                request.post("/api/case/info",payload).then(res=>{
                    this.caseInfoData = res.data
                })
                // 将用例分类数据传递父组件
                this.$emit("category",data)

                // 用例详情数据
                this.$emit("caseInfo",this.caseInfoData)
            }

        }
    }
</script>

<style scoped>

</style>