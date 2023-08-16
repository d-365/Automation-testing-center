<template>
    <!--接口前置后置操作-->
    <div >
        <el-table
                row-key="id"
                id="preFix"
                :row-style="tab_row_style()"
                :header-cell-style="tabStyle()"
                :data="roundData"
        >
            <el-table-column width="20px" prop="fill">
                <template #default="scope">
                    <el-icon :size="10" ><Sort/></el-icon>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="描述">
                <template #default="scope">
                    <el-input  v-model="scope.row.name" placeholder="描述"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="actionID" label="操作">
                <template #default="scope">
                    <el-cascader
                            :popper-options="{ boundariesElement: 'viewport', removeOnDestroy: true }"
                            :show-all-levels="false"
                             clearable
                             v-model="scope.row.actionId"
                            :options="actionOption"
                            :props="mySetupProps">
                        <template #default="{ node, data }">
                            {{ actionName = data.actionKey}}
                            <div style="display: inline-flex">{{ data.name }} </div><div v-show="data.children.length!==0" style="display: inline-flex;color: #409EFF">({{data.children.length}})</div>
                        </template>
                    </el-cascader>
                </template>
            </el-table-column>
            <el-table-column prop="dbConfig" label="数据库/文件">
                <template #default="scope">
                    <div v-if="showSql">
                            <el-select clearable  v-model="scope.row.operateData" placeholder="数据库">
                                <el-option
                                        v-for="item in dbOptions"
                                        :key="item.id"
                                        :label="item.dbName"
                                        :value="item.id"
                                >
                                </el-option>
                            </el-select>
                    </div>
                    <div v-if="showSql === false" >
                        <input type="file" @change="addFile" ref="fileInput"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="params" label="参数(SQL)">
                <template #default="scope">
                    <el-input :rows="1" type="textarea" v-model="scope.row.params" placeholder="SQL"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="50">
                <template #default="scope">
                    <el-switch
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value = "1"
                            :inactive-value = "0"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="right" label="操作">
                <template #default="scope">
                    <span>
                        <slot name="func" :data="scope">
                            <el-button @click="roundData.push(setup_teardown)">+</el-button>
                            <el-button v-if="scope.$index!==0" @click="roundData.splice(scope.$index,1)">-</el-button>
                        </slot>
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {reactive, toRefs} from "@vue/reactivity";
    import {Sort} from "@element-plus/icons"
    import request from "../../../utils/request";
    import Sortable from "sortablejs";

    export default {
        name: "setupTearDown",
        components:{Sort},
        props:{
            // 前置后置数据
            roundData:{
                default:[{}]
            },
            mySetupProps: {
                default: {
                    children: 'children',
                    label: 'name',
                    value: 'id'
                }
            }
        },
        watch:{
            // 监听数据内值是否发生变化
            roundData:{
                handler(newVal, oldVal) {
                    newVal.forEach((item)=>{
                        if (item!=null){
                            if (item.actionId!==undefined && item.actionId !==null && item.actionId !== ""){
                                if (item.actionId.length >1){
                                    item.actionId = item.actionId[item.actionId.length - 1]
                                }
                            }
                        }
                    })
                    this.$emit("SonRoundData",newVal)
                },
                deep: true
            },
            actionName:{
                handler(newVal, oldVal) {
                    this.showSql = newVal.includes("SQL");
                }
            }
        },
        setup(){
            const state = reactive({
                dbOptions:[],
                setup_teardown:{}
            })
            return {
                ...toRefs(state),
            }
        },
        data(){
            return{
                actionOption:[],
                actionName:'database',
                showSql:false
            }
        },
        created(){
            this.envDetail()
            this.actionOptionInit()
            this.dbOptionInit()
        },
        mounted() {
            this.initSort()
        },
        methods:{
            tabStyle(){
                return {background:'#eef1f6',color:'#606266'}
            },
            tab_row_style(){
                return { "color":"#3d3c3c",'font-size':'13px'}
            },
            envDetail(){

            },
            // 表格拖拽
            initSort() {
                const tableBody = document.querySelector('#preFix tbody');
                const sortable = new Sortable(tableBody, {
                    animation: 1000,
                    onEnd: (evt) => {
                        const currRow = this.Pre_Post_Fix.splice(evt.oldIndex, 1)[0]
                        this.Pre_Post_Fix.splice(evt.newIndex, 0, currRow)
                    }
                })
            },
            // 初始化前置后置操作
            actionOptionInit(){
                request.post("/api/action/teardown").then(res=>{
                    this.actionOption = res.data
                })
            },
            dbOptionInit(){
                const envId = localStorage.getItem("envId")
                request.get("/api/env//dbOptions/"+envId).then(
                    res=>{
                        this.dbOptions = res.data
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>